const express = require("express");
const router = express.Router();
const {
    createCategory,
    getAllCategories,
    getVisibleCategories,
    updateCategoryVisibility
} = require("../controllers/categoryController");

router.post("/", createCategory);               // Crear categoría
router.get("/", getAllCategories);              // Admin: ver todas
router.get("/visible", getVisibleCategories);   // Home: solo visibles
router.patch("/:id", updateCategoryVisibility);


module.exports = router;
