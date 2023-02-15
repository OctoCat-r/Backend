const mongoose = require('mongoose');
// const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'Please enter a name']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    // validate: [isEmail, 'Please enter a valid email']
  },
  PhoneNumber:{
    type:Number,
    minlength: [10, 'Minimum password length is 10 digits'],
  },
  address:{
    type: String,
  },
  skuid:{
    type:String,
  },
  quantity:{
    type:Number,
  },
  TotalAmount:{
    type:Number,
  }
});

const Order = mongoose.model('OrderDetails', userSchema);

module.exports = Order;