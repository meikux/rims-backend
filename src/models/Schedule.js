const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shiftDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['manager', 'staff', 'chef', 'waiter'],
    default: 'staff'
  }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
