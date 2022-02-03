import { RequestHandler } from 'express'
import { Todo } from '../models/todo'

const TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res) => {
  const text = (req.body as { text: string }).text
  const newTodo = new Todo(Math.random().toString(), text)

  TODOS.push(newTodo)

  res.status(201).json({ message: 'Created todo', createTodo: newTodo })
}

export const getTodos: RequestHandler = (req, res) => {
  res.json({ todos: TODOS })
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res) => {
  const todoId = req.params.id
  const updatedText = (req.body as { text: string }).text

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId)

  if (todoIndex === -1) throw new Error('Could not find id')

  TODOS[todoIndex] = new Todo(todoId, updatedText)

  res.json({ message: 'updated', updatedTodo: TODOS[todoIndex] })
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res) => {
  const todoId = req.params.id
  res.json({ todos: TODOS })
}
