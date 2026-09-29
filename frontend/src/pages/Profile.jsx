import { UserRound, Mail, ShieldCheck } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import useAuthStore from "../store/authStore";


function Profile() {
    const user = useAuthStore((state) => state.user);

    const displayName =
        user?.full_name ||
        user?.name ||
        user?.username ||
        "TaskFlow User";

        const email = user?.email || "No email available"
        const initial = displayName.charAt(0).toUpperCase();

        return (
            <DashboardLayout>
                <div className="mx-auto max-w-4xl space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            My Profile
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            View your TaskFlow account information.
                        </p>
                    </div>

                    <section className="overflow-hidden rounded-2xl border border-slate">
                        <div className="h-32 bg-gradient-to-r from indigo-600 to violet-500" />
                        <div className="px-6 pb-6">
                            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div className="flex items-end gap-4">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-white bg-indigo-100
                                        text-3xl font-bold text-indigo-700 shadow-sm">
                                        {initial}

                                    </div>
                                    <div className="pb-1">
                                        <h2 className="text-sm text-slate-500">
                                            {displayName}
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            TaskFlow account
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 grid gap-4 sm:grid-col-2">
                                <div className="rounded-xl border border-slate-200 p-4">
                                    <div className="mb-3 flex items-center gap-2 text-indigo-600">
                                        <UserRound size={18} />
                                        <span className="text-sm font-medium">Full name</span>
                                    </div>
                                    <p className="break-words font-semiboldmtext-slate-900">
                                        {displayName}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-200 p-4">
                                    <div className="mb-3 flex items-center gap-2 text-indigo-600">
                                        <Mail size={18} />
                                        <span className="text-sm font-medium">Email address</span>
                                    </div>
                                    <p className="break-words font-semibold text-slate-900">
                                        {email}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-50 p-4">
                                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-900" />

                                <div>
                                    <p className="font-medium text-emerald-900">
                                        Account information
                                    </p>
                                    <p className="mt-1 text-sm text-emerald-800">
                                        Your account details are loaded from your signed-in TaskFlow session.
                                        Profile editing can be connected when the backend provides an update-profile endpoint
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                    </section>

                </div>

            </DashboardLayout>
        )

}

export default Profile
