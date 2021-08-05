const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const { Product } = require("../models/product.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPayment = async (req, res) => {
  
   const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount*100,
    currency: "inr"
  });
   res.send({
    clientSecret: paymentIntent.client_secret
  });
}