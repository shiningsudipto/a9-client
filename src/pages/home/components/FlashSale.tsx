import { useGetFlashSaleProductsQuery } from "../../../redux/features/product";
import { Link } from "react-router-dom";
import CustomButton from "../../../components/ui/CustomButton";
import ProductCard from "../../../components/ui/ProductCard";

const FlashSale = () => {
  const { data } = useGetFlashSaleProductsQuery("");
  const flashData = data?.data;
  console.log(flashData?.length);
  return (
    <div className="section-gap-xy">
      <div className="mb-5">
        <h2 className="text-3xl font-bold">Flash Sale</h2>
      </div>
      <ProductCard
        products={flashData?.slice(0, 4)}
        flashSale={true}
        cols={4}
      />
      {flashData?.length !== 0 && (
        <div className="flex justify-center mt-10">
          <Link to={"/flash-sale"} className="">
            <CustomButton label="Sell All" type="button" variant="outlined" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default FlashSale;
