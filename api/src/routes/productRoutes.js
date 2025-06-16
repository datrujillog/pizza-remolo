const express = require("express");
const router = express.Router();
const { getAllProducts, getAllProductsAdmin, updatePublishStatus, deleteProduct, createProduct } = require("../controllers/productController");

router.get("/", getAllProducts);

// Solo para admin: todos los productos (publicados o no)
router.get("/admin", getAllProductsAdmin);
router.patch("/:id/publish", updatePublishStatus);
router.delete("/:id", deleteProduct);
router.post("/create", createProduct);



module.exports = router;
