const express = require("express");
const router  = express.Router();

const { Product } = require("../models/product.model");
const {allProducts, singleProduct, productById} = require("../controller/product.controller");

router.get("/products", allProducts);

router.get("/products/:productId", singleProduct);
router.param("productId",productById);

module.exports = router;