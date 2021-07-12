const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const cartSchema = new mongoose.Schema({
  userId: {type: ObjectId, ref: "User"},
  products: [
    { _id:String,
      product:{type: ObjectId, ref: "Product"},
      quantity: Number
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);