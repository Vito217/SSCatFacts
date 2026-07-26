import { useState, useEffect } from "react";
import Fact from "./Fact";

function Popular()
{
  const [popularFacts, setPopularFacts] = useState({});

  useEffect(()=>{
    fetch("/api/get_popular_facts")
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setPopularFacts(data);
      });
  }, []);

  const list = popularFacts && "facts" in popularFacts && popularFacts.facts.map((e, index) => {

    const factKey = e.fact_key;
    const factText = e.fact_text;

    return (
      <li key={factKey}>
        <Fact factKey={factKey} factText={factText}/>
      </li>
    );
  }
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
    <div className="p-8">
      <ul>
        {list}
      </ul>
    </div>
  );
}

export default Popular;