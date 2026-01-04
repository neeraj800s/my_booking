const express = require("express");
const router = express.Router();
const Slot = require("../models/Slot");
const { protect } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/book/:id", protect, async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    if (slot.booked) return res.status(400).json({ message: "Slot already booked" });

    slot.booked = true;
    slot.bookedBy = req.user._id;
    await slot.save();

    res.json({ message: "Slot booked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my-bookings", protect, async (req, res) => {
  try {
    const slots = await Slot.find({ bookedBy: req.user._id });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
