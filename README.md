# Todo Application

This is a simple Todo application built as part of a 48-hour assessment. The frontend is developed using Next.js, styled with Shadcn UI components, and the backend is powered by FastAPI. 
The app allows users to create todos, assign them to users, and manage the completion status of each todo.

## Features

### Frontend (Next.js with Shadcn UI)
- Displays a list of todos.
- Form to add new todos with:
  - Title (text input)
  - User assignment (dropdown select)
- Todos are shown in a table with:
  - Title** and Assigned user
  - Completion status
- Filtering options to show all, completed, or uncompleted todos.
- Uses Shadcn UI components:
  - Card: Wraps the todo list.
  - Table: Displays todos.
  - Button: For actions like add, complete, and delete.
  - Input: For todo title input.
  - Select: For user assignment.
  - Checkbox: To mark todos as complete.
- Fully responsive design.

### Backend (FastAPI)
- Endpoints:
  - GET /todos: Returns all todos.
  - POST /todos: Creates a new todo.
  - PUT /todos/{todo_id}: Updates a todo (mark as completed).
  - DELETE /todos/{todo_id}: Deletes a todo.
  - GET /users: Returns a list of users.
- Pydantic models for data validation.
- In-memory data storage (no external database).

### Backend (FastAPI)
1. Clone the repository and navigate to the backend folder.
2. Install dependencies:
   ```bash
   pip install fastapi uvicorn
Run the FastAPI server:
uvicorn main:app --reload

Frontend (Next.js)
Navigate to the frontend folder.
Install dependencies

npm install
npm run dev
Usage
Open the frontend in your browser at http://localhost:3000.
Use the form to add todos and assign them to users.
View, filter, complete, or delete todos using the table interface.
Tech Stack
Frontend: Next.js, Shadcn UI components.
Backend: FastAPI with Pydantic models and in-memory storage.
