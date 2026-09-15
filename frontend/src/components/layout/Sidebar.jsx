import { LayoutDashboard, ListTodo, CheckCircle2, Clock3, Sttings, Logout, X} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
    const navigation = [
        { name: "Dashboard", icon: LayoutDashboard, active: true },
        { name: "My Tasks", icon: ListTodo },
        { name: "Completed", icon: CheckCircle2 },
        { name: "Pending", icon: Clock3 },

    ]

    return (
        <>
            {/* Mobile layout */}
            {isOpen && (
                <div onClick={onCLose}
                    className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
                />

               
            )}
            <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white
                transition-transform duration-300 lg:static lg:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Logo */}
                <div className="flex h-20 items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                            T
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            TaskFlow
                        </span>

                    </div>
                    <button onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />

                    </button>
                    
                </div>
                {/* Navigation */}
                <nav className="flex-1 px-4 py-6">
                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Workspace
                    </p>
                    <div className="space-y-1">
                        {navigation.map((item) => (
                            const Icon = item.icon
                            return (
                                <button key={item.name}
                                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition
                                        ${item.active
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"

                                        }
                                    `}
                                >
                                    <Icon size={19} strokewidth={1.8} />
                                    <span>{item.name}</span>

                                    {item.name === "My Tasks" && (
                                        <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-400">
                                            12
                                        </span>
                                    )}
                                </button>
                            )}

                    </div>
                </nav>

            </aside>
        </>
    )
}