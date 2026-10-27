import { useEffect, useMemo, useState } from "react";
import { LayoutDashboard, Users, CalendarDays, Search, Bell, Plus, ArrowUpRight, BriefcaseBusiness, Clock3, CheckCircle2, XCircle, Menu, X, ChevronDown } from "lucide-react";

const API = "http://localhost:5000/api";
const moneyDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [tab, setTab] = useState("Overview");
  const [search, setSearch] = useState("");
  const [showEmployee, setShowEmployee] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  async function load() {
    try {
      const [e, l] = await Promise.all([fetch(`${API}/employees`), fetch(`${API}/leaves`)]);
      if (!e.ok || !l.ok) throw new Error("Could not load data");
      setEmployees(await e.json()); setLeaves(await l.json()); setNotice("");
    } catch { setNotice("Connect the backend and MongoDB to load live data."); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => employees.filter(e => [e.name,e.email,e.department,e.role].some(v => v?.toLowerCase().includes(search.toLowerCase()))), [employees, search]);
  const pending = leaves.filter(l => l.status === "Pending").length;
  const active = employees.filter(e => e.status === "Active").length;

  async function addEmployee(ev) {
    ev.preventDefault(); const f = new FormData(ev.currentTarget);
    try {
      const r = await fetch(`${API}/employees`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(Object.fromEntries(f)) });
      const data = await r.json(); if (!r.ok) throw new Error(data.message);
      setShowEmployee(false); setNotice("Employee added successfully."); await load();
    } catch(e) { setNotice(e.message || "Unable to add employee."); }
  }
  async function addLeave(ev) {
    ev.preventDefault(); const f = new FormData(ev.currentTarget);
    try {
      const r = await fetch(`${API}/leaves`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(Object.fromEntries(f)) });
      const data = await r.json(); if (!r.ok) throw new Error(data.message);
      setShowLeave(false); setNotice("Leave request created."); await load();
    } catch(e) { setNotice(e.message || "Unable to create leave request."); }
  }
  async function setLeaveStatus(id, status) {
    try { const r = await fetch(`${API}/leaves/${id}/status`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({status}) }); if (!r.ok) throw new Error(); await load(); }
    catch { setNotice("Could not update leave status."); }
  }
  async function deleteEmployee(id) {
    if (!confirm("Delete this employee?")) return;
    try { const r = await fetch(`${API}/employees/${id}`, {method:"DELETE"}); if (!r.ok) throw new Error(); await load(); setNotice("Employee deleted."); }
    catch { setNotice("Could not delete employee."); }
  }

  const nav = [{name:"Overview", icon:LayoutDashboard},{name:"Employees",icon:Users},{name:"Leave Management",icon:CalendarDays}];
  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav?"open":""}`}>
      <div className="brand"><div className="brand-mark">S</div><span>staff<span className="brand-light">sync</span><small>PEOPLE OPERATIONS</small></span><button className="close-nav" onClick={()=>setMobileNav(false)}><X size={18}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{nav.map(n=><button key={n.name} className={`nav-item ${tab===n.name?"selected":""}`} onClick={()=>{setTab(n.name);setMobileNav(false)}}><n.icon size={18}/>{n.name}{n.name==="Leave Management"&&pending>0&&<span className="nav-count">{pending}</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon">✦</div><b>Need a hand?</b><p>Make people operations feel effortless.</p><button onClick={()=>setNotice("Tip: use Employees to manage your team and Leave Management to review requests.")}>Explore tips <ArrowUpRight size={14}/></button></div><div className="profile"><div className="avatar">AD</div><div><b>Admin Demo</b><small>Workspace admin</small></div><ChevronDown size={16}/></div></div>
    </aside>
    {mobileNav&&<div className="scrim" onClick={()=>setMobileNav(false)} />}
    <main className="main">
      <header className="topbar"><button className="menu-btn" onClick={()=>setMobileNav(true)}><Menu/></button><div className="crumb">Workspace <span>/</span> <b>{tab}</b></div><div className="top-actions"><div className="today-pill"><span className="online-dot"></span> Workspace active</div><button className="icon-btn" title="Notifications" onClick={()=>setTab("Leave Management")}><Bell size={18}/>{pending>0&&<i/>}</button><div className="top-avatar">AD</div></div></header>
      <section className="page-content">
        <div className="welcome-row"><div><div className="eyebrow">TUESDAY, OCTOBER 27, 2026</div><h1>{tab==="Overview"?"Good evening, Admin":tab==="Employees"?"People directory":"Leave management"}<span className="wave"> {tab==="Overview"?"✦":""}</span></h1><p className="subtitle">{tab==="Overview"?"Here’s what’s happening with your team today.":tab==="Employees"?"Manage your people, roles and team information.":"Review time-off requests and keep the team in sync."}</p></div><div className="header-buttons">{tab!=="Leave Management"&&<button className="btn-primary" onClick={()=>setShowEmployee(true)}><Plus size={17}/> Add employee</button>}{tab!=="Employees"&&<button className="btn-secondary" onClick={()=>setShowLeave(true)}><Plus size={17}/> New leave request</button>}</div></div>
        {notice&&<div className="notice"><span>{notice}</span><button onClick={()=>setNotice("")}>×</button></div>}
        {tab==="Overview"&&<>
          <div className="stats-grid">
            <Stat title="Total employees" value={employees.length} icon={Users} tone="purple" detail="Across all departments" />
            <Stat title="Active employees" value={active} icon={BriefcaseBusiness} tone="green" detail={`${employees.length?Math.round(active/employees.length*100):0}% of your workforce`} />
            <Stat title="Pending requests" value={pending} icon={Clock3} tone="orange" detail="Waiting for a decision" />
            <Stat title="Approved leaves" value={leaves.filter(l=>l.status==="Approved").length} icon={CheckCircle2} tone="blue" detail="Requests approved" />
          </div>
          <div className="content-grid">
            <section className="panel team-panel"><div className="panel-head"><div><h2>Team overview</h2><p>Your people at a glance</p></div><button className="text-btn" onClick={()=>setTab("Employees")}>View directory <ArrowUpRight size={15}/></button></div><EmployeeTable employees={employees.slice(0,5)} onDelete={deleteEmployee}/></section>
            <section className="panel leave-panel"><div className="panel-head"><div><h2>Leave requests</h2><p>Recent time-off activity</p></div><button className="round-link" onClick={()=>setTab("Leave Management")}><ArrowUpRight size={17}/></button></div>{leaves.slice(0,4).length?leaves.slice(0,4).map(l=><div className="leave-mini" key={l._id}><div className="leave-avatar">{(l.employee?.name||"E").split(" ").map(x=>x[0]).join("").slice(0,2)}</div><div className="leave-mini-info"><b>{l.employee?.name||"Employee"}</b><span>{l.leaveType} leave · {moneyDate(l.startDate)}</span></div><Status status={l.status}/></div>):<Empty text="No leave requests yet"/>}</section>
          </div>
          <section className="bottom-banner"><div className="banner-symbol">✦</div><div><b>Great teams start with great people operations.</b><p>Keep employee information up to date and review pending leave requests regularly.</p></div><button onClick={()=>setTab("Employees")}>Manage team <ArrowUpRight size={15}/></button></section>
        </>}
        {tab==="Employees"&&<section className="panel directory-panel"><div className="panel-head"><div><h2>All employees <span className="count-badge">{employees.length}</span></h2><p>Search and manage your employee records</p></div><button className="btn-primary compact" onClick={()=>setShowEmployee(true)}><Plus size={16}/> Add employee</button></div><div className="table-toolbar"><div className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, department, email..."/></div><span>{filtered.length} result(s)</span></div><EmployeeTable employees={filtered} onDelete={deleteEmployee}/></section>}
        {tab==="Leave Management"&&<section className="panel directory-panel"><div className="panel-head"><div><h2>Leave requests <span className="count-badge">{leaves.length}</span></h2><p>Review and update employee time-off requests</p></div><button className="btn-primary compact" onClick={()=>setShowLeave(true)}><Plus size={16}/> New request</button></div><div className="leave-table-wrap"><table><thead><tr><th>EMPLOYEE</th><th>TYPE</th><th>DATES</th><th>REASON</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{leaves.map(l=><tr key={l._id}><td><div className="person-cell"><div className="avatar small">{(l.employee?.name||"E").split(" ").map(x=>x[0]).join("").slice(0,2)}</div><div><b>{l.employee?.name||"Employee"}</b><small>{l.employee?.department||""}</small></div></div></td><td>{l.leaveType}</td><td>{moneyDate(l.startDate)}<small className="block">to {moneyDate(l.endDate)}</small></td><td>{l.reason||"—"}</td><td><Status status={l.status}/></td><td>{l.status==="Pending"?<div className="action-group"><button className="approve" onClick={()=>setLeaveStatus(l._id,"Approved")} title="Approve"><CheckCircle2 size={16}/></button><button className="reject" onClick={()=>setLeaveStatus(l._id,"Rejected")} title="Reject"><XCircle size={16}/></button></div>:"—"}</td></tr>)}</tbody></table>{!leaves.length&&<Empty text="No leave requests found"/>}</div></section>}
        <footer>© 2026 StaffSync <span>Built for better people operations</span><span className="api-status"><i/> {loading?"Loading data":"HR workspace"}</span></footer>
      </section>
    </main>
    {showEmployee&&<Modal title="Add employee" close={()=>setShowEmployee(false)}><form onSubmit={addEmployee}><label>Full name<input name="name" required placeholder="e.g. Aditi Sharma"/></label><label>Email address<input name="email" type="email" required placeholder="aditi@company.com"/></label><div className="form-row"><label>Department<select name="department" required><option value="">Choose department</option>{["Engineering","Human Resources","Design","Finance","Marketing","Operations","Sales"].map(x=><option>{x}</option>)}</select></label><label>Role<input name="role" required placeholder="e.g. Software Engineer"/></label></div><label>Status<select name="status"><option>Active</option><option>On Leave</option><option>Inactive</option></select></label><div className="modal-actions"><button type="button" className="btn-secondary" onClick={()=>setShowEmployee(false)}>Cancel</button><button className="btn-primary">Save employee</button></div></form></Modal>}
    {showLeave&&<Modal title="Create leave request" close={()=>setShowLeave(false)}><form onSubmit={addLeave}><label>Employee<select name="employee" required defaultValue=""><option value="" disabled>Select employee</option>{employees.map(e=><option value={e._id} key={e._id}>{e.name} — {e.department}</option>)}</select></label><label>Leave type<select name="leaveType"><option>Casual</option><option>Sick</option><option>Earned</option><option>Other</option></select></label><div className="form-row"><label>Start date<input type="date" name="startDate" required/></label><label>End date<input type="date" name="endDate" required/></label></div><label>Reason<textarea name="reason" rows="3" placeholder="Briefly describe the reason"/></label><div className="modal-actions"><button type="button" className="btn-secondary" onClick={()=>setShowLeave(false)}>Cancel</button><button className="btn-primary">Create request</button></div></form></Modal>}
  </div>;
}
function Stat({title,value,icon:Icon,tone,detail}) { return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={20}/></div><div className="stat-title">{title}</div><div className="stat-value">{value}</div><div className="stat-detail">{detail}</div></div>; }
function Status({status}) { return <span className={`status status-${(status||"pending").toLowerCase().replace(" ","-")}`}><i/>{status}</span>; }
function Empty({text}) { return <div className="empty">{text}</div>; }
function EmployeeTable({employees,onDelete}) { return <div className="table-wrap"><table><thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>ROLE</th><th>STATUS</th><th></th></tr></thead><tbody>{employees.map(e=><tr key={e._id}><td><div className="person-cell"><div className="avatar small">{e.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div><div><b>{e.name}</b><small>{e.email}</small></div></div></td><td>{e.department}</td><td>{e.role}</td><td><Status status={e.status}/></td><td><button className="delete-btn" onClick={()=>onDelete(e._id)} title="Delete employee">×</button></td></tr>)}</tbody></table>{!employees.length&&<Empty text="No employees found. Add an employee to get started."/>}</div>; }
function Modal({title,close,children}) { return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&close()}><section className="modal"><div className="modal-head"><h2>{title}</h2><button onClick={close}><X size={19}/></button></div>{children}</section></div>; }
