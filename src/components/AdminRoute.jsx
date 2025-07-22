import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const user = useSelector(state => state.user.currentUser);

  return user?.role === "ADMIN" ? <Outlet /> : <Navigate to="/list" replace />;
};

export default AdminRoute;
