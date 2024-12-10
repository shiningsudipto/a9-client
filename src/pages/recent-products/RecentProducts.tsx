import ProductCard from "../../components/ui/ProductCard";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import { userRole } from "../../utils/constants.utils";
import { getFromLocalstorage } from "../../utils/localstorage.utils";

const RecentProducts = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  if (user.role !== userRole.USER) {
    return <p>This page is only for customer!</p>;
  }

  const products = getFromLocalstorage("recentProducts");

  return (
    <div className="section-gap-xy">
      <ProductCard products={products} />
    </div>
  );
};

export default RecentProducts;
