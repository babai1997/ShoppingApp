const mongoose = require("mongoose");
const Product = require("./product");
const cartSchema = mongoose.Schema({
  id: String,
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  productId: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  limitedQuant: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  productQuant: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
