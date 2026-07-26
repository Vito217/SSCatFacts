import { Link } from "react-router-dom";
import Logout from "../login/Logout";

function Header()
{
  return (
    <header className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white">
          <Logout/>
        </div>
        <div className="flex items-center">
          <nav className="px-5">
            <div className="text-white font-bold">
              <Link to="/index/facts">Facts</Link>
            </div>
          </nav>
          <nav className="px-5">
            <div className="text-white font-bold">
              <Link to="/index/likes">Likes</Link>
            </div>
          </nav>
          <nav className="px-5">
            <div className="text-white font-bold">
              <Link to="/index/popular">Popular</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;