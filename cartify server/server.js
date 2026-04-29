const express = require('express');
const cors = require('cors');

const app = express();

const authRouter = require('./routers/authRouter');
const orderRouter = require('./routers/orderRouter');
const cartRouter = require('./routers/cartRouter');
const productRouter = require('./routers/productRouter');

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);
app.use('/api/products', productRouter);

// test route
app.get('/', (req, res) => {
    res.send('Cartify API is running...');
});

// start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});