import { Link } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const firstName = user.name ? user.name.split(" ")[0] : "Guest";
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-700 shadow-sm">
      <Link to="/" className="text-2xl font-bold text-purple-400">
        Carbon Tracker
      </Link>
      <nav className="flex items-center gap-4">
        {user && (
          <>
            <Link to="/profile" className="text-gray-300 hover:text-white">
              Hello
              {` ${firstName}`}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
