const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/user/:userId', orderController.getUserOrders);
router.get('/verify/:reference', orderController.verifyPayment);

module.exports = router;
