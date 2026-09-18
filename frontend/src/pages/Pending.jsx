import DashboardLayout from "../components/layout/DashboardLayout";

function Pending() {
    return (
        <DashboardLayout>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    Pending Tasks   
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Manage your tasks efficiently.
                </p>

            </div>
        </DashboardLayout>
    )
}

export default Pending
