import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-700 shadow-sm">
      <Link to="/" className="text-2xl font-bold text-purple-400">
        Carbon Tracker
      </Link>
      <nav className="flex items-center gap-4">
        {user && (
          <>
            <Link to="/profile" className="text-gray-300 hover:text-white">
              {user.name}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
