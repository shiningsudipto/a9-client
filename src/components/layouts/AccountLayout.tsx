import {
  Drawer,
  Typography,
  IconButton,
  ListItem,
} from "@material-tailwind/react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import { userRole } from "../../utils/constants.utils";

const adminRoutes = [
  {
    path: "account",
    name: "Account",
  },
  {
    path: "category",
    name: "Category",
  },
  {
    path: "users",
    name: "Users",
  },
  {
    path: "shop",
    name: "Shop",
  },
  {
    path: "order-history",
    name: "Order History",
  },
  {
    path: "/",
    name: "Home",
  },
];

const vendorRoutes = [
  {
    path: "account",
    name: "Account",
  },
  {
    path: "shop",
    name: "Shop",
  },
  {
    path: "orders",
    name: "Orders",
  },
  {
    path: "reviews",
    name: "Reviews",
  },
  {
    path: "coupon",
    name: "Coupon",
  },
  {
    path: "/",
    name: "Home",
  },
];

const userRoutes = [
  {
    path: "account",
    name: "Account",
  },
  {
    path: "orders",
    name: "Order History",
  },
  {
    path: "reviews",
    name: "Reviews",
  },
  {
    path: "/",
    name: "Home",
  },
];

const AccountLayout = () => {
  const [open, setOpen] = useState(false);
  const user = useAppSelector(useCurrentUser) as TUser;
  let sidebarItems;

  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = adminRoutes;
      break;
    case userRole.VENDOR:
      sidebarItems = vendorRoutes;
      break;
    case userRole.USER:
      sidebarItems = userRoutes;
      break;

    default:
      break;
  }

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div className="">
      <div className="flex fixed top-0 w-full">
        {/* drawer */}
        <button
          onClick={openDrawer}
          className="lg:hidden w-10 h-10 flex justify-center"
        >
          <FiMenu className="mt-5" />
        </button>
        <Drawer
          open={open}
          onClose={closeDrawer}
          overlay={false}
          className="p-4"
        >
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Dashboard Menu
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <RxCross2 />
            </IconButton>
          </div>
          <div>
            {sidebarItems?.map((item) => {
              return (
                <Link to={item.path}>
                  <ListItem className="flex items-center gap-2 py-2 pr-4 text-black">
                    {item.name}
                  </ListItem>
                </Link>
              );
            })}
          </div>
        </Drawer>
        <div className="lg:block hidden w-[250px] h-screen bg-secondary-500 p-5">
          {sidebarItems?.map((item) => {
            return (
              <Link to={item.path}>
                <ListItem className="flex items-center gap-2 py-2 pr-4 text-white">
                  {item.name}
                </ListItem>
              </Link>
            );
          })}
        </div>
        <div className="w-full bg-gray-400 max-h-screen overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
