import { IoIosFlash } from "react-icons/io";
import { useGetFlashSaleProductsQuery } from "../../redux/features/product";
import { TProductWithShop } from "../../types";
import { TbCurrencyTaka } from "react-icons/tb";

const FlashSale = () => {
  const { data } = useGetFlashSaleProductsQuery("");
  const flashData = data?.data;
  return (
    <div className="section-gap-x py-20">
      <div className="grid grid-cols-4 gap-10">
        {flashData?.map((item: TProductWithShop) => {
          return (
            <div key={item?.id} className="shadow-xl p-2 relative rounded-xl">
              <img
                src={item.images[0]}
                alt=""
                className="h-[250px] object-cover rounded-xl"
              />
              <IoIosFlash className="absolute top-3 text-3xl right-2 text-primary" />
              <div className="space-y-3 mt-2 p-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-lg font-semibold flex items-center">
                    {item.price}
                    <TbCurrencyTaka />{" "}
                  </p>
                </div>
                <p>Available: {item.stock}</p>
                <p>Shop: {item.shop.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlashSale;
