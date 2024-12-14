import { useParams } from "react-router-dom";
import { useGetShopDetailByIdQuery } from "../../redux/features/shop";
import { MdOutlineFavorite, MdFavorite } from "react-icons/md";
import ProductCard from "../../components/ui/ProductCard";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import { useAppSelector } from "../../redux/hooks";
import { isUserFollowingShop } from "../../utils";
import { useToggleFollowMutation } from "../../redux/features/follower";
import { toast } from "sonner";
import { TResponse } from "../../types";

const ShopDetails = () => {
  const { id } = useParams();
  const { data } = useGetShopDetailByIdQuery(id);
  const shop = data?.data;
  const products = shop?.Product || [];
  const user = useAppSelector(useCurrentUser) as TUser;
  const [toggleFollowFunc] = useToggleFollowMutation();

  const isFollowing = isUserFollowingShop(shop?.Follower, user?.id);

  const handleToggleFollow = async () => {
    const toastId = toast.loading("Action in progress please wait!");
    const data = {
      userId: user?.id,
      shopId: shop?.id,
    };
    try {
      const res = (await toggleFollowFunc(data).unwrap()) as TResponse;
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="section-gap-xy mx-auto px-4 py-6">
      {/* Shop Header */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-6 shadow-md rounded-lg">
        <img
          src={shop?.logo}
          alt={shop?.name}
          className="w-32 h-32 object-cover rounded-full border border-gray-300"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-primary-500 text-center">
            {shop?.name}
          </h1>
          <p className="text-gray-600 mt-2 text-center">{shop?.description}</p>
          <div className="mt-4 flex items-center gap-6">
            <button
              onClick={() => handleToggleFollow()}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-primary-300 text-primary-500 hover:bg-primary-500 hover:text-white transition"
            >
              {isFollowing ? (
                <>
                  <MdFavorite className="text-lg" />
                  Unfollow
                </>
              ) : (
                <>
                  <MdOutlineFavorite className="text-lg" />
                  Follow
                </>
              )}
            </button>
            <span className="text-gray-700 font-medium">
              Followers: {shop?.Follower?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <ProductCard products={products} />
      </div>
    </div>
  );
};

export default ShopDetails;
