import { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import {
  // ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUser, TUser, useCurrentUser } from "../../redux/slices/auth";
import { removeFromLocalstorage } from "../../utils/localstorage.utils";

const CustomNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const user = useAppSelector(useCurrentUser) as TUser;
  const dispatch = useAppDispatch();

  const menuLinks = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/products",
      name: "Products",
    },
    {
      path: "/flash-sale",
      name: "Flash Sale",
    },
    {
      path: `/${user?.role}/account`,
      name: "Account",
      secure: true,
    },
    {
      path: `recent-products`,
      name: "Recent Products",
    },
    {
      path: `comparison`,
      name: "Comparison",
    },
  ];

  function NavList() {
    return (
      <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
        {menuLinks
          ?.filter((item) => !(item.secure && !user))
          .map((item, index) => {
            return (
              <ListItem
                key={index}
                className="flex items-center gap-2 py-2 pr-4 text-white w-auto"
              >
                <Link to={item.path}>{item.name}</Link>
              </ListItem>
            );
          })}
      </List>
    );
  }

  const handleLogout = () => {
    dispatch(setUser({ user: null, token: null }));
    removeFromLocalstorage("recentProducts");
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  return (
    <Navbar
      id="navbar"
      className="max-w-full px-4 py-1 bg-primary text-white rounded-none shadow-none border-none z-0 "
    >
      <div className="flex items-center justify-between text-white z-0">
        <Link to="/" className="text-xl font-semibold">
          Electro Hub
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex items-center">
          {user ? (
            <Button
              onClick={handleLogout}
              variant="outlined"
              color="white"
              size="sm"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outlined" color="white" size="sm">
                Log In
              </Button>
            </Link>
          )}
          {/* <div className="z-[9999]">
            <CustomDrawer />
          </div> */}
        </div>
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" fullWidth>
            Log In
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
