import { useState } from "react";
import { Clock3 } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import TodoCard from "../components/todos/TodoCard";
import TodoModal from "../components/todos/TodoModal";
import DeleteModal from "../components/todos/DeleteModal";
import useTodos from "../hooks/useTodos";


function Pending() {

    const {todos, loading, error, editTodo, removeTodo,} = useTodos()
    const [editingTodo, setEditingTodo] = useState(null)
    const [deleteTodo, setDeleteTodo] = useState(null)
    const [deleting, setDeleting] = useState(false)

    const pendingTodos = todos.filter((todo) => !todo.Completed)
    
    const handleToggle = async (todo) => {
        await editTodo(todo.id, {
            title: todo.title,
            description: todo.description || "",
            completed: true,

        })
    }
    const handleEdit = async (data) => {
        await editTodo(editingTodo, data)
        setEditingTodo(null)
    }

    const handleDelete = async () => {
        if (!deleteTodo) return

        try {
            setDeleting(true)
            await removeTodo(deleteTodo.id)
            setDeleteTodo(null)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Page heading */}
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100">
                        <Clock3 size={24} className="text-amber-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Pending Tasks   
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Manage your tasks efficiently.
                        </p>
                    </div>

                </div>
                
                {/* Task Count */}
                <div className="mt-7">
                    <p className="text-sm text-slate-500">
                        {pendingTodos.length}{" "}
                        {pendingTodos.length === 1 ? "task" : "tasks"} pending
                    </p>
                </div>

                {/* Error message */}
                {error && (
                    <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="mt-5 space-y-3">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="h-28 animate-pulse rounded-2xl bg-slate-200" />
                        ))}
                    </div>
                )}

                {/* Pending tasks */}
                {!loading && pendingTodos.length > 0 && (
                    <div className="mt-5 space-y-3">
                        {pendingTodos.map((todo) => (
                            <TodoCard
                                key={todo.id}
                                todo={todo}
                                onToggle={() => handleToggle(todo)}
                                onEdit={() => setEditingTodo(todo.id)}
                                onDelete={() => setDeleteTodo(todo)}
                            />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && pendingTodos.length === 0 && !error && (
                    <div className="mt-5 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50">
                            <Clock3 size={24} className="text-amber-600" />

                        </div>
                        <h2 className="mt-4 font-semibold text-slate-900">
                            No Pending Tasks
                        </h2>
                        <p className="mt-1 max-w-sm text-smtext-slate-500">
                            You're all caught up. New tasks will appear here until you complete them
                        </p>
                    </div>
                )}
                {/* Edit Todo Modal */}
                <TodoModal
                    isOpen={Boolean(editingTodo)}
                    onClose={() => setEditingTodo(null)}
                    onSubmit={handleEdit}
                    todo={editingTodo}
                />

                {/* Delete Todo Modal */}
                <DeleteModal
                    todo={deleteTodo}
                    isOpen={Boolean(deleteTodo)}
                    onClose={() => setDeleteTodo(null)}
                    onConfirm={handleDelete}
                    loading={deleting}
                />

            </div>
        </DashboardLayout>
    )
}

export default Pending
