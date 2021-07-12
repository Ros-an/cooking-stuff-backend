const User = require("../models/user.model");
const admin = require("../firebase");
//haven't passed path of index.js because it automatically direct control to index named file
exports.authCheck = async (req, res, next) => {
  try{
  const firebaseUser = await admin.auth().verifyIdToken(req.headers.token);
  req.user = firebaseUser;
  next();
  }catch(error){
    res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    })
  }
}

exports.createOrUpdate = async (req, res) => {
  const {email} = req.user;
  try{
    const userExist = await User.findOne({email}).populate("wishlist", "_id imageUrl title price rating inStock category");
    if(userExist){
     return res.json({
        success: true,
        user: userExist   
      })
    }else{
    const user = await new User({
      email
    }).save();
    res.json({
      success: true,
      user
    })
    }
  }catch(error){
    res.status(401).json({
      success: false,
      message: "error while retrieving user details"
    })
  }
}

exports.addToWishlist = async (req, res) => {
  try{
    const {productId} = req.params;
    const {email} = req.body;
  const product = await User.findOneAndUpdate({email},{$addToSet:{wishlist:productId}}, {new: true}).populate("wishlist", "_id imageUrl title price rating inStock category").select("wishlist");
  res.json({
    success: true,
    wishlist: product.wishlist
  })
  }catch(err){
    res.json({
      success: false,
      message: "could not add item",
      errorMessage: err.message
    })
    res.json({
      success: true,
      message: "could not update wishlist",
      errorMessage: err.message
    })
  }
}

exports.wishlist = async(req, res) => {
  try{
    const wishlist = await User.findOne({email: req.body.email}).populate("wishlist", "_id imageUrl title price rating inStock category").select("wishlist");
    res.json({
      success: true,
      wishlist
    })
  }catch(err){
    res.json({
      success: false,
      message: "could not retrieve wishlist item",
      errorMessage: err.message
    })
  }
}

exports.deleteWishItem = async(req, res) => {
  try{
    const {productId, userId} = req.params;
    const product = await User.findByIdAndUpdate(userId,
    {$pull: {wishlist: productId}}, {new: true}).populate("wishlist", "_id imageUrl title price rating inStock category").select("wishlist");
    res.json({
      success: true,
      wishlist: product.wishlist
    })
  }catch(err){
    res.json({
      success: false,
      message: "could not retrieve wishlist item",
      errorMessage: err.message
    })
  }
}