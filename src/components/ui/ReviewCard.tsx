import { FaStar } from "react-icons/fa";
import { TReview } from "../../types";

const ReviewCard = ({ reviews }: { reviews: TReview[] }) => {
  return (
    <div className="">
      {reviews.map((review) => (
        <div
          key={review?.id}
          className="bg-white shadow-md rounded-md p-5 flex flex-col gap-2 border border-gray-200"
        >
          {/* Header: Rating and Created At */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`${
                    index < review?.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400">
              {new Date(review?.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Review Comment */}
          <p className="text-gray-700 text-md">{review?.comment}</p>

          {/* Reviewer Details */}
          <div className="flex items-center gap-2">
            <div className="size-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
              {review?.userId?.slice(0, 2).toUpperCase()}
            </div>
            <p className="font-medium text-gray-800">
              User ID: {review?.userId?.slice(0, 8)}...
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
