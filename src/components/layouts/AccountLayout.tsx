import {
  Drawer,
  Button,
  Typography,
  IconButton,
  ListItem,
} from "@material-tailwind/react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
import CustomNavbar from "../shared/CustomNavbar";
import { Outlet } from "react-router-dom";
const AccountLayout = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const menuLinks = [
    {
      path: "account",
      name: "Account",
    },
    {
      path: "shop",
      name: "Shop",
    },
    {
      path: "/products",
      name: "Products",
    },
  ];

  return (
    <div className="">
      <CustomNavbar />
      <div className="flex">
        {/* drawer */}
        <Button onClick={openDrawer} className="lg:hidden block">
          <FiMenu />
        </Button>
        <Drawer
          open={open}
          onClose={closeDrawer}
          overlay={false}
          className="p-4"
        >
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Material Tailwind
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <RxCross2 />
            </IconButton>
          </div>
        </Drawer>
        <div className="w-[250px] h-screen bg-secondary-500 p-5">
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
        </div>
        <div className="w-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
