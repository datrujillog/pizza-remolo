const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: { type: String, enum: ["pizza", "empanada", "bebida", "postre"] },
    price: Number,
    imageUrl: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    published: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Product", productSchema);
