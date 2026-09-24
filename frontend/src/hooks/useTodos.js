import { useCallback, useEffect, useState } from "react";
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../services/todoService";

function useTodos() {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await getTodos()
            setTodos(data.todos || data)

        } catch (err) {
            setError(
                err.response?.data?.error ||
                "Failed to fetch todos. Please try again."
            )
        } 
        finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

    const addTodo = async (todo) => {
        const data = await createTodo(todo)

        const newTodo = data.todo || data
        setTodos(prevTodos => [...prevTodos, newTodo])
        return newTodo
    }

    const editTodo = async (todoId, updatedData) => {
        const data = await updateTodo(todoId, updatedData)
        const updatedTodo = data.todo || data

        setTodos((prevTodos) =>
            prevTodos.map((item) =>
                item.id === todoId ? updatedTodo : item
            )
        )
        return updatedTodo
    }

    const removeTodo = async (todoId) => {
        await deleteTodo(todoId)

        setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todoId))
    }

    return {
        todos,
        loading,
        error,
        fetchTodos,
        addTodo,
        editTodo,
        removeTodo,
    }
}

export default useTodos
