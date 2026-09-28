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
    const [deleting, setDeleting] = useState(false)

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
            setDeleting(false)
        }
    }



    return (
        <DashboardLayout>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Page heading */}
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                            <CheckCircle2 size={24} className="text-green-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Completed Tasks   
                            </h1>
                            <p className="mt-2 text-sm text-slate-500">
                                View the task you have completed
                            </p>
                        </div>
                    </div>    
                </div>

                {/* Todos list */}
                <div className="mt-7">
                    <p className="text-sm text-slate-500">
                        {completedTodos.length}{" "}
                        {completedTodos.length === 1 ? "task" : "tasks"} completed

                    </p>

                </div>

                {/* Error Message */}
                {error && (
                    <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}
                {/* Loading state */}
                {loading && (
                    <div className="mt-5 space-y-3">
                        {[1, 2, 3].map((item) => (
                            <div key={item}
                                className="h-28 animate-pulse rounded-2xl bg-slate-200"
                            />
                        ))}
                    </div>
                )}

                {/* Completed tasks */}
                {!loading && completedTodos.length > 0 && (
                    <div className="mt-5 space-y-3">
                        {completedTodos.map((todo) => (
                            <TodoCard
                                key={todo.id}
                                todo={todo}
                                onToggle={() => handleToggle(todo)}
                                onEdit={() => setEditingTodo(todo)}
                                onDelete={() => setDeleteTodo(todo)}
                                
                            />
                        ))}
                    </div>
                )}

                {/* No completed tasks */}
                {!loading && completedTodos.length === 0 && !error && (
                    <div className="mt-5 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashes border-slate-300 bg-white px-5 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                            <CheckCircle2 size={26} className="text-green-500" />
                        </div>
                        <h2 className="mt-4 font-semibold text-slate-900">
                            No completed tasks yet.
                        </h2>
                        <p className="mt-1 max-w-sm text-sm text-slate-500">
                            Complete some tasks to see them here.
                        </p>
                    </div>
                )}

                {/* Edit Todo Modal */}
                <TodoModal
                    isOpen={Boolean(editingTodo)}
                    onClose={() => setEditingTodo(null)}
                    todo={editingTodo}
                    onEdit={handleEdit}
                />
                {/* Delete Todo Modal */}
                <DeleteModal
                    todo={deleteTodo}
                    isOpen={Boolean(deleteTodo)}
                    isClose={() => setDeleteTodo(null)}
                    onCinfirm={handleDelete}
                    loading={deleting}
                />

            </div>
        </DashboardLayout>
    )
}

export default Completed
