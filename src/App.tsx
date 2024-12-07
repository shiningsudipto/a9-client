import { Outlet } from "react-router-dom";
import CustomNavbar from "./components/shared/CustomNavbar";
import { useAppSelector } from "./redux/hooks";
import { useCurrentUser } from "./redux/slices/auth";

const App = () => {
  const user = useAppSelector(useCurrentUser);
  console.log({ user });
  return (
    <div>
      <CustomNavbar />
      <Outlet />
    </div>
  );
};

export default App;
