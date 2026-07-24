import { useContext } from "react";
import { Navigate, Link, Outlet } from "react-router-dom";
import Logout from "../login/Logout";
import { AuthContext } from "../../context/authContext";

function Index()
{
    const { userData } = useContext(AuthContext);

    if (userData == null)
    {
        return <Navigate to="/login"></Navigate>;
    }

    if (userData && !userData.logged_in)
    {
        return <Navigate to="/login"></Navigate>;
    }

    return (
        <div className="index-div">
            <header className="bg-blue-600 shadow-md">
                <div className="container mx-auto px-4 py-4
                    flex justify-between items-center">
                    <div className="text-xl font-bold text-white">
                        <Logout/>
                    </div>
                    <div className="flex items-center">
                        <nav className="px-5">
                            <div className="text-white font-bold">
                                <Link to="/index/facts">Facts</Link>
                            </div>
                        </nav>
                        <nav className="px-5">
                            <div className="text-white font-bold">
                                <Link to="/index/likes">Likes</Link>
                            </div>
                        </nav>
                        <nav className="px-5">
                            <div className="text-white font-bold">
                                <Link to="/index/popular">Popular</Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <Outlet />
        </div>
    )
}

export default Index;