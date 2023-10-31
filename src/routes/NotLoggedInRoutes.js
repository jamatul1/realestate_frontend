import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/user/userContext";

export default function NotLoggedInRoutes() {
  const { user } = useUser();

  return user ? <Navigate to="/" /> : <Outlet />;
}
