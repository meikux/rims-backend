// routes/notifications.js
const express = require('express');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');
const router = express.Router();

// Create notification
router.post('/', auth(), async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get notifications for logged-in user
router.get('/my', auth(), async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark notification as read
router.put('/:id/read', auth(), async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
