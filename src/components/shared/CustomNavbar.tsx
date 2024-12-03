import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-black"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Blocks
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden rounded-xl lg:block">
          <MenuItem>React</MenuItem>
          <MenuItem>TailwindCSS</MenuItem>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>
          <MenuItem>React</MenuItem>
          <MenuItem>TailwindCSS</MenuItem>
        </Collapse>
      </div>
    </React.Fragment>
  );
}
function NavList() {
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="black"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Pages</ListItem>
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="black"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Account
        </ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="black"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Docs</ListItem>
      </Typography>
    </List>
  );
}

const CustomNavbar = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  return (
    <Navbar className="max-w-full px-4 py-1 bg-primary text-black rounded-none shadow-none border border-b-gray-400 ">
      <div className="flex items-center justify-between text-black">
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex items-center">
          <Link to="/login">
            <Button variant="outlined" color="black" size="sm">
              Log In
            </Button>
          </Link>
          <Button className="text-black text-2xl bg-transparent shadow-none hover:shadow-none">
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
