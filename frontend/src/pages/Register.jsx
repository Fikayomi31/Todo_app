import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../components/common/PasswordInput';
import useAuthStore from '../store/authStore';


function Register() {

    const navigate = useNavigate();
    const { register, loading, error, clearError } = useAuthStore();
    const [formData, setFormData] = useState({username: '', email: '', password: '', confirmPassword: ''});

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        clearError()


        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    }
    const handleSubmit = async (e) => {

        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return
        }
        const result = await register(
            formData.username,
            formData.email,
            formData.password
        )

        if (result.success) {
            navigate('/dashboard', {
                replace: true,
                state: {
                    message: "Registration successful! ",
                }
            });
        }
        
    }

    return (
        <main className="flex min-h screen bg-slate-50">
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
                        Turn your plans.
                        <br />
                        into progress.
                    </h1>
                    <p className="mt-5 text-lg leading-8 text-blue-100">
                        Create an account and start organizing your tasks with a simple, focused workspace.
                    </p>
                </div>
            </section>

            {/* Register form */}
            <section className="flex w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-[520px] lg:px-12">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                            T
                        </div>
                        <span className="text-xl font-bold text-slate-900">
                            TaskFlow
                        </span>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Create an Account
                        </h2>
                        <p className="mt-2 text-sm text-slate-700">
                            Start organizing your tasks with a simple, focused workspace.
                        </p>

                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none
                                    placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                                "
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                           
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none
                                    placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                                "
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <PasswordInput
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Create a password"
                                required
                            />
                        </div>
                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">
                                Confirm Password
                            </label>
                            <PasswordInput
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                            <p className="mt-2 text-sm text-red-600">
                                Passwords do not match.
                            </p>
                        )}

                        {/* Terms */}
                        <label className="flex items-start gap-3">
                            <input type="checkbox" required
                                className="mt-0.5h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-slate-600">
                                I agree to the TaskFlow terms and conditions.
                            </span>
                        </label>

                        {/* Submit */}
                        <button type="submit"
                            disabled={

                                loading ||
                                formData.password !== formData.confirmPassword
                            }
                            className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white
                                transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20
                            "
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </button>

                    </form>

                    {/* Login */}
                    <p className="mt-8 text-center text-sm text-slate-500">
                        Already have an account? {' '}
                        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                            Sign in
                        </Link>
                    </p>
                </div>

            </section>
               
        </main>
    )

}

export default Register;