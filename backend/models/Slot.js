const mongoose = require("mongoose");

const slotSchema = mongoose.Schema({
  time: { type: String, required: true },
  booked: { type: Boolean, default: false },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
});

module.exports = mongoose.model("Slot", slotSchema);
