import { useState } from "react";
import { UserRound, LockKeyhole, Bell, Save } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";

function Settings() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
    })

    const [notifications, setNotifications] = useState(true)
    const [message, setMessage] = useState("")
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((previous) => ({
            ...previous,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage("Settings saved successfully!")
    }


    return (
        <DashboardLayout>
            <div className="mx-auto max-w-4xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Settings
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage your profile and preferences
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <section className="rounded-2xl border border border-slate-200 bg-whit p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                                <UserRound size={20} />

                            </div>
                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Profile
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Update your personal information
                                </p>
                                
                            </div>
                        </div>
                        <div className="grip gap-4 sm:grid-col-2">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Full Name
                                </label>
                                <input id="name"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500
                                        focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Email address
                                </label>
                                <input id="email"
                                    name="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500
                                        focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                                <Bell size={20} />

                            </div>
                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Notification
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Choose whether to receive task reminders.
                                </p>
                            </div>
                            <label className="flex cursor-pointer items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-800">
                                        Task reminders
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        Enable reminders for your tasks.
                                    </p>
                                </div>
                                <input type="checkbox"
                                    checked={notifications}
                                    onChange={(e) => setNotifications(e.target.checked)}
                                    className="h-5 w-5 accent-indigo-600"
                                />
                            </label>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                                <LockKeyhole size={20} />
                            </div>
                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Security
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Password management can be connected here later.
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600">
                            Your account passsword is manage by the TaskFlow backend.
                            Password change are not connected yet

                        </p>
                    </section>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        {message && (
                            <p className="text-sm text-emerald-600" role="status">
                                {message}
                            </p>
                        )
                        }
                        <button type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold
                                text-white transition hover:bg-indigo-700"
                        >
                            <Save size={17} />
                            Save preferences
                        </button>

                    </div>

                </form>

            </div>
        </DashboardLayout>
    )
}

export default Settings
