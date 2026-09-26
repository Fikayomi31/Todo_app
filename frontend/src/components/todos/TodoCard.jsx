import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";


function TodoCard({todo, onToggle, onEdit, onDelete}) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm
            transition hover:border-slate-300 hover:shadow-md"
        >
            <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                    onClick={() => onToggle(todo)}
                    className="mt-0.5 shrink-0"
                    aria-label={
                        todo.completed
                            ? "Mark task as pending"
                            : "Mark task as completed"
                    }
                >
                    {todo.completed ? (
                        <CheckCircle2
                            size={22}
                            className="text-blue-600"
                        />
                    ) : (
                        <Circle 
                            size={22}
                            className="text-slate-300 transition hover:text-blue-500"
                        />
                    )}

                </button>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <h3 className={`font-semibold ${todo.completed
                        ? "trxt-slate-400 line-through"
                        : "text-slate-900"
                        }`}
                    >
                        {todo.title}
                    </h3>

                    {todo.description && (
                        <p className={`mt-1 line-clamp-2 text-sm ${
                            todo.completed
                                ? "text-slate-400"
                                : "text-slate-500"
                        }`}
                        >
                            {todo.descriptiom}
                        </p>
                    )}

                    <div className="mt-3 flex items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            todo.completed
                                ? "bg-green-50 text-green-600"
                                : "bg-amber-50 text-amber-600"
                                }`
                            }
                        >
                            {todo.completed ? "completed" : "pending"}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 gap-1 opacity-100 transition 
                    sm:opacity-0 sm:group-hover:opacity-100"
                >
                    <button onClick={() => onEdit(todo)}
                        className="rounded-lg p-2 text-slate-400
                            hover:bg-slate-100 hover:text-blue-600
                        "
                        aria-label="Edit task"
                    >
                        <Pencil size={17} />         
                    </button>

                    <button onClick={() => onDelete(todo)}
                        className="rounded-lg p-2 text-slate-400
                            hover:bg-slate-100 hover:text-blue-600
                        "
                        aria-label="Delete task"

                    >
                        <Trash2 size={17} />
                        
                    </button>

                </div>

            </div>

        </div>
    )
}

export default TodoCard
