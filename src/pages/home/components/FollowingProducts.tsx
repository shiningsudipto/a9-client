import ProductCard from "../../../components/ui/ProductCard";
import { useGetProductsFromFollowingShopsQuery } from "../../../redux/features/product";
import { useAppSelector } from "../../../redux/hooks";
import { TUser, useCurrentUser } from "../../../redux/slices/auth";

const FollowingProducts = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data } = useGetProductsFromFollowingShopsQuery(user?.id);
  const products = data?.data;
  return (
    <div className="section-gap-xy">
      <h3 className="text-3xl font-bold mb-5">Products of following shops:</h3>
      <ProductCard products={products} />
    </div>
  );
};

export default FollowingProducts;
