import { FormikValues } from "formik";
import FormikForm from "../../../components/formik/FormikForm";
import {
  useGetReviewByVendorQuery,
  useUpdateReviewMutation,
} from "../../../redux/features/review";
import { useAppSelector } from "../../../redux/hooks";
import { TUser, useCurrentUser } from "../../../redux/slices/auth";
import { TResponse, TReview } from "../../../types";
import { FaStar } from "react-icons/fa";
import FormikInput from "../../../components/formik/FormikInput";
import CustomButton from "../../../components/ui/CustomButton";
import { toast } from "sonner";

const Reviews = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data, refetch } = useGetReviewByVendorQuery(user.id);
  const reviewsData = data?.data as TReview[];
  const [replyFunc] = useUpdateReviewMutation();
  const handleReviewReply = async (values: FormikValues) => {
    const toastId = toast.loading("Reply updating please wait!");
    try {
      const res = (await replyFunc(values).unwrap()) as TResponse;
      toast.success(res.message, { id: toastId, duration: 2000 });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="m-5 min-h-screen">
      {reviewsData?.length === 0 && (
        <h1 className="text-2xl font-bol ">No reviews yet</h1>
      )}
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
        {reviewsData?.map((item) => {
          return (
            <div key={item?.id} className="bg-white p-5 rounded-md">
              <p className="text-xl font-bold">{item?.product?.name}</p>
              <p className="flex items-center gap-2 font-semibold">
                Rating: {item?.rating}
                <span>
                  <FaStar className="text-yellow-500 text-lg" />
                </span>{" "}
              </p>
              <p>Comment: {item?.comment}</p>
              <p>Rated by: {item?.user.name}</p>
              {item?.reply === null ? (
                <FormikForm
                  className="mt-4"
                  initialValues={{ reply: "", id: item?.id }}
                  onSubmit={handleReviewReply}
                >
                  <FormikInput name="reply" label="Reply" />
                  <CustomButton type="submit" label="Submit" />
                </FormikForm>
              ) : (
                <p>Reply: {item?.reply}</p>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Reviews;
