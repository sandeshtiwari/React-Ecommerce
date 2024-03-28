import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

const PrivateUserRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateUserRoute;
