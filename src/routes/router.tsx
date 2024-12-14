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
import Reviews from "../pages/vendor/reviews/Reviews";
import FlashSale from "../pages/flashSale/FlashSale";
import Details from "../pages/details/Details";
import ShopDetails from "../pages/shopDetails/ShopDetails";
import Products from "../pages/Products/Products";
import RecentProducts from "../pages/recent-products/RecentProducts";
import Comparison from "../pages/comparison/Comparison";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Checkout from "../pages/checkout/Checkout";
import PrivateRoute from "./PrivateRoute";
import UserOrders from "../pages/user/orders/UserOrders";
import UserReviews from "../pages/user/reviews/UserReviews";
import OrderHistory from "../pages/admin/orders/OrderHistory";
import Coupon from "../pages/vendor/coupon/Coupon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "flash-sale",
        element: <FlashSale />,
      },
      {
        path: "product-details/:id",
        element: <Details />,
      },
      {
        path: "shop-details/:id",
        element: <ShopDetails />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "comparison",
        element: <Comparison />,
      },
      {
        path: "recent-products",
        element: <RecentProducts />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "vendor",
    element: (
      <PrivateRoute>
        <AccountLayout />
      </PrivateRoute>
    ),
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
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "coupon",
        element: <Coupon />,
      },
    ],
  },
  {
    path: "user",
    element: <AccountLayout />,
    children: [
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "orders",
        element: <UserOrders />,
      },
      {
        path: "reviews",
        element: <UserReviews />,
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
        path: "order-history",
        element: <OrderHistory />,
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
  {
    path: "forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <p>Page not found!</p>,
  },
]);

export default router;
