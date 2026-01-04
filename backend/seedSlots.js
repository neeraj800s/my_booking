require("dotenv").config();
const mongoose = require("mongoose");
const Slot = require("./models/Slot");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch(err => console.log(err));

const slots = [
  { time: "10:00 AM - 11:00 AM" },
  { time: "11:00 AM - 12:00 PM" },
  { time: "12:00 PM - 01:00 PM" },
  { time: "01:00 PM - 02:00 PM" },
  { time: "12:00 PM - 01:00 PM" },
  { time: "01:00 PM - 02:00 PM" },
  { time: "02:00 PM - 03:00 PM" },
  { time: "03:00 PM - 04:00 PM" },
  { time: "04:00 PM - 05:00 PM" },
  { time: "05:00 PM - 06:00 PM" },
  { time: "06:00 AM - 11:00 AM" },
  { time: "07:00 AM - 12:00 PM" },
  { time: "08:00 PM - 01:00 PM" },
  { time: "09:00 PM - 02:00 PM" },
  { time: "10:00 PM - 01:00 PM" },
  { time: "11:00 PM - 02:00 PM" },
  { time: "12:30 AM - 01:30 AM" },
  { time: "03:40 AM - 04:40 AM" },
  { time: "05:10 AM - 05:50 AM" },
  { time: "08:35 AM - 09:40 AM" },
];

Slot.insertMany(slots)
  .then(() => {
    console.log("Slots added!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.log(err);
    mongoose.disconnect();
  });
