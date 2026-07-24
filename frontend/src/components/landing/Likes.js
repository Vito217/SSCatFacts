import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Likes()
{
    const { userData, setUserData } = useContext(AuthContext);

    const list = userData && 'likes' in userData && userData.likes.map((e, index) => {

        const factKey = e.fact.fact_key;
        const factText = e.fact.fact_text;

        return (
            <li key={factKey} className="flex justify-between gap-x-6 py-5">
                <div className="max-w-sm w-full lg:max-w-full lg:flex shadow-lg">
                    <div className="max-w-sm w-full lg:max-w-full flex-auto">
                        {factText}
                    </div>
                </div>
            </li>
        );
    }
    );

    return (
        <div>
            <div className="p-8">
                <ul>
                    {list}
                </ul>
            </div>
        </div>
    );
}

export default Likes;