const express = require("express");
const {createProduct, getProducts, getProductDetail, updateProduct} = require("../controller/product.controller");
const {uploadProduct} = require("../middleware/upload.middleware");
const {adminAuthorities, authMiddleware} = require("../middleware/auth.middleware")

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductDetail);
router.post("/", authMiddleware, adminAuthorities, uploadProduct.single("image"), createProduct);
router.put("/:id", authMiddleware, adminAuthorities, uploadProduct.single("image"), updateProduct);

module.exports = router;