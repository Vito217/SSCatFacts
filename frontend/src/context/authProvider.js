import { useEffect, useState } from "react"
import { AuthContext } from "./authContext";

function AuthProvider({children}){

  const [ userData, setUserData ] = useState(null);

  useEffect(() => {
    fetch("/api/checkuserlogin")
      .then(response => response.json())
      .then((data) => {
        setUserData(data);
        console.log(data);
      });
  }, []);

  return (
    <AuthContext.Provider value={{userData, setUserData}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;