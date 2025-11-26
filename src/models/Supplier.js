const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  itemsSupplied: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
