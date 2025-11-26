const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: { type: String, enum: ['inventory', 'schedule'], required: true },
  message: { type: String, required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
