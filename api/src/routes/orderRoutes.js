const express = require("express");
const router = express.Router();
const { createOrder, updateOrderStatus, getAllOrders } = require("../controllers/orderController");

router.post("/", createOrder);

router.patch("/:id/status", updateOrderStatus);

router.get("/", getAllOrders);



module.exports = router;
