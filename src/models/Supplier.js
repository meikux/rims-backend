const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contactPerson: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\+?[0-9\s\-]{7,15}$/, "Please enter a valid phone number"],
  },
  itemsSupplied: [{ type: String, trim: true }],
  address: { type: String, trim: true },
  reliabilityScore: { type: Number, min: 0, max: 100, default: 100 }, // % on-time deliveries
}, { timestamps: true });

module.exports = mongoose.model("Supplier", supplierSchema);
