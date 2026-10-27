import { Router } from "express";
import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try { res.json(await Leave.find().populate("employee", "name department email").sort({ createdAt: -1 })); }
  catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const { employee, leaveType, startDate, endDate, reason } = req.body;
    if (!employee || !startDate || !endDate) return res.status(400).json({ message: "Employee, start date and end date are required." });
    if (new Date(endDate) < new Date(startDate)) return res.status(400).json({ message: "End date cannot be before start date." });
    if (!await Employee.findById(employee)) return res.status(404).json({ message: "Employee not found." });
    const leave = await Leave.create({ employee, leaveType, startDate, endDate, reason });
    res.status(201).json(await leave.populate("employee", "name department email"));
  } catch (e) { next(e); }
});

router.patch("/:id/status", async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Approved", "Rejected"].includes(status)) return res.status(400).json({ message: "Invalid leave status." });
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true }).populate("employee", "name department email");
    if (!leave) return res.status(404).json({ message: "Leave request not found." });
    res.json(leave);
  } catch (e) { next(e); }
});

export default router;
