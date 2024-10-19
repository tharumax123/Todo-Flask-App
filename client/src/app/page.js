'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function TodoApp() {
  const [todos, setTodos] = useState([])
  const [users, setUsers] = useState([])
  const [newTodo, setNewTodo] = useState({ title: '', userId: '' })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchTodos()
    fetchUsers()
  }, [])

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:8000/todos')
    setTodos(response.data)
  }

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:8000/users')
    setUsers(response.data)
  }

  const addTodo = async () => {
    if (newTodo.title && newTodo.userId) {
      const todoData = {
        title: newTodo.title,
        user_id: newTodo.userId,
        completed: false,
      }

      try {
        const response = await axios.post('http://localhost:8000/todos', todoData)
        console.log(response.data)
        setNewTodo({ title: '', userId: '' })
        fetchTodos()
      } catch (error) {
        console.error("There was an error!", error)
      }
    }
  }



const toggleComplete = async (todoId, completed) => {
    // Find the todo that is being updated
    const todoToUpdate = todos.find(todo => todo.id === todoId);
    
    // Make sure the entire todo object is sent, not just the "completed" field
    const updatedTodo = {
      title: todoToUpdate.title,
      completed: completed,  // Toggle the completed status
      user_id: todoToUpdate.user_id  // Include user assignment
    };
  
    try {
      await axios.put(`http://localhost:8000/todos/${todoId}`, updatedTodo);
      fetchTodos();  // Refresh todos after update
    } catch (error) {
      console.error("There was an error updating the todo!", error);
    }
  };
  

  const deleteTodo = async (todoId) => {
    await axios.delete(`http://localhost:8000/todos/${todoId}`)
    fetchTodos()
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed
    if (filter === 'uncompleted') return !todo.completed
    return true
  })

  return (<div className='flex h-screen w-screen justify-center items-center'>
    
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Todo App</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Todo Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <Select
            value={newTodo.userId}
            onValueChange={(value) => setNewTodo({ ...newTodo, userId: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Assign User" />
            </SelectTrigger>
            <SelectContent>
              {users.map(user => (
                <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addTodo}>Add Todo</Button>
        </div>

        <div className="flex gap-2 mb-4">
          <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All</Button>
          <Button variant={filter === 'completed' ? 'default' : 'outline'} onClick={() => setFilter('completed')}>Completed</Button>
          <Button variant={filter === 'uncompleted' ? 'default' : 'outline'} onClick={() => setFilter('uncompleted')}>Uncompleted</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTodos.map(todo => (
              <TableRow key={todo.id}>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{users.find(user => user.id === todo.user_id)?.name || 'Unassigned'}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleComplete(todo.id, !todo.completed)}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>

  )
}

