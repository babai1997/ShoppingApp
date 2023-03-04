const express = require("express");
const multer = require("multer");

const Product = require("../models/product");

const adminRouter = new express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

adminRouter.post(
  "/add-product",
  multer({ storage: storage }).single("image"),
  async (req, res) => {
    try {
      const url = req.protocol + "://" + req.get("host");
      let product = new Product({
        name: req.body.name,
        description: req.body.desc,
        imagePath: url + "/images/" + req.file.filename,
        quantity: req.body.quantity,
        price: req.body.price,
        category: req.body.category,
      });
      product = await product.save();
      res.status(201).json({
        message: "Product Added",
        product: product,
        id: product._id,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

adminRouter.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      message: "Posts fetched successfully",
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

adminRouter.get("/get-product/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      message: "Posts fetched successfully",
      product: product,
    });
  } catch (err) {
    res.status(404).json({
      message: "Product not found",
      error: err.message,
    });
  }
});

adminRouter.delete("/delete-product/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete({ _id: req.params.id });
    res.json(product);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = adminRouter;
