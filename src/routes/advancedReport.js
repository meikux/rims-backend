const express = require('express');
const Inventory = require('../models/Inventory');
const Schedule = require('../models/Schedule');
const auth = require('../middleware/auth');
const router = express.Router();

// Inventory consumption trends (mock: items updated in last 7 days)
router.get('/consumption', auth('manager'), async (req, res) => {
  try {
    const items = await Inventory.find({ updatedAt: { $gte: new Date(Date.now() - 7*24*60*60*1000) } });
    res.json({ recentUpdates: items.length, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Staff coverage report
router.get('/coverage', auth('manager'), async (req, res) => {
  try {
    const schedules = await Schedule.find();
    const coverage = schedules.reduce((acc, s) => {
      acc[s.role] = (acc[s.role] || 0) + 1;
      return acc;
    }, {});
    res.json({ coverage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
