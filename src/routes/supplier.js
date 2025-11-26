const express = require('express');
const Supplier = require('../models/Supplier');
const auth = require('../middleware/auth');
const router = express.Router();

// Add supplier (manager only)
router.post('/', auth('manager'), async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all suppliers
router.get('/', auth(), async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Place order (manager only, mock)
router.post('/:id/order', auth('manager'), async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
    res.json({ message: `Order placed with ${supplier.name}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
