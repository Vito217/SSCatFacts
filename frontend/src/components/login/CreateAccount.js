import { useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    username: yup
        .string()
        .min(4, 'Username must be at least 4 characters.')
        .required('Username is required.'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters.')
        .required('Password is required.'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match.')
        .required('Please confirm your password.')
    });

function CreateAccount()
{
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = (data) => {
        console.log(data);
        fetch("/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((r) => r.json())
        .then(
            (r) => { 
                console.log(r);
                if ('error' in r)
                {
                    alert(r.error);
                }
                else
                {
                    setUserData(r);
                    navigate("/login");
                    alert('Created new user');
                }
            }
        );
    };

    if (userData && userData.logged_in)
    {
        return <Navigate to="/index"></Navigate>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form  className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full max-w-sm min-w-[200px]">
                    <label>
                        Username:
                    </label>
                    <input
                        className="
                            w-full bg-white placeholder:text-slate-400 
                            text-slate-700 text-sm border 
                            border-slate-200 rounded-md px-3 
                            py-2 transition 
                            duration-300 ease 
                            focus:outline-none 
                            focus:border-slate-400 
                            hover:border-slate-300 
                            shadow-sm focus:shadow" 
                            placeholder="username"
                        type="text"
                        { ...register("username") }
                    />
                    <p>{errors.username?.message}</p>
                </div>
                <br></br>
                <div className="w-full max-w-sm min-w-[200px]">
                    <label>
                        Password:
                    </label>
                    <input 
                        className="
                            w-full bg-white placeholder:text-slate-400 
                            text-slate-700 text-sm border 
                            border-slate-200 rounded-md px-3 
                            py-2 transition 
                            duration-300 ease 
                            focus:outline-none 
                            focus:border-slate-400 
                            hover:border-slate-300 
                            shadow-sm focus:shadow" 
                            placeholder="password"
                        type="password"
                        { ...register("password") }
                    />
                    <p>{errors.password?.message}</p>
                </div>
                <br></br>
                <div className="w-full max-w-sm min-w-[200px]">
                    <label>
                        Confirm Password:
                    </label>
                    <input 
                        className="
                            w-full bg-white placeholder:text-slate-400 
                            text-slate-700 text-sm border 
                            border-slate-200 rounded-md px-3 
                            py-2 transition 
                            duration-300 ease 
                            focus:outline-none 
                            focus:border-slate-400 
                            hover:border-slate-300 
                            shadow-sm focus:shadow" 
                            placeholder="confirm password"
                        type="password"
                        { ...register("confirmPassword") }
                    />
                    <p>{errors.confirmPassword?.message}</p>
                </div>
                <br></br>
                <div className="p-5 flex justify-center items-center">
                    <button 
                        type="submit"
                        className="
                            bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-2 px-4 
                            rounded focus:outline-none focus:shadow-outline">
                        Create Account
                    </button>
                </div>
                <div className="p-5 flex justify-center items-center">
                    <Link to="/login">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default CreateAccount;