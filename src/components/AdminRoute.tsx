import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

const AdminRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const isAdmin = userInfo?.role === "ADMIN" ? true : false;
  return userInfo && isAdmin ? <Outlet /> : <Navigate to="/login"></Navigate>;
};

export default AdminRoute;
