import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  logout,
  TUser,
  useCurrentToken,
  useCurrentUser,
} from "../redux/slices/auth";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const user = useAppSelector(useCurrentUser) as TUser;
  const isUserValid = pathname.toUpperCase() == user?.role;

  const token = useAppSelector(useCurrentToken);

  if (!token || !isUserValid) {
    toast.error("Please sign in", { duration: 2000 });
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default PrivateRoute;
