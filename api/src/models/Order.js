const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number
        }
    ],
    total: Number,
    customerName: String,
    address: String,
    note: String,
    status: {
        type: String,
        enum: ["pendiente", "confirmado", "entregado"],
        default: "pendiente"
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
