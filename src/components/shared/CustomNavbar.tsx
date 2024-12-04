import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  // Menu,
  // MenuHandler,
  // MenuList,
  // MenuItem,
} from "@material-tailwind/react";
import {
  // ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUser, useCurrentUser } from "../../redux/slices/auth";

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
    path: "/vendor/account",
    name: "Account",
  },
];

function NavList() {
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
      {menuLinks?.map((item, index) => {
        return (
          <Typography
            key={index}
            as="a"
            href={item.path}
            variant="paragraph"
            color="white"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              {item.name}
            </ListItem>
          </Typography>
        );
      })}
    </List>
  );
}

const CustomNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setUser({ user: null, token: null }));
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  return (
    <Navbar className="max-w-full px-4 py-1 bg-primary text-white rounded-none shadow-none border-none">
      <div className="flex items-center justify-between text-white">
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
          <Button className="text-white text-2xl bg-transparent shadow-none hover:shadow-none">
            <HiOutlineShoppingCart />
          </Button>
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
