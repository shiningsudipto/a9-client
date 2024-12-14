import ProductCard from "../../../components/ui/ProductCard";
import { useGetAllProductsQuery } from "../../../redux/features/product";

const searchOptions = {
  limit: 50,
  page: 1,
  sortBy: "price",
  sortOrder: "asc",
};

const AllProducts = () => {
  const { data } = useGetAllProductsQuery(searchOptions);
  const productsData = data?.data?.data;
  return (
    <div className="section-gap-xy">
      <h1 className="text-3xl font-bold mb-5">All Products</h1>
      <ProductCard products={productsData} cols={4} />
    </div>
  );
};

export default AllProducts;
