const express = require("express");
const router = express.Router();

const {addItemToCart, updateQuantity, deleteProduct, clearCart, getCart} = require("../controller/cart.controller");
router.get("/:userId", getCart)
router.post("/addToCart", addItemToCart)
router.post("/cartItem/:productId", updateQuantity);
router.delete("/cartItem/:userId/:productId", deleteProduct);
router.delete("/clearCart", clearCart);
module.exports =  router;