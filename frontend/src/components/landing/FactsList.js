import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";

function FactsList()
{
    const [facts, setFacts] = useState({});
    const [likes, setLikes] = useState({});
    const { userData, setUserData } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState('https://catfact.ninja/facts?page=1');

    // each time currentPage updates, we get the new fact list
    useEffect(()=>{
        fetch(currentPage)
        .then(response => response.json())
        .then((data) => {
            setFacts(data);
        });
    }, [currentPage]);

    // use this to update current page
    function handlePageClick(e){
        e.preventDefault();
        if (e.target.value)
        {
            setCurrentPage(e.target.value);
        }
    }

    // send or remove a like from database
    function handleCheckboxChange(e)
    {
        const dataKey = e.target.getAttribute('data-key');
        const check = e.target.checked;
        
        const dataKeyArray = dataKey.split("-");
        const index = dataKeyArray[1];

        const text = facts.data[index].fact;

        const postData = {
            fact_key: dataKey,
            fact_text: text,
            checked: check
        }

        fetch("/api/register_like", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            })
            .then((r) => r.json())
            .then(
                (data) => {
                    //console.log(data);
                    if ('message' in data)
                    {
                    }
                    else
                    {
                        setUserData(data);
                    }
                }
        );
    }
    
    const likedKeys = userData.likes.map((like) => {
        return like.fact.fact_key;
    });

    const list = facts && 'data' in facts && facts.data.map((e, index) => {

        const factKey = facts.current_page + "-" + index.toString();
        const factText = e.fact;

        return (
            <li key={factKey} className="flex justify-between gap-x-6 py-5">
                <div className="max-w-sm w-full lg:max-w-full lg:flex shadow-lg">
                    <div className="max-w-sm w-full lg:max-w-full flex-auto">
                        {factText}
                    </div>
                    <div className="min-w-0 flex-auto">
                        <input 
                            type="checkbox" 
                            data-key={factKey}
                            className="
                                peer h-5 w-5 cursor-pointer 
                                transition-all appearance-none 
                                rounded shadow hover:shadow-md border 
                                border-slate-300 checked:bg-blue-600 
                                checked:border-blue-600"
                            onChange={handleCheckboxChange}
                            checked={likedKeys.includes(factKey) ? 'checked': ''}/>
                    </div>
                </div>
            </li>
        );
    }
    );

    const pageButtons = facts && 'links' in facts && facts.links.map((e, index) =>
        <button 
            key={index}
            value={e.url} 
            onClick={handlePageClick}
            className="
                bg-transparent 
                hover:bg-blue-500 
                text-blue-700 
                font-semibold 
                hover:text-white 
                py-2 px-4 border 
                border-blue-500 
                hover:border-transparent rounded">
                {e.label}
        </button>
    );

    return (
        <div>
            <div className="p-8">
                <ul>
                    {list}
                </ul>
            </div>

            <div className="p-5 flex justify-center items-center">
                {pageButtons}
            </div>
        </div>
    );
}

export default FactsList;