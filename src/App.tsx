import { Outlet } from "react-router-dom";
import CustomNavbar from "./components/shared/CustomNavbar";
import CustomDrawer from "./components/ui/CustomDrawer";
import Footer from "./components/shared/Footer";

const App = () => {
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
