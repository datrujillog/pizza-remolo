// src/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/donremolo";

const products = [
    // PIZZAS
    {
        name: "Pizza Jamón y Morrón",
        description: "Clásica pizza con jamón y morrón",
        category: "pizza",
        price: 28000,
        imageUrl: "http://localhost:5000/images/jamonymorron.jpg"
    },

    // EMPANADAS
    {
        name: "Empanada de Carne",
        description: "Empanada rellena de carne sazonada",
        category: "empanada",
        price: 4500,
        imageUrl: "http://localhost:5000/images/empanada_carne.jpg"
    },
    {
        name: "Empanada de Atún",
        description: "Empanada con relleno de atún",
        category: "empanada",
        price: 4500,
        imageUrl: "http://localhost:5000/images/empanada_atun.jpg"
    },
    {
        name: "Empanada de Jamón y Queso",
        description: "Rellena de jamón y queso fundido",
        category: "empanada",
        price: 4500,
        imageUrl: "http://localhost:5000/images/empanada_jamonyqueso.jpg"
    },

    // BEBIDAS
    {
        name: "Cerveza Brahma",
        description: "Cerveza bien fría de 330ml",
        category: "bebida",
        price: 7000,
        imageUrl: "http://localhost:5000/images/cerveza.jpg"
    },
    {
        name: "Gaseosa Cola",
        description: "Botella de 600ml",
        category: "bebida",
        price: 5000,
        imageUrl: "http://localhost:5000/images/gaseosa.jpg"
    },

    // POSTRES
    {
        name: "Bombones Surtidos",
        description: "Variedad de bombones artesanales",
        category: "postre",
        price: 6000,
        imageUrl: "http://localhost:5000/images/bombones.jpg"
    },
    {
        name: "Helado de Vainilla",
        description: "Helado cremoso de vainilla",
        category: "postre",
        price: 7500,
        imageUrl: "http://localhost:5000/images/helado.jpg"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        await Product.deleteMany(); // Limpia la colección
        await Product.insertMany(products);
        console.log("🎉 Productos insertados con éxito");
        process.exit();
    } catch (err) {
        console.error("Error al insertar productos:", err);
        process.exit(1);
    }
};

seedDatabase();
