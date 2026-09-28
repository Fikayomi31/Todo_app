import { useState } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";


import DashboardLayout from "../components/layout/DashboardLayout";
import TodoCard from "../components/todos/TodoCard";
import TodoModal from "../components/todos/TodoModal";
import DeleteModal from "../components/todos/DeleteModal";
import useTodos from "../hooks/useTodos";

function Completed() {
    const {todos, loading, error, editTodo, removeTodo,} = useTodos()

    const [editingTodo, setEditingTodo] = useState(null)
    const [deleteTodo, setDeleteTodo] = useState(null)
    const [deletingTodo, setDeletingTodo] = useState(false)

    const completedTodos = todos.filter((todo) => todo.Completed)

    const handleToggle = async (todo) => {
        await editTodo(todo.id, {
            title: todo.title,
            description: todo.description || "",
            completed: false
        })

    }

    const handleEdit = async (data) => {
        await editTodo(editingTodo, data)
        setEditingTodo(null)
    }

    const handleDelete = async () => {
        if (!deleteTodo) return

        try {
            setDeleteTodo(true)
            await removeTodo(deleteTodo.id)
            setDeleteTodo(null)
        } finally {
            setDeletingTodo(false)
        }
    }



    return (
        <DashboardLayout>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    Completed Tasks   
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    View the task you have completed
                </p>

            </div>
        </DashboardLayout>
    )
}

export default Completed
