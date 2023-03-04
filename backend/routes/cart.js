const express = require("express");
const cartRouter = new express.Router();

const Cart = require("../models/cart");

cartRouter.post("/add-product", async (req, res) => {
  try {
    let cartData = new Cart({
      userId: req.body.userId,
      productId: req.body.productId,
      name: req.body.name,
      desc: req.body.desc,
      limitedQuant: req.body.limitedQuant,
      imagePath: req.body.imagePath,
      productQuant: req.body.productQuant,
      price: req.body.price,
      category: req.body.category,
    });
    cartProduct = await cartData.save();
    res.status(201).json({
      message: "product Added to Cart",
      cartData: cartData,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

cartRouter.get("/get-product/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const cartData = await Cart.find({ userId: id });
    res.status(200).json({
      message: "Cart Product fetched successfully",
      cartData: cartData,
    });
  } catch (err) {
    res.status(404).json({
      message: "Product not found",
      error: err.message,
    });
  }
});

cartRouter.put("/update/:cartId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartData = await Cart.findOneAndUpdate(
      {
        _id: cartId,
      },
      { productQuant: req.body.productQuant }
    );
    res.status(200).json({
      message: "Cart Product updated successfully",
      cartData: cartData,
    });
  } catch (err) {
    res.status(404).json({
      message: "Product not found",
      error: err.message,
    });
  }
});

cartRouter.delete("/delete/:cartId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartData = await Cart.findOneAndDelete({
      _id: cartId,
    });
    res.status(200).json({
      message: "Cart Product delete successfully",
      cartData: cartData,
    });
  } catch (err) {
    res.status(404).json({
      message: "Product not found",
      error: err.message,
    });
  }
});

module.exports = cartRouter;
