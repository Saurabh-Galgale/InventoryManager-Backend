const express = require("express");
const router = express.Router();
const auth = require("../middleWare/authMiddleware");
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/addproduct", auth, addProduct);
router.get("/products", auth, getProducts);
router.get("/product/:id", auth, getProduct);
router.post("/product/:id", auth, updateProduct);
router.delete("/product/:id", auth, deleteProduct);

module.exports = router;
