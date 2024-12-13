import { Form, Formik, FormikValues } from "formik";
import { useGetOrderByUserIdQuery } from "../../../redux/features/order";
import { useAppSelector } from "../../../redux/hooks";
import { TUser, useCurrentUser } from "../../../redux/slices/auth";
import { TUserReview } from "../../../types/order.type";
import { Rating } from "@material-tailwind/react";
import FormikInput from "../../../components/formik/FormikInput";
import CustomButton from "../../../components/ui/CustomButton";
import { useCreateReviewMutation } from "../../../redux/features/review";
import { toast } from "sonner";
import { TErrorResponse, TResponse } from "../../../types";

const UserReviews = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data } = useGetOrderByUserIdQuery(user?.id);
  const [createReviewFunc] = useCreateReviewMutation();

  const handleCreateReview = async (values: FormikValues) => {
    const toastId = toast.loading("Review creating please wait!");
    try {
      const res = (await createReviewFunc(values).unwrap()) as TResponse;
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };
  return (
    <div className="m-10 rounded-md">
      <div className="grid grid-cols-1 gap-10">
        {data?.data?.map((item: TUserReview) => {
          return (
            <div key={item?.id} className="grid grid-cols-1 gap-10">
              {item?.items?.map((productItem) => {
                return (
                  <div
                    key={productItem?.id}
                    className="grid grid-cols-2 gap-10 bg-white rounded-md p-5"
                  >
                    <div className="border-r">
                      <img
                        src={productItem?.product?.images[0]}
                        alt=""
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">
                        {productItem?.product?.name}
                      </h3>
                      <p>Category: {productItem?.product?.category}</p>
                      <p>Price: {productItem?.product?.price} taka</p>
                      <p>
                        Review:{" "}
                        {productItem?.reviewed === true
                          ? "Reviewed"
                          : "Review now"}
                      </p>
                      {productItem?.reviewed === false && (
                        <div>
                          <Formik
                            initialValues={{
                              comment: "",
                              rating: 4,
                              userId: user.id,
                              productId: productItem?.product?.id,
                              orderId: productItem?.id,
                            }}
                            onSubmit={handleCreateReview}
                          >
                            {({ setFieldValue }) => {
                              return (
                                <Form className="space-y-5 mt-5">
                                  <Rating
                                    value={4}
                                    onChange={(e) => setFieldValue("rating", e)}
                                  />
                                  <FormikInput
                                    name="comment"
                                    label="Comment"
                                    required
                                  />
                                  <CustomButton type="submit" label="Submit" />
                                </Form>
                              );
                            }}
                          </Formik>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserReviews;
