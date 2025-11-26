// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const inventoryAlertsRoutes = require('./src/routes/inventoryAlerts');
const inventoryRoutes = require("./src/routes/./inventory")
const scheduleRoutes = require('./src/routes/schedule');
const supplierRoutes = require('./src/routes/supplier');
const reportRoutes = require('./src/routes/reports');

dotenv.config(); // Load .env
connectDB();     // Connect to MongoDB

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/inventory/alerts', inventoryAlertsRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
