import { Trash2, X } from "lucide-react";

function DeleteModal({todo, isOpen, onClose, onConfirm, loading=false}) {
    if (!isOpen || !todo) {
        return null
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <Trash2 size={21} />

                    </div>
                    <button onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                    >
                        <X size={19} />

                    </button>

                </div>
                <h2 className="mt-5 text-lg font-semibold text-slate-900">
                    Delete this task?
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    You're about to delete{" "}
                    <span className="font-semibold text-slate-700">
                        "{todo.title}"
                    </span>
                    . This action cannot be undone. 
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose}
                        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold
                            text-slate-700 hover:bg-slate-50
                        "
                    >
                        Cancel
                    </button>
                    <button onClick={onClose} disabled={loading}
                        className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white
                            hover:bg-red-700 disabled:opacity-50
                        "
                    >
                        {loading ? "Deleting..." : "Delete task"}

                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
