import ProductCard from "../../components/ui/ProductCard";
import { getFromLocalstorage } from "../../utils/localstorage.utils";

const RecentProducts = () => {
  const products = getFromLocalstorage("recentProducts");

  return (
    <div className="section-gap-xy">
      <ProductCard products={products} />
    </div>
  );
};

export default RecentProducts;
