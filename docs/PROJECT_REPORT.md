# StaffSync — Modern Human Resource Management Solution
## Mini Project Report (MERN Stack)

### 1. Abstract
StaffSync is a web-based Human Resource Management System (HRMS) designed to make routine people operations easier. It provides a central place to maintain employee information, view workforce summaries, and submit or review leave requests. The application uses MongoDB for data storage, Express and Node.js for REST APIs, and React for the user interface.

### 2. Problem Statement
Small teams often manage employee records and leave requests using scattered spreadsheets, paper forms, or messages. This can make information difficult to find, update, and track. StaffSync provides a simple centralized interface for these tasks.

### 3. Objectives
- Maintain employee profiles in a central database.
- Search employees by name, email, role, or department.
- Submit and track leave requests.
- Allow a workspace administrator to approve or reject pending requests.
- Present useful summary counts on a dashboard.
- Demonstrate a full-stack application using the MERN stack.

### 4. Scope
The academic version includes employee CRUD operations, leave-request creation and status updates, search, summary cards, and a responsive dashboard. Authentication, payroll, attendance hardware integration, email notifications, and production access controls are outside the current demo scope.

### 5. Technology Used
- React: component-based frontend and interactive forms.
- Vite: frontend development server and build tool.
- Node.js: JavaScript runtime for the backend.
- Express.js: REST API routing and middleware.
- MongoDB: document database.
- Mongoose: schema modelling and database operations.
- HTML/CSS/JavaScript: structure, styling, and client-side logic.

### 6. System Architecture
The user interacts with the React UI in a browser. The frontend sends HTTP requests to the Express API. The API validates basic request data and uses Mongoose to read/write employee and leave documents in MongoDB. API responses are rendered in the dashboard.

### 7. Main Modules
1. Dashboard: total employees, active employees, pending leave requests, and approved leaves.
2. Employee Management: add, list, search, and delete employee records; backend also supports reading and updating a record.
3. Leave Management: create leave requests and approve/reject pending requests.
4. REST API: endpoints that connect the frontend to database models.
5. Database: Employee and Leave collections with a reference from Leave to Employee.

### 8. Database Design
**Employee**: `_id`, `name`, `email`, `department`, `role`, `status`, `joiningDate`, `createdAt`, `updatedAt`.

**Leave**: `_id`, `employee` (reference to Employee), `leaveType`, `startDate`, `endDate`, `reason`, `status`, `createdAt`, `updatedAt`.

Relationship: one employee can have many leave requests (one-to-many).

### 9. Functional Requirements
- The system shall display employee and leave summaries.
- The system shall allow employee creation and searching.
- The system shall allow an employee record to be removed.
- The system shall allow leave requests to be created for an existing employee.
- The system shall reject a leave request whose end date is before its start date.
- The system shall allow pending leave requests to be approved or rejected.

### 10. Non-Functional Requirements
- Usable interface on desktop and mobile-sized screens.
- Clear error messages for common API failures.
- Data stored persistently in MongoDB.
- Modular code with separate frontend, routes, and models.
- Reasonable response times for a small demonstration dataset.

### 11. User Flow
1. Admin opens the StaffSync dashboard.
2. Dashboard fetches employee and leave data from the API.
3. Admin adds an employee through the employee form.
4. Admin creates a leave request for an employee.
5. The request appears in Leave Management with Pending status.
6. Admin approves or rejects the request.
7. Dashboard counts refresh after successful operations.

### 12. Roles and Responsibilities
- **Workspace Admin**: maintains employee records and reviews leave requests.
- **Employee (represented in the data)**: has a profile and may have leave requests. A separate employee login is not implemented in this demo.
- **System**: validates basic input, stores records, and calculates dashboard summaries.

### 13. MVC Pattern
- **Model**: Mongoose schemas `Employee` and `Leave` represent data and database rules.
- **View**: React components display dashboard cards, tables, forms, and status labels.
- **Controller/Request handling**: Express route handlers process requests, apply basic validation, call models, and return JSON responses. The React view and backend routes are kept separate.

### 14. Testing Plan
- Check API health endpoint.
- Add an employee with valid information and confirm it appears in the directory.
- Try adding an employee with a duplicate email and verify the error response.
- Search for an employee by department or name.
- Create a leave request for an existing employee.
- Submit an invalid date range and verify validation.
- Approve and reject pending leave requests.
- Check responsive layout at desktop and mobile widths.

### 15. Limitations and Future Enhancements
Current demo does not include login, role-based permissions, payroll, attendance tracking, email alerts, or automated tests. Future work can add JWT authentication, separate admin/employee access, pagination, stronger validation, audit logs, payroll, attendance, and deployment.

### 16. Conclusion
StaffSync demonstrates how a MERN application can centralize employee records and leave management. The modular frontend, REST API, and MongoDB data models provide a foundation that can be extended with additional HR functions.

### 17. References
- React documentation: https://react.dev/
- Express documentation: https://expressjs.com/
- MongoDB documentation: https://www.mongodb.com/docs/
- Mongoose documentation: https://mongoosejs.com/docs/
- Vite documentation: https://vite.dev/
