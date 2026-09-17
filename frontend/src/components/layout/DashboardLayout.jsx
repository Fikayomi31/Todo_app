import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";

function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (

        <div className="min-h-screen bg-slate-50">
            <div className="flex-min h-screen">
                <Sidebar isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <div className="flex min-w-0 flex-col">
                    <MobileHeader onMenuClick={() => setIsSidebarOpen(true)}/>
                    
                    <main className="flex-1">
                        {children}

                    </main>

                </div>

            </div>

        </div>
    )
}

export default DashboardLayout