import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Fact(props)
{
  const { userData, setUserData } = useContext(AuthContext);

  // send or remove a like from database
  function handleCheckboxChange(e)
  {
    const postData = {
      fact_key: e.target.getAttribute("data-key"),
      fact_text: e.target.getAttribute("data-text"),
      checked: e.target.checked
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
          if ("message" in data)
          {
          }
          else
          {
            setUserData(data);
          }
        }
      );
  }

  const likedKeys = userData.likes.map((like) => like.fact.fact_key);

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex shadow-lg">
      <div className="max-w-sm w-full lg:max-w-full flex-auto">
        {props.factText}
      </div>
      <div className="min-w-0 flex-auto">
        <input 
          type="checkbox" 
          data-text={props.factText}
          data-key={props.factKey}
          className="
                        peer h-5 w-5 cursor-pointer 
                        transition-all appearance-none 
                        rounded shadow hover:shadow-md border 
                        border-slate-300 checked:bg-blue-600 
                        checked:border-blue-600"
          onChange={handleCheckboxChange}
          checked={likedKeys.includes(props.factKey) ? "checked": ""}/>
      </div>
    </div>
  );
}

export default Fact;