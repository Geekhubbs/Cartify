const db = require('../config/db');
const axios = require('axios');
require('dotenv').config();

exports.createOrder = async (req, res) => {
    const { userId, items, totalAmount, shippingAddress, email } = req.body;

    try {
        // 1. Create Order in DB
        const [orderResult] = await db.execute(
            'INSERT INTO orders (user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, ?)',
            [userId, totalAmount, shippingAddress, 'pending']
        );
        const orderId = orderResult.insertId;

        // 2. Insert Order Items
        for (const item of items) {
            await db.execute(
                'INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)',
                [orderId, item.id, item.name, item.quantity, item.priceNum || parseFloat(item.price.replace('$', ''))]
            );
        }

        // 3. Initialize Paystack Payment
        const paystackData = {
            email: email,
            amount: Math.round(totalAmount * 100), // Paystack takes amount in kobo/pesewas
            callback_url: `http://localhost:5173/profile?orderId=${orderId}`, // Redirect back to profile
            metadata: {
                order_id: orderId,
                user_id: userId
            }
        };

        const paystackRes = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            paystackData,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // 4. Save Paystack reference to order
        await db.execute(
            'UPDATE orders SET paystack_ref = ? WHERE id = ?',
            [paystackRes.data.data.reference, orderId]
        );

        res.status(201).json({
            message: 'Order created and payment initialized',
            orderId,
            authorization_url: paystackRes.data.data.authorization_url
        });

    } catch (error) {
        console.error('Order Creation Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to create order or initialize payment' });
    }
};

exports.getUserOrders = async (req, res) => {
    const { userId } = req.params;

    try {
        const [orders] = await db.execute(
            'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );

        // For each order, fetch items
        const fullOrders = [];
        for (const order of orders) {
            const [items] = await db.execute(
                'SELECT * FROM order_items WHERE order_id = ?',
                [order.id]
            );
            fullOrders.push({
                ...order,
                items,
                date: new Date(order.created_at).toLocaleDateString(),
                total: `$${order.total_amount}`
            });
        }

        res.json(fullOrders);
    } catch (error) {
        console.error('Fetch Orders Error:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

exports.verifyPayment = async (req, res) => {
    const { reference } = req.params;

    try {
        const paystackRes = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        );

        if (paystackRes.data.data.status === 'success') {
            const orderId = paystackRes.data.data.metadata.order_id;
            await db.execute(
                'UPDATE orders SET status = ? WHERE id = ?',
                ['paid', orderId]
            );
            return res.json({ message: 'Payment successful', status: 'paid' });
        } else {
            return res.status(400).json({ message: 'Payment verification failed', status: paystackRes.data.data.status });
        }

    } catch (error) {
        console.error('Payment Verification Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to verify payment' });
    }
};
