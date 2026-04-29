const db = require('../config/db');

exports.getCart = async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT product_id as id, product_name as name, price, quantity, icon FROM cart_items WHERE user_id = ?',
            [req.user.id]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching cart' });
    }
};

exports.syncCart = async (req, res) => {
    const { items } = req.body;
    const userId = req.user.id;

    try {
        // Simple strategy: Clear existing cart and insert new items
        // In production, you might want to merge or update quantities instead
        await db.execute('DELETE FROM cart_items WHERE user_id = ?', [userId]);

        for (const item of items) {
            await db.execute(
                'INSERT INTO cart_items (user_id, product_id, product_name, price, quantity, icon) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, item.id, item.name, item.priceNum || parseFloat(item.price.toString().replace('$', '')), item.quantity, item.icon]
            );
        }

        res.json({ message: 'Cart synced successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error syncing cart' });
    }
};

exports.clearCart = async (req, res) => {
    try {
        await db.execute('DELETE FROM cart_items WHERE user_id = ?', [req.user.id]);
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error clearing cart' });
    }
};
