const express = require("express");
const router = express.Router();

const {authCheck, createOrUpdate, addItemToCart, addToWishlist, wishlist, deleteWishItem} = require("../controller/user.controller");


router.post("/create_or_updateuser", authCheck, createOrUpdate);
router.post("/wishlist/:productId", addToWishlist);
router.get("/wishlist", wishlist);
router.delete("/wishlist/:userId/:productId", deleteWishItem);

module.exports =  router;