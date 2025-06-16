const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ published: true }); // ✅ solo los activos
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

const getAllProductsAdmin = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

const updatePublishStatus = async (req, res) => {
    const { id } = req.params;
    const { published } = req.body;

    try {
        await Product.findByIdAndUpdate(id, { published });
        res.json({ message: "Estado actualizado" });
    } catch (err) {
        res.status(500).json({ error: "Error actualizando estado" });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.json({ message: "Producto eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error eliminando producto" });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId, imageUrl, published } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: "Nombre y precio son obligatorios." });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            categoryId,
            imageUrl,
            published: published || false
        });

        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Error al crear producto:", err);
        res.status(500).json({ error: "Error al crear el producto" });
    }
};



module.exports = { getAllProducts, getAllProductsAdmin, updatePublishStatus, deleteProduct, createProduct };
