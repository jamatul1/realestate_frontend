import { Outlet } from "react-router-dom";
import { useUser } from "../contexts/user/userContext";
import SignIn from "../pages/signin/signIn";

export default function LoggedInRoutes() {
  const { user } = useUser();
  return user ? <Outlet /> : <SignIn />;
}
