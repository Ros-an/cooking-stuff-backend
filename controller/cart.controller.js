const { Product } = require("../models/product.model");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");

exports.getCart = async (req, res) =>{
  try{
    const {userId} = req.params;
    const cart = await Cart.findOne({userId}).populate("products.product", "_id imageUrl title price rating inStock category");
    if(cart){
      res.json({
      success: true,
      cart: cart.products
    })
    }else{
      res.json({
        success: true,
        cart
      })
    }
  }catch(err){
    res.json({
      success: false,
      message: "could not retrieve cart item",
      errorMessage: err.message
    })
  }
}
exports.addItemToCart = async (req, res) =>{
  try{
    // here product has {_id,productId, quantity:1}
  const {userId,product} = req.body;
  const cartExist = await Cart.findOne({userId});
   if(cartExist){
    const cart = await Cart.findOneAndUpdate({userId},{$addToSet:{products: product}}, {new: true}).populate("products.product","_id imageUrl title price rating inStock category");
    res.json({
      success: true,
      cart: cart.products
    })
  }else {
    console.log("else part")
    const cart =new Cart({
      userId,
      products: product
    });
    const newCart = await cart.save();
    const savedCart = await Cart.findOne({userId}).populate("products.product","_id imageUrl title price rating inStock category");
  res.json({
    success: true,
    cart:savedCart.products
  })
  }
  }catch(err){
    res.json({
      success:false,
      message: "error while retrieving data",
      errorMessage: err.message
    })
  }
}

exports.updateQuantity = async(req, res) => {
  try{
    const {productId} = req.params;
    const {userId, type} = req.body;
    await Cart.findOne({userId}).updateOne({"products._id": productId}, type==="inc" ? {$inc: {"products.$.quantity": 1}}: {$inc: {"products.$.quantity": -1}});
    const cart = await Cart.findOne({userId}).populate("products.product","_id imageUrl title price rating inStock category");
    res.json({
      success: true,
      cart: cart.products
    })
  }catch(err){
    res.json({
      success:false,
      message: "error while updating data",
      errorMessage: err.message
    })
  }
}

exports.deleteProduct =  async(req,res)=> {
  try{
    const {productId, userId} = req.params;
    const  cart = await Cart.findOneAndUpdate({userId}, {$pull: {products:{_id: productId}}}, {new: true}).populate("products.product","_id imageUrl title price rating inStock category");
    res.json({
      success: true,
      cart: cart.products
    })
  }catch(err){
    res.json({
      success:false,
      message: "due to some error could not delete product",
      errorMessage: err.message
    })
  }
}

exports.clearCart = async(req, res) => {
  try{
    const {userId} = req.body;
    const result = await Cart.findOneAndRemove({userId})
    res.json({
      success: true,
      message: "cart is clear"
    })
  }catch(err){
    res.json({
      success:false,
      message: "due to some error could not remove cart list",
      errorMessage: err.message
    })
  }
}