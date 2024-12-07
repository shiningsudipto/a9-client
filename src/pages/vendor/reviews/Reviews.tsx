import CustomTable from "../../../components/ui/CustomTable";
import { useGetReviewByVendorQuery } from "../../../redux/features/review";
import { useAppSelector } from "../../../redux/hooks";
import { TUser, useCurrentUser } from "../../../redux/slices/auth";
import { TReview } from "../../../types";

const tableHead = ["Product", "Rating", "Comment", "User", "Email"];

const Reviews = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data } = useGetReviewByVendorQuery(user.id);
  const reviewsData = data?.data;
  return (
    <div>
      <CustomTable tableHead={tableHead} label="All reviews">
        {reviewsData?.map((item: TReview) => {
          return (
            <tr key={item?.id}>
              <td className="px-5 py-3 border">{item?.product.name}</td>
              <td className="px-5 py-3 border">{item?.rating}</td>
              <td className="px-5 py-3 border">{item?.comment}</td>
              <td className="px-5 py-3 border">{item?.user.name}</td>
              <td className="px-5 py-3 border">{item?.user.email}</td>
            </tr>
          );
        })}
      </CustomTable>
    </div>
  );
};

export default Reviews;
