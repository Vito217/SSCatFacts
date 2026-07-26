import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Logout(props)
{
  const { userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogOut(e)
  {
    e.preventDefault()
    fetch("/api/logout", {method: "DELETE"})
      .then(() =>{
        setUserData(null);
        navigate("/login")
      });
  }

  if (userData == null)
  {
    return <div></div>
  }

  if (!userData.logged_in)
  {
    return <div></div>
  }

  return (
    <div className="container mx-auto px-1 py-1 flex justify-between items-center">
      <div className="px-2">
        <h1>
                    Welcome {userData.user.username}
        </h1>
      </div>
      <div className="px-2">
        <button 
          className="
                        bg-blue-500 hover:bg-blue-700 
                        text-white font-bold py-2 px-4 
                        rounded focus:outline-none focus:shadow-outline" 
          label="Logout"
          onClick={handleLogOut}>
                        Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;