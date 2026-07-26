import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Fact from "./Fact";

function Likes()
{
  const { userData } = useContext(AuthContext);

  const list = userData && "likes" in userData && userData.likes.map((e, index) => {

    const factKey = e.fact.fact_key;
    const factText = e.fact.fact_text;

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

export default Likes;