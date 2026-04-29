const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, cartController.getCart);
router.post('/sync', authMiddleware, cartController.syncCart);
router.delete('/clear', authMiddleware, cartController.clearCart);

module.exports = router;
