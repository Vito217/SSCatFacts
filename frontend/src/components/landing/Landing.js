import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Landing()
{
    const { userData } = useContext(AuthContext);

    if (userData == null)
    {
        return (
            <div></div>
        );
    }

    if (userData.logged_in)
    {
        return (
            <Navigate to="/index"></Navigate>
        );
    }

    return (
        <Navigate to="/login"></Navigate>
    );
}

export default Landing;