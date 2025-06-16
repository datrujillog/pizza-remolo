const Category = require("../models/Category");

// Crear categoría
const createCategory = async (req, res) => {
    try {
        const { name, visible } = req.body;
        const category = new Category({ name, visible: visible ?? true });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        console.error("Error creando categoría:", err);
        res.status(500).json({ error: "No se pudo crear la categoría" });
    }
};

// Listar todas (admin)
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener categorías" });
    }
};

// Listar solo visibles (para Home)
const getVisibleCategories = async (req, res) => {
    try {
        const categories = await Category.find({ visible: true });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener categorías visibles" });
    }
};

const updateCategoryVisibility = async (req, res) => {
    const { id } = req.params;
    const { name, visible } = req.body;
    try {
        const updated = await Category.findByIdAndUpdate(id, { name, visible }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Error actualizando categoría" });
    }
};



module.exports = {
    createCategory,
    getAllCategories,
    getVisibleCategories,
    updateCategoryVisibility
};
