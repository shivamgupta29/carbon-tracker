import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex w-[900px] rounded-xl shadow-lg overflow-hidden bg-gray-800">
        {/* Left Side Image */}
        <div
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('/your-image-path.webp')` }}
        ></div>

        {/* Right Side Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="mb-6 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-400">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
