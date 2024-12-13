import { Outlet } from "react-router-dom";
import CustomNavbar from "./components/shared/CustomNavbar";
import { useAppSelector } from "./redux/hooks";
import { useCurrentUser } from "./redux/slices/auth";
import CustomDrawer from "./components/ui/CustomDrawer";
import Footer from "./components/shared/Footer";

const App = () => {
  const user = useAppSelector(useCurrentUser);
  console.log({ user });
  return (
    <div className="">
      <CustomNavbar />
      <Outlet />
      <div className="fixed top-[100px] right-0 bg-primary">
        <CustomDrawer />
      </div>
      <Footer />
    </div>
  );
};

export default App;
