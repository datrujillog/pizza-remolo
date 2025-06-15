const express = require("express");
const cors = require("cors");

const productRoutes = require("./src/routes/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);



module.exports = app;
