import { Search, Bell, Plus, CheckCircle2, Clock3, ListTodo, TrendingUp } from "lucide-react";


function Dashboard() {
    const stats = [
        {
            title: "Total Tasks",
            value: "24",
            icon: ListTodo,
        },
        {
            title: "Completed",
            value: "12",
            icon: CheckCircle2,
        },
        {
            title: "Pending",
            value: "12",
            icon: Clock3,
        },
        {
            title: "Completed Rate",
            value: "50%",
            icon: TrendingUp,
        },
    ]

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {/* Header */}
            <div className="flex flex-col gap-5 md:flex-row md:itens-center md:justify-between">
                <div>
                    <p className="text-sm font-medium text-blue-600">
                        Monday, June 12 

                    </p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Good Morning, TaskFlow
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 sm:text-base">
                        Stay organized and get things done today.
                    </p>
                </div>
                <div className="felx-items-center gap-3">
                    {/* Search bar */}
                    <div className="relative hidden sm:block">
                        <Search size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="h-10 w-52 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none
                                transition placeholder:text-slate-400 
                                focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                            "
                        />

                    </div>

                    {/* Notification */}
                    <button
                        className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover: bg-slate-50"
                        aria-label="Notifications"
                    >
                        <Bell size={19} />
                        <span className=" ring-2 ring-white" />

                    </button>
                    {/* Avatar */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                        F
                    </div>
                </div>
            </div>

            {/* Stats */}
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
                                        {stat.value}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Icon size={20} />

                                </div>
                            </div>
                        </div>
                        

                    )
                })}

            </div>

        </div>
    )
}