const express = require('express');
const router = express.Router();
const speechCtrl = require('../../controllers/api/speeches');

router.get('/getOrders', speechCtrl.getOrders);
// GET /api/orders/cart
router.get('/cart', speechCtrl.cart);
// POST /api/orders/cart/items/:id
router.post('/new', speechCtrl.create);
// POST /api/orders/cart/checkout
router.post('/cart/checkout', speechCtrl.checkout);
// PUT /api/orders/cart/qty
router.put('/cart/qty', speechCtrl.setItemQtyInCart);

module.exports = router;
