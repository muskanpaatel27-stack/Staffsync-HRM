import Employee from "./models/Employee.js";
import Leave from "./models/Leave.js";

export async function seedDemoData() {
  if (await Employee.countDocuments() > 0) return;
  const employees = await Employee.insertMany([
    { name: "Aarav Sharma", email: "aarav@staffsync.demo", department: "Engineering", role: "Software Engineer", status: "Active" },
    { name: "Ananya Verma", email: "ananya@staffsync.demo", department: "Human Resources", role: "HR Executive", status: "Active" },
    { name: "Rohan Patel", email: "rohan@staffsync.demo", department: "Design", role: "UI/UX Designer", status: "On Leave" },
    { name: "Priya Singh", email: "priya@staffsync.demo", department: "Finance", role: "Accountant", status: "Active" }
  ]);
  await Leave.create([
    { employee: employees[2]._id, leaveType: "Sick", startDate: new Date("2026-10-29"), endDate: new Date("2026-10-30"), reason: "Medical rest", status: "Pending" },
    { employee: employees[0]._id, leaveType: "Casual", startDate: new Date("2026-11-04"), endDate: new Date("2026-11-04"), reason: "Personal work", status: "Approved" }
  ]);
  console.log("Demo data inserted");
}
