import { useMemo, useState } from "react"
import { Plus, Search, SlidersHorizontal } from "lucide-react"

import DashboardLayout from "../components/layout/DashboardLayout";
import TodoCard from "../components/todos/TodoCard";
import TodoModal from "../components/todos/TodoModal";
import DeleteModal from "../components/todos/DeleteModal";
import useTodos from "../hooks/useTodos";


function Tasks() {

    const { todos, loading, error, addTodo, editTodo, removeTodo, } = useTodos()
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("newest")
    const [filter, setFilter] = useState("all")

    const [modalOpen, setModalOpen] = useState(false)
    const [editingTodo, setEditingTodo] = useState(null)

    const [deleteTodo, setDeleteTodo] = useState(null)
    const [deleting, setDeleting] = useState(false)

    const filteredTodos = useMemo(() => {
        let result = [...todos]

        if (filter === "pending") {
            result = result.filter((todos) => !todos.completed)
        }
        if (filter === "completed") {
            result = result.filter((todo) => todo.completed)
        }

        if (search.trim()) {
            const query = search.trim().toLowerCase()

            result = result.filter(
                (todo) =>
                    todo.title.toLowerCase().includes(query) ||
                    todo.description?.toLowerCase().includes(query)
            )
        }

        if (sort === "alphabetical") {
            result.sort((a, b) =>
                a.title.localeCompare(b.title)
            )
        } else if (sort === "oldest") {
            result.sort((a, b) =>
                new Date(a.created_at) - new Date(b.created_at)
            )
        } else if (sort === "newest") {
            result.sort((a, b) => 
                new Date(b.created_at) - new Date(a.created_at)
            ) 
        }
        return result
    }, [todos, filter, search, sort])

    const handleCreate = async (data) => {
        await addTodo(data)
    }

    const handleEdit = async (data) => {
        await editTodo(editingTodo.id, data)
        setEditingTodo(null)
    }

    const handleToggle = async (todo) => {
        await editTodo(todo.id, {
            title: todo.title,
            description: todo.description || "",
            completed: !todo.completed,
        })
    }

    const handleDelete = async () => {
        if (!deleteTodo) return

        try {
            setDeleting(true)
            await removeTodo(deleteTodo.id)
            setDeleteTodo(null)
        } finally {
            SetDeleting(false)
        }
    }

    const openCreateModal = () => {
        setEditingTodo(null)
        setModalOpen(true)
    }

    const openEditModal = (todo) => {
        setEditingTodo(todo)
        setModalOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        My Tasks   
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Manage your tasks efficiently.
                    </p>
                    <button onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600
                            px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700
                        "
                    >
                        <Plus size={18} />
                        Add Task
                    </button>
                </div>

                {/* Toolbar */}
                <div className="mt-7 flex flex-col gap-3 lg:flex-row">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search your tasks..."
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white
                                pl-10 pr-4 text-sm outline-none placeholder:text-slate-400
                                focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                            "
                        />
                    </div>

                    {/* Filter */}
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal size={18}
                            className="text-slate-400"
                        />
                        <select value={filter}
                            onChange={(e) =>
                                setFilter(e.target.value)
                            }
                            className="h-11 rounded-xl border border-slate-200 bg-white
                                px-3 text-sm text-slate-700 outline-none focus:border-blue-500
                            "
                        >
                            <option value={"all"}>All Tasks</option>
                            <option value={"pending"}>Pending</option>
                            <option value={"completed"}>Completed</option>
                        </select>
                        <select value={sort}
                            onChange={(e) =>
                                setSort(e.target.value)
                            }
                            className="h-11 rounded-xl border border-slate-200 bg-white
                                px-3 text-sm text-slate-700 outline-none focus:border-blue-500
                            "
                        >
                            <option value={"newest"}>Newest</option>
                            <option value={"oldest"}>Oldest</option>
                            <option value={"alphabetical"}>Alphabetical</option>
                        </select>
                    </div>
                </div>

                {/* Count */}
                <div className="mt-6">
                    <p className="text-sm text-slate-500">
                        {filteredTodos.length}{""}
                        {filteredTodos.length === 1 ? "task": "tasks"}
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}                    
                    </div>

                )}

                {/* Loading */}
                {loading && (
                    <div className="mt-5 space-y-3">
                        {[1, 2, 3].map((item) => (
                            <div key={item}
                            className="h-28 animate-pulse rounded-2xl bg-slate-200"
                            />
                        ))}

                    </div>
                )}

                {/* Tasks */}
                {!loading && filteredTodos.length > 0 && (
                    <div className="mt-5 space-y-3">
                        {filteredTodos.map((todo) => (
                            <TodoCard key={todo.id}
                                todo={todo}
                                onToggle={handleToggle}
                                onEdit={openEditModal}
                                onDelete={setDeleteTodo}
                            />
                        ))}
                    </div>

                )}

                {/* Empty state */}
                {!loading && filteredTodos.length === 0 && (
                    <div className="mt-5 flex min-h-72 flex-col items-center justify-center rounded-2xl
                            border border-dashed border-slate-300 bg-white px-5 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                            <Plus size={25}
                                className="text-slate-400"
                            />
                        </div>
                        <h3 className="mt-4 font-semibold text-slate-900">
                            {search || filter !== "all"
                                ? "No matching tasks"
                                : "No tasks yet"
                            }
                        </h3>
                        <p className="mt-1 max-w-s, text-sm text-slate-500">
                            {search || filter !== "all"
                                ? "Try changing your search or filter"
                                : "Create your first task and start getting things done"
                            }
                        </p>
                        {!search && filter === "all" && (
                            <button onClick={openCreateModal}
                                className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold
                                    text-white hover:bg-blue-700"
                            >
                                Create Task

                            </button>
                        )}
                    
                    </div>
                )}

                {/* Create/Edit Modal */}
               
                <TodoModal
                    isOpen={modalOpen}
                    onClose={() => {
                        setModalOpen(false)
                        setEditingTodo(null)
                    }}
                    onSubmit={editingTodo ? handleEdit : handleCreate}
                    todo={editingTodo}
                />

                {/* Delete Modal */}
                <DeleteModal todo={deleteTodo}
                    isOpen={Boolean(deleteTodo)}
                    onClose={() => setDeleteTodo(null)}
                    onConfirm={handleDelete}
                    loading={deleting}
                />

            </div>
        </DashboardLayout>
    )
}

export default Tasks
