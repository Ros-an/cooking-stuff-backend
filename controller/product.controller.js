const { Product } = require("../models/product.model");

exports.showMessage = async (req, res) => {
  try{
    res.json({
      success:true,
      message: "it works"
    })
  }catch(err){
    res.json({
      success: false,
      message: "not working"
    })
  }
}
exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find({}).select("_id imageUrl title price rating delivery inStock category");
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
}

exports.singleProduct = async (req, res) => {
  try{
    const { product } = req;
  product.__v = undefined;
  // console.log(product);
res.json({
  success: true,
  product
})
}catch(err){
  res.json({
    success: false,
    message: "error occured while retrieving"
  })
}
}

exports.productById = async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId);
    if(!product){
      return res.status(400).json({
        success: false,
        message: "product could not be found"
      })
    }
    req.product = product;
  }
    catch(err){
      res.status(400).json({
        success: false,
        message: "error in finding the queried product.",
        errorMessage: err.message
      })
    }
    next();
}