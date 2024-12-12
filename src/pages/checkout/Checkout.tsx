import { FormikValues } from "formik";
import FormikForm from "../../components/formik/FormikForm";
import FormikInput from "../../components/formik/FormikInput";
import { useGetUserByIdQuery } from "../../redux/features/auth";
import { useMatchCouponMutation } from "../../redux/features/coupon";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import { useCartOptions } from "../../redux/slices/cart";
import { toast } from "sonner";
import { TErrorResponse, TResponse } from "../../types";
import CustomButton from "../../components/ui/CustomButton";
import { useState } from "react";

const Checkout = () => {
  const { products, totalCost } = useAppSelector(useCartOptions);
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data } = useGetUserByIdQuery(user?.id);
  const [matchCouponFunc] = useMatchCouponMutation();
  const [discount, setDiscount] = useState(0);

  const userDetails = data?.data || {};

  const handleCouponMatching = async (values: FormikValues) => {
    const toastId = toast.loading("Reply updating please wait!");
    try {
      const res = (await matchCouponFunc(values).unwrap()) as TResponse;
      setDiscount(res.data.discount);
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log(error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  const discountedPrice = ((totalCost * discount) / 100).toFixed(2);
  const totalPrice = totalCost.toFixed(2);

  return (
    <div className="section-gap-xy bg-gray-50 p-6">
      {/* User Information */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Checkout Page
        </h2>
        <div className="flex items-center gap-4 mb-6">
          <img
            src={userDetails.avatar}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <p className="font-semibold text-lg">{userDetails.name}</p>
            <p className="text-gray-500">{userDetails.email}</p>
            <p className="text-gray-500">{userDetails.address}</p>
          </div>
        </div>

        {/* Cart Items */}
        <h3 className="text-xl font-semibold mb-3 text-gray-700">
          Your Cart ({products.length} items)
        </h3>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-gray-500">
                    Price: ${product.price} | Qty: {product.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium text-gray-900">
                ${product.price * product.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <p>Have coupon?</p>
            {discount > 0 ? (
              <p>Coupon applied successfully!</p>
            ) : (
              <FormikForm
                initialValues={{ code: "" }}
                onSubmit={handleCouponMatching}
              >
                <div className="flex flex-row items-center">
                  <FormikInput name="code" label="Coupon code" />
                  <CustomButton type="submit" label="Apply" />
                </div>
              </FormikForm>
            )}
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <p>Total Cost</p>
            <p> {discount > 0 ? discountedPrice : totalPrice} </p>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="text-right mt-6">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
