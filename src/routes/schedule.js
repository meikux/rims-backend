// routes/schedule.js
const express = require('express');
const Schedule = require('../models/Schedule');
const auth = require('../middleware/auth');
const router = express.Router();

// Add a shift (manager only)
router.post('/', auth('manager'), async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all shifts (manager + staff)
router.get('/', auth(), async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('staffId', 'username role');
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get shifts for logged-in user
router.get('/my', auth(), async (req, res) => {
  try {
    const schedules = await Schedule.find({ staffId: req.user.id });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a shift (manager only)
router.put('/:id', auth('manager'), async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(schedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a shift (manager only)
router.delete('/:id', auth('manager'), async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: 'Shift deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
