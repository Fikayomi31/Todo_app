import { Menu, Bell } from "lucide-react";

function MobileHeader({ onMenuClick }) {
    return (
        <header className="flex h-16 items-center justify-between border-b boarder-slate-200 bg-white px-4 lg:hidden">
            <button onClick={onMenuClick} 
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                aria-label="Open menu"
            >
                <Menu size={22} />
            </button>

            <div className="flex-items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                    T
                </div>
                <span className="font-bold text-slate-100">
                    TaskFlow
                </span>

            </div>
            <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                aria-label="Notifications"
            >
                <Bell size={22} />

            </button>

        </header>
    )
}