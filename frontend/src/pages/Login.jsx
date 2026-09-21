import { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordInput from '../components/common/PasswordInput';
import { CheckCircle2 } from 'lucide-react';

function Login() {

    const [formData, setFormData] = useState({username: '', password: ''});

    const [rememberMe, setRememberMe] = useState(false);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login data", formData)
    }

    return (
        <main className="flex min-h-screen bg-slate-50">
            {/* Left side */}

            <section className="hidden flex-1 items-center justify-center bg-blue-600 p-12 lg:flex">
                <div className="max-w-md text-white">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-blue-600">
                            T
                        </div>
                        <span className="text-2xl font-bold">
                            TaskFlow
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold leading-tight">
                        Organize your work.
                        <br />
                        Accomplish more.
                    </h1>
                    <p className="mt-5 text-lg leading-8 text-blue-100">
                        Keep your tasks organized, stay focused, and more progress every day with TaskFLow
                    </p>
                    <div className="mt-8 space-y-4">
                        {[
                            "Simple and intuitive task management",
                            "Track your progess effortlessly",
                            "Your tasks stay private and secure",
                        ].map((feature) =>(
                            <div key={feature} className="flex items-center gap-3">
                                <CheckCircle2 size={20} />
                                <span className="text-blue-50">
                                    {feature}
                                </span>
                            </div>    
                        ))}
                    </div>
                </div>
            </section>

            {/* Login form */}
            <section className="flex w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-[520px] lg:px-12">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="mb-10 flex items-center justify-center gap-2 lg:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                            T
                        </div>
                        <span className="text-xl font-bold text-slate-900">
                            TaskFlow
                        </span>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Welcom back
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Sign in to continue to your TaskFlow account
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label htmlFor='username' className="mb-2 block text-sm font-medium text-slate-700">
                                Username
                            </label>
                            <input id="username" name="username" type="text" value={formData.username}
                                onChange={handleChange} placeholder="Enter your username" required
                                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900
                                    outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                                "
                            />
                        </div>
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <lable htmlFor="password" className="text-sm font-medium text-slate-700">
                                    Password
                                </lable>
                                <button type="button"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    Forget Password

                                </button>
                            </div>
                            <PasswordInput
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Remember me */}
                        <label className="flex cursor-pointer items-center gap-3">
                            <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-slate-600">
                                Remember me
                            </span>
                        </label>

                        {/* Submit */}
                        <button type="submit"
                            className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white
                            transition hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                        >
                            Sign in
                        </button>
                    </form>

                    {/* Register */}
                    

                </div>

            </section>

        </main>
    )

    
}

export default Login