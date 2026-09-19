import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function PasswordInput({ value, onChange, placeholder="Enter password", name="password", id="password", required=True }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                id={id}
                required={required}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm text-slate-900
                    outline-none transition placeholder:text-slate-400
                    focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                "
            />
            <button type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 
                    text-slate-400 hover:bg-slate-100 hover:text-slate-500
                "
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}

            </button>
        </div>
    )

}

export default PasswordInput;
