from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Make sure this is imported
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,  # This is the correct middleware class
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define the model for creating a Todo (excluding 'id')
class TodoCreate(BaseModel):
    title: str
    completed: bool = False
    user_id: Optional[str] = None

# Define the full model for a Todo (includes 'id')
class Todo(TodoCreate):
    id: str  # ID is required when responding

# Define the model for a User
class User(BaseModel):
    id: str
    name: str

# In-memory data stores (for simplicity, no database)
todos = []
users = [
    {"id": "1", "name": "User 1"},
    {"id": "2", "name": "User 2"},
    {"id": "3", "name": "User 3"},
    {"id": "4", "name": "User 4"},
]

# Endpoint to retrieve all todos
@app.get("/todos", response_model=List[Todo])
def get_todos():
    return todos

# Endpoint to create a new todo
@app.post("/todos", response_model=Todo)
def create_todo(todo: TodoCreate):
    # Create a new Todo item with a generated id
    new_todo = Todo(
        id=str(uuid.uuid4()),  # Generate a unique id
        title=todo.title,
        completed=todo.completed,
        user_id=todo.user_id
    )
    todos.append(new_todo)
    return new_todo

# Endpoint to update a todo (e.g., mark it as completed)
@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: str, updated_todo: TodoCreate):
    for todo in todos:
        if todo.id == todo_id:
            todo.title = updated_todo.title
            todo.completed = updated_todo.completed
            todo.user_id = updated_todo.user_id
            return todo
    return {"error": "Todo not found"}

# Endpoint to delete a todo
@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: str):
    global todos
    todos = [todo for todo in todos if todo.id != todo_id]
    return {"message": "Todo deleted"}

# Endpoint to get all users
@app.get("/users", response_model=List[User])
def get_users():
    return users

