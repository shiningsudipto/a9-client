import { useGetFlashSaleProductsQuery } from "../../redux/features/product";
import ProductCard from "../../components/ui/ProductCard";

const FlashSale = () => {
  const { data } = useGetFlashSaleProductsQuery("");
  const flashData = data?.data;
  return (
    <div className="section-gap-x py-20">
      <ProductCard products={flashData} flashSale={true} cols={4} />
    </div>
  );
};

export default FlashSale;
