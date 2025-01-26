import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Token decoding error: ", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
