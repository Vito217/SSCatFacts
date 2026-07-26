import { useState, useEffect } from "react";
import Fact from "./Fact";

function FactsList()
{
  const [facts, setFacts] = useState({});
  const [currentPage, setCurrentPage] = useState("https://catfact.ninja/facts?page=1");

  // each time currentPage updates, we get the new fact list
  useEffect(()=>{
    fetch(currentPage)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
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

  const list = facts && "data" in facts && facts.data.map((e, index) => {

    const factKey = facts.current_page + "-" + index.toString();
    const factText = e.fact;

    return (
      <li key={factKey}>
        <Fact factKey={factKey} factText={factText}/>
      </li>
    );
  }
  );

  const pageButtons = facts && "links" in facts && facts.links.map((e, index) =>
    <button 
      key={index}
      value={e.url} 
      onClick={handlePageClick}
      className={ (facts.current_page == e.label ? "bg-blue-300 text-white " : "bg-transparent text-blue-700 ") +
                "hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" }>
      {e.label}
    </button>
  );

  if (list == [])
  {
    return (
      <div className="p-8">
        <h1>Loading Facts...</h1>
      </div>
    );
  }

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