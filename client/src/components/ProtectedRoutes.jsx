import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = () => {
  //Check if user exist
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
