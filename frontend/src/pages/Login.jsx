import { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordInput from '../components/common/PasswordInput';
import { checkCircle2 } from 'lucide-react';

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

            <section>
                
            </section>

        </main>
    )

    
}