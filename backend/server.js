const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const slotRoutes = require("./routes/slotRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors")

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/slots", slotRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
