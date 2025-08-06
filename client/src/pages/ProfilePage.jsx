import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/api";

const ProfilePage = () => {
  // Using the state names from your code
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Using the data fetching logic from your code
    const fetchProfile = async () => {
      try {
        const { data } = await getUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        // If the token is invalid or expired, log the user out
        handleLogout();
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getInitials = (name = "") => {
    const nameParts = name.split(" ");
    if (nameParts.length > 1 && nameParts[1]) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col lg:flex-row">
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
            {/* Avatar */}
            <div className="mx-auto w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mb-4 border-4 border-gray-700">
              <span className="text-3xl font-bold">
                {getInitials(user?.name)}
              </span>
            </div>

            {/* User Name */}
            <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>

            {/* User Email */}
            <p className="text-md text-gray-400 mb-8">{user?.email}</p>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-8 w-full bg-red-600/80 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
