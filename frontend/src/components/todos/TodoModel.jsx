import { useState, useEffect } from "react";
import { X } from "lucide-react";

function TodoModel({isOpen, onClose, onSubmit, todo=null}) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (todo) {
            setTitle(todo.title || "")
            setDescription(todo.description || "")
        } else {
            setTitle("")
            setDescription("")
        }
    }, [todo, isOpen])

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title.trim()) {
            return
        }

        try {
            setSubmitting(true)

            await onSubmit({
                title: title.trim(), 
                description: description.trim(),
            })
            onClose()
            
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slack-950/40 px-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 p-5">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            {todo ? "Edit Todo" : "Create Todo"}
                        </h2>
                        <P className="mt-1 text-sm text-slate-500">
                            {todo
                                ? "Update the details of your task."
                                : "Add something you want to accomplish."
                            }
                        </P>
                    </div>
                    <button onClick={onClose} 
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        arial-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 p-5">
                    <div>
                        <label htmlFor="todo-title" className="mb-2 block text-sm font-medium text-slate-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="todo-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white py-4 text-sm outline-none 
                                placeholder:text-slate-400 focus:border-blue focus:ring-4 focus:ring-blue-500/10"
                            placeholder="What needs to be done?"
                            required
                            autoFocus
                        />
                       
                    </div>
                    <div>
                        <label
                            htmlFor="todo-description"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="todo-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full resize-none rounded-xl border border-slate-200 bg-white py-4 px-3 text-sm outline-none
                                    placeholder:text-slate-400 focus:border-blue
                                "   
                        placeholder="Add more details ....)"
                        />
                        
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose}
                            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700
                                hover:bg-slate-50
                            "
                        >
                            Cancel  
                        </button>
                        <button
                            type="submit"
                            disabled={submitting || title.trim()}
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700
                                disabled:opacity-50 disabled:cursor-not-allowed
                            "
                        >
                            {submitting 
                                ? "Saving..."
                                : todo
                                    ? "Save Todo"
                                    : "Create Todo"
                            }
                        </button>
                    </div>                        
                    
                </form>

                </div>
            
        </div>
    )
}

export default TodoModel

