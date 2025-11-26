const express = require('express');
const Inventory = require('../models/Inventory');
const Schedule = require('../models/Schedule');
const auth = require('../middleware/auth');
const router = express.Router();

// Inventory report
router.get('/inventory', auth('manager'), async (req, res) => {
  try {
    const items = await Inventory.find();
    const lowStock = items.filter(i => i.quantity <= i.lowStockThreshold);
    res.json({ totalItems: items.length, lowStockCount: lowStock.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Staff scheduling report
router.get('/staff', auth('manager'), async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json({ totalShifts: schedules.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
