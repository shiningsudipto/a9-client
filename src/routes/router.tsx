import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/Login";
import Registration from "../pages/auth/Registration";
import Home from "../pages/home/Home";
import AccountLayout from "../components/layouts/AccountLayout";
import Shop from "../pages/shop/Shop";
import Account from "../pages/account/Account";
import Orders from "../pages/vendor/orders/Orders";
import Category from "../pages/admin/category/Category";
import User from "../pages/admin/user/User";
import ShopManagement from "../pages/admin/shop/ShopManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "vendor",
    element: <AccountLayout />,
    children: [
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "admin",
    element: <AccountLayout />,
    children: [
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "shop",
        element: <ShopManagement />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);

export default router;
