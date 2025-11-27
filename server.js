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
const logger = require('./src/middleware/logger');
const notificationRoutes = require('./src/routes/notifications');
const advancedReportRoutes = require('./src/routes/advancedReports');
const errorHandler = require('./src/middleware/errorHandler');
const cors = require('cors');
const app = express();
app.use(cors());
dotenv.config(); // Load .env
connectDB();     // Connect to MongoDB


app.use(express.json());

app.use('/auth', authRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/inventory/alerts', inventoryAlertsRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/reports', reportRoutes);
app.use(logger);
app.use('/notifications', notificationRoutes);
app.use('/reports/advanced', advancedReportRoutes);

// Global error handler must be last
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
