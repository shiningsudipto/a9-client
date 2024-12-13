import { FormikValues } from "formik";
import FormikForm from "../../components/formik/FormikForm";
import FormikInput from "../../components/formik/FormikInput";
import { useGetUserByIdQuery } from "../../redux/features/auth";
import {
  useMatchCouponMutation,
  useCreateOrderMutation,
} from "../../redux/features/coupon";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import { useCartOptions } from "../../redux/slices/cart";
import { toast } from "sonner";
import { TErrorResponse, TResponse } from "../../types";
import CustomButton from "../../components/ui/CustomButton";
import { useState } from "react";

const Checkout = () => {
  const { products, totalCost, vendorId } = useAppSelector(useCartOptions);
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data } = useGetUserByIdQuery(user?.id);
  const [matchCouponFunc] = useMatchCouponMutation();
  const [createOrderFunc, { error }] = useCreateOrderMutation();

  console.log(error);
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

  const handleCreateOrder = async (values: FormikValues) => {
    const toastId = toast.loading("Order creating please wait!");
    const items = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      price: product.price,
    }));
    const data = {
      ...values,
      shopId: vendorId,
      userId: user.id,
      total: discount > 0 ? discountedPrice : totalPrice,
      items,
    };
    console.log({ data });
    try {
      const res = (await createOrderFunc(data).unwrap()) as TResponse;
      console.log({ res });
      if (res?.success === true && res.data?.paymentResponse?.payment_url) {
        window.location.href = res.data?.paymentResponse?.payment_url;
      } else {
        toast.error("Payment URL not found", { id: toastId });
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="section-gap-xy bg-gray-50 p-6">
      {/* User Information */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
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
        <div className="mt-10">
          <p className="font-bold text-xl mb-5">Basic Information:</p>
          <FormikForm
            initialValues={{ phone: "", address: userDetails?.address }}
            onSubmit={handleCreateOrder}
          >
            <div className="grid grid-cols-2 gap-10">
              <FormikInput name="phone" label="Phone" required />
              <FormikInput name="address" label="Address" required />
            </div>
            <CustomButton type="submit" label="Checkout" />
          </FormikForm>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
