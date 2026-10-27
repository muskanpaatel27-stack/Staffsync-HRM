# SkillWallet content — StaffSync
Use these short descriptions in the matching SkillWallet sections. Adjust to your instructor's exact requirements.

## Project Architecture
StaffSync follows a client-server architecture. The React frontend provides the user interface, the Express/Node.js backend exposes REST APIs, and MongoDB stores employee and leave data. The frontend communicates with the backend using HTTP requests and JSON responses.

## Technical Architecture
The application uses the MERN stack: MongoDB, Express.js, React.js, and Node.js. React handles UI rendering and form interactions. Express defines REST endpoints. Mongoose maps JavaScript objects to MongoDB documents. The backend returns JSON data to the frontend.

## ER Diagram
There are two main entities: Employee and Leave. One Employee can have zero or many Leave records. Each Leave record belongs to one Employee through the employee reference field. Employee email is unique.

## Features
- Employee directory with add, search, view, and delete operations.
- Leave request creation and status tracking.
- Admin approval or rejection of leave requests.
- Dashboard cards for workforce and leave summaries.
- Responsive layout for desktop and mobile screens.
- REST API and persistent MongoDB storage.

## Roles and Responsibilities
Workspace Admin manages employee records and reviews leave requests. Employee data is stored as a profile and linked to leave requests. The current academic demo does not include separate employee login or authentication.

## User Flow
The admin opens the dashboard. The frontend fetches employee and leave records from the backend. The admin can add employees, search the directory, create leave requests, and approve or reject pending requests. The dashboard refreshes after successful changes.

## MVC Pattern
Model: Employee and Leave Mongoose schemas.
View: React dashboard, employee table, leave table, and forms.
Controller: Express route handlers that validate requests, call the models, and return JSON responses.

## Project Setup and Configuration
Install Node.js and MongoDB. In the backend folder, copy `.env.example` to `.env`, configure `MONGO_URI`, run `npm install`, then `npm run dev`. In a second terminal, open the frontend folder, run `npm install`, then `npm run dev`. Open the Vite URL in a browser.

## Backend Development
The Express server provides REST endpoints for employees and leave requests. Routes implement listing, creation, updates, deletion, and leave status changes. Basic validation handles required fields, duplicate email, invalid leave dates, and missing records.

## Database Development
MongoDB stores data in two collections: employees and leaves. Mongoose schemas define fields and basic validation. The Leave model references Employee, creating a one-to-many relationship.

## Frontend Development
The React frontend displays the dashboard, employee directory, and leave management pages. Reusable components handle statistics, status badges, tables, and modal forms. CSS provides a responsive dark sidebar and light content dashboard.
