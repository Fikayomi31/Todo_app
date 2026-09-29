
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  Bell,
  Plus,
  CheckCircle2,
  Clock3,
  ListTodo,
  TrendingUp,
  ArrowRight,
} from "lucide-react"

import DashboardLayout from "../components/layout/DashboardLayout"
import useTodos from "../hooks/useTodos"

function Dashboard() {
  const navigate = useNavigate()
  const { todos, loading, error } = useTodos()

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length

  const pendingCount = todos.length - completedCount

  const completionRate =
    todos.length === 0
      ? 0
      : Math.round((completedCount / todos.length) * 100)

  const stats = [
    {
      title: "Total Tasks",
      value: todos.length,
      icon: ListTodo,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Completed",
      value: completedCount,
      icon: CheckCircle2,
      iconStyle: "bg-green-50 text-green-600",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: Clock3,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      iconStyle: "bg-violet-50 text-violet-600",
    },
  ]

  const recentTodos = useMemo(() => {
    return [...todos]
      .sort(
        (a, b) =>
          new Date(b.created_at || 0) -
          new Date(a.created_at || 0)
      )
      .slice(0, 5)
  }, [todos])

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  const handleAddTask = () => {
    navigate("/tasks")
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              {today}
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welcome to TaskFlow
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Stay organized and get things done today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search tasks..."
                onFocus={() => navigate("/tasks")}
                readOnly
                className="h-10 w-52 cursor-pointer rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Notifications */}
            <button
              type="button"
              className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </button>

            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
              T
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                      {loading ? "—" : stat.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconStyle}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Tasks */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Recent Tasks
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your five most recently created tasks.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddTask}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-3 p-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-16 animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>
          )}

          {/* Task list */}
          {!loading && recentTodos.length > 0 && (
            <div className="divide-y divide-slate-100">
              {recentTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        todo.completed
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {todo.completed ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <Clock3 size={18} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`truncate text-sm font-medium ${
                          todo.completed
                            ? "text-slate-400 line-through"
                            : "text-slate-800"
                        }`}
                      >
                        {todo.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {todo.description || "No description"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                      todo.completed
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && recentTodos.length === 0 && !error && (
            <div className="flex min-h-64 flex-col items-center justify-center px-5 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <ListTodo size={26} />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No tasks yet
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Get started by adding your first task.
              </p>

              <button
                type="button"
                onClick={handleAddTask}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Plus size={17} />
                Create Task
              </button>
            </div>
          )}

          {/* View all */}
          {!loading && todos.length > 5 && (
            <div className="border-t border-slate-100 px-5 py-4">
              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all tasks
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard