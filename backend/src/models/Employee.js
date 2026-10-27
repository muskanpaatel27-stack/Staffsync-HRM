import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  department: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  status: { type: String, enum: ["Active", "On Leave", "Inactive"], default: "Active" },
  joiningDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
