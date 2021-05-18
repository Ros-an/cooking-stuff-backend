const mongoose = require('mongoose');
const { Schema } = mongoose;

const productData = require("./product.data");


const productSchema = new Schema({
  title: {
    type: String,
    required: "cannot enter a product without a name, please enter a name",
  },
  price: {
    type: Number,
    required: "cannot enter a product without a price, please enter a price"
  },
  imageUrl: {
    type: String,
    required: "cannot enter a product without a URL, enter a product URL",
  },
  description: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  delivery: {
    type: String
  },
  category: {
    type: String,
    required: true
  }
},{timestamps: true});

const Product = mongoose.model("Product", productSchema);

function fillDB() {
  try {
    productData.forEach(async (product) => {
      const newProduct = new Product(product);
      const savedProduct = await newProduct.save();
      console.log(savedProduct);
    })
  }catch(e) {
      console.log(e);
  }
}

// fillDB();

module.exports = { Product }