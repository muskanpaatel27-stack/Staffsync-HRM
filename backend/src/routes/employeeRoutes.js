import { Router } from "express";
import Employee from "../models/Employee.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.search) {
      const re = new RegExp(String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [{ name: re }, { email: re }, { department: re }, { role: re }];
    }
    res.json(await Employee.find(filter).sort({ createdAt: -1 }));
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, department, role, status, joiningDate } = req.body;
    if (!name || !email || !department || !role) return res.status(400).json({ message: "Name, email, department and role are required." });
    const employee = await Employee.create({ name, email, department, role, status, joiningDate });
    res.status(201).json(employee);
  } catch (e) { if (e.code === 11000) return res.status(409).json({ message: "An employee with this email already exists." }); next(e); }
});

router.get("/:id", async (req, res, next) => {
  try { const item = await Employee.findById(req.params.id); if (!item) return res.status(404).json({ message: "Employee not found" }); res.json(item); }
  catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
  try {
    const item = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: "Employee not found" });
    res.json(item);
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try { const item = await Employee.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ message: "Employee not found" }); res.json({ message: "Employee deleted" }); }
  catch (e) { next(e); }
});

export default router;
