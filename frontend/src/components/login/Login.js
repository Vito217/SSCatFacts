import { useState, useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Login()
{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { userData, setUserData } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()
        const formData = {
            username: username, 
            password: password
        }
        fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((r) => r.json())
            .then(
                (data) => {
                    console.log(data);
                    if ('error' in data)
                    {
                        alert(data.error);
                    }
                    else
                    {
                        setUserData(data);
                        navigate("/index");
                    }
                }
            );
        }

    if (userData && userData.logged_in)
    {
        return <Navigate to="/index"></Navigate>;
    }

     return (
        <div className="flex justify-center items-center h-screen">
            <form  className="form" onSubmit={handleSubmit}>
                <div className="w-full max-w-sm min-w-[200px]">
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
                        id="username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                <br></br>
                <div className="w-full max-w-sm min-w-[200px]">
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
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br></br>
                <div className="p-5 flex justify-center items-center">
                    <button 
                        type="submit"
                        className="
                            bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-2 px-4 
                            rounded focus:outline-none focus:shadow-outline">
                        Login
                    </button>
                </div>
                <div className="p-5 flex justify-center items-center">
                    <Link to="/register">
                        Create Account
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login;