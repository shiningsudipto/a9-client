import { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearCart,
  removeProduct,
  useCartOptions,
} from "../../redux/slices/cart";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";
import CustomButton from "./CustomButton";
import { MdOutlineCancel } from "react-icons/md";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
const CustomDrawer = () => {
  const { products, totalCost } = useAppSelector(useCartOptions);
  const user = useAppSelector(useCurrentUser) as TUser;
  const dispatch = useAppDispatch();
  const [openRight, setOpenRight] = useState(false);
  const navigate = useNavigate();

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  const handleCheckout = async () => {
    navigate("/checkout");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={openDrawerRight}
          className="text-white text-2xl bg-transparent shadow-none hover:shadow-none"
        >
          <HiOutlineShoppingCart className="text-xl" />
        </Button>
      </div>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 w-[400px]"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Cart
          </Typography>
          <IconButton
            className="p-1"
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
            <IoClose className="text-xl" />
          </IconButton>
        </div>
        <div className="space-y-4">
          {products?.map((item) => {
            const titleLength = item?.name?.length;
            return (
              <div key={item?.id} className="flex gap-2">
                <img src={item?.image} alt="" className="size-12 rounded-md" />
                <div className="flex items-center justify-between w-full">
                  <Link
                    to={`product-details/${item.id}`}
                    className="font-bold text-lg"
                  >
                    {titleLength > 15
                      ? `${item?.name.slice(0, 15)}...`
                      : item?.name}
                  </Link>
                  <div className="flex items-center gap-x-2">
                    <button>
                      <FiPlusCircle />
                    </button>
                    {item?.quantity}{" "}
                    <button>
                      <FiMinusCircle />
                    </button>{" "}
                  </div>
                  <p>{item.price}</p>
                  <button onClick={() => dispatch(removeProduct(item?.id))}>
                    <MdOutlineCancel />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 space-y-5">
          <p className="text-xl flex gap-3">
            Total Price:{" "}
            <span className="font-bold flex items-center">
              {totalCost}
              <TbCurrencyTaka />{" "}
            </span>
          </p>
          <CustomButton
            disabled={!user}
            label="Checkout"
            variant="filled"
            onclick={handleCheckout}
          />
          <CustomButton
            label="Clear all"
            variant="outlined"
            onclick={() => dispatch(clearCart())}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default CustomDrawer;
