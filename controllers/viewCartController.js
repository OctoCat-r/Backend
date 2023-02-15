const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://sanchit:diehardfan@cluster0.lxmxcq5.mongodb.net/Footox?retryWrites=true&w=majority";

const client = new MongoClient(dbURI);
const database = client.db("Footox");
const User = database.collection('cart_details');

exports.viewCart = async (req, res) => {
  const cart = req.body.cart;
    const carts = [];

    for(var i = 0; i< cart.length; i++){
        carts[i] = JSON.parse("[" + cart[i] + "]");
    }
  const user = {
        name:req.body.name,
        email: req.body.email,
        cart: cart,
  };
  console.log(cart);
  

};