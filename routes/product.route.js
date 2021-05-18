const express = require("express");
const router  = express.Router();

const { Product } = require("../models/product.model");


router.route("/")
.get(async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    res.status(200).json({
      success: true,
      products
    })
  }catch(err) {
    res.status(500).json({
      success: false,
      message: "could not found products"
    })
  }
})

router.param("productId", async (req, res, next, productId) {
  try {
    const product = await Product.findById(productId);
    if(!product){
      return res.status(400).json({
        success: false,
        message: "product could not be found"
      })
      req.product = product;
  }
    }catch(err){
      res.status(400).json({
        success: false,
        message: "error in finding the queried product.",
        errorMessage: err.message
      })
    }
    next();
})
router.route("/:productId")
.get(async (req, res) => {
  const { product } = req;
  product.__v = undefined;
  console.log(product);
res.json({
  success: true,
  product
})
})

module.exports = router;