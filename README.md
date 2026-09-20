Activity Planner

A personal activity planner and task manager with calendar views, priority-based task sorting, and chore/event tracking. Built to explore full-stack development with a strongly-typed backend and a modern frontend.

Tech Stack
Backend: ASP.NET Core (C#), Entity Framework Core
Frontend: React (Vite)
Database: SQL Server / Azure SQL
Deployment: Azure App Service (planned)
Features (MVP)
 Create, edit, delete, and complete tasks
 Assign priority levels and categories to tasks
 Calendar view of tasks by due date
 Priority-sorted task list view
Planned Features
Recurring tasks/chores
Time-blocking suggestions based on free calendar slots
Streak tracking for habits/recurring chores
Reminders/notifications
Getting Started
Prerequisites
.NET SDK (8.0 or later)
Node.js (18 or later)
SQL Server (or a local SQLite/Azure SQL instance)
Quick start (run both backend and frontend together)

From the project root, install the dev tooling once:

bash
npm install

Then start both the backend and frontend with a single command:

bash
npm run dev

This runs the ASP.NET Core API and the React dev server together in one terminal, each labeled and color-coded. Open http://localhost:5173 once both have started.

Manual setup (run each separately)

If you'd rather run them in separate terminals (e.g. to see each one's full, unlabeled output):

Backend Setup
bash
cd backend/ActivityPlanner.Api
dotnet restore
dotnet ef database update
dotnet run

The API will be available at https://localhost:{port} with Swagger docs at /swagger.

Frontend Setup
bash
cd frontend
npm install
npm run dev

The app will be available at http://localhost:5173.

Project Structure
activity-planner/
├── backend/       # ASP.NET Core Web API
└── frontend/      # React (Vite) client
