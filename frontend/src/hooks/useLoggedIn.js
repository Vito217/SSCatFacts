import { useState, useEffect } from "react";

const useLoggedIn = () => {

    const [userData, setUserData] = useState("");

    useEffect(() => {
        fetch('/api/checkuserlogin')
            .then(response => response.json())
            .then((data) => {setUserData(data)});
    }, []);

    return [userData];
};

export default useLoggedIn;