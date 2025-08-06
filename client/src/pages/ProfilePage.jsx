import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
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

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>Could not load user profile.</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-8 text-purple-400">
          Your Profile
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <p className="text-lg">
          <span className="font-semibold text-gray-400">Name:</span> {user.name}
        </p>
        <p className="text-lg mt-4">
          <span className="font-semibold text-gray-400">Email:</span>{" "}
          {user.email}
        </p>
      </div>
    </>
  );
};

export default ProfilePage;
