const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
    try {
        const { items, customerName, note, address, total } = req.body;

        let fullOrderText = `Hola, quiero hacer un pedido:\n`;
        let calculatedTotal = 0;

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) continue;

            const subtotal = product.price * item.quantity;
            calculatedTotal += subtotal;

            const emojiMap = {
                pizza: "🍕",
                empanada: "🥟",
                bebida: "🥤",
                postre: "🍨"
            };

            const emoji = emojiMap[product.category] || "🔹";
            fullOrderText += `${emoji} ${product.name} x${item.quantity}\n`;
        }

        fullOrderText += `💰 Total: $${calculatedTotal}\n`;
        if (note) fullOrderText += `📝 Nota: ${note}\n`;
        if (address) fullOrderText += `📍 Dirección: ${address}\n`;
        if (customerName) fullOrderText += `👤 Cliente: ${customerName}`;

        const newOrder = await Order.create({
            items,
            total: calculatedTotal,
            customerName,
            note,
            address
        });

        const waMessage = encodeURIComponent(fullOrderText);
        const whatsappUrl = `https://wa.me/573225741944?text=${waMessage}`;

        res.status(201).json({
            message: "Pedido creado",
            orderId: newOrder._id,
            whatsappUrl
        });
    } catch (error) {
        console.error("Error al crear pedido:", error);
        res.status(500).json({ error: "No se pudo procesar el pedido" });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["pendiente", "confirmado", "entregado"].includes(status)) {
            return res.status(400).json({ error: "Estado inválido" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        res.json({ message: "Estado actualizado", order: updatedOrder });
    } catch (error) {
        console.error("Error al actualizar estado:", error);
        res.status(500).json({ error: "No se pudo actualizar el estado" });
    }
};



module.exports = { createOrder, updateOrderStatus };
