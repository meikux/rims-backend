// routes/inventory.js
const express = require('express');
const Inventory = require('../models/Inventory');
const auth = require('../middleware/auth');
const router = express.Router();

// Add new item (manager only)
router.post('/', auth('manager'), async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all items (staff + manager)
router.get('/', auth(), async (req, res) => {
  const items = await Inventory.find();
  res.json(items);
});

// Update item (manager only)
router.put('/:id', auth('manager'), async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete item (manager only)
router.delete('/:id', auth('manager'), async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
