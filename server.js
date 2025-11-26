// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const inventoryAlertsRoutes = require('./src/routes/inventoryAlerts');
const inventoryRoutes = require("./src/routes/./inventory")
dotenv.config(); // Load .env
connectDB();     // Connect to MongoDB

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/inventory', inventoryRoutes);

app.use('/inventory/alerts', inventoryAlertsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
