import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import employeeRoutes from "./src/routes/employeeRoutes.js";
import leaveRoutes from "./src/routes/leaveRoutes.js";
import { seedDemoData } from "./src/seed.js";

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok", app: "StaffSync API" }));
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/staffsync")
  .then(async () => {
    console.log("Connected to MongoDB");
    await seedDemoData();
    app.listen(PORT, () => console.log(`StaffSync API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed. Check backend/.env and make sure MongoDB is running.");
    console.error(err.message);
    process.exit(1);
  });
