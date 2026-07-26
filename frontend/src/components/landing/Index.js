import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Header from "./Header";

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
      <Header />
      <Outlet />
    </div>
  )
}

export default Index;