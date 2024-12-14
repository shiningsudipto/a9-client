import { useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../../redux/features/product";
import {
  setSearchOptions,
  useSearchOptions,
} from "../../redux/slices/searchOptions";
import ProductCard from "../../components/ui/ProductCard";
import { useGetAllCategoryQuery } from "../../redux/features/category";
import { transformItemsToValueAndLabel } from "../../utils";
import { useAppDispatch } from "../../redux/hooks";
import { Radio, Slider } from "@material-tailwind/react";
import SearchProducts from "../../components/shared/SearchProducts";
import { useEffect, useState } from "react";

const priceSortOptions = [
  {
    label: "Ascending",
    value: "asc",
  },
  {
    label: "Descending",
    value: "desc",
  },
];

const Products = () => {
  const searchOptions = useSelector(useSearchOptions);
  // console.log(searchOptions);
  const { data } = useGetAllProductsQuery(searchOptions);
  const productsData = data?.data?.data;
  const [allProducts, setProducts] = useState(productsData);
  console.log({ allProducts });
  const { data: categoryData } = useGetAllCategoryQuery("");
  const allCategory = categoryData?.data;
  const categoryOptions = transformItemsToValueAndLabel(allCategory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setProducts(productsData);
  }, [data, productsData]);

  const setSearchValueToTheSlice = (name: string, value: string) => {
    dispatch(setSearchOptions({ [name]: value }));
  };

  return (
    <div className="section-gap-xy grid gap-10 lg:grid-cols-4 grid-cols-1">
      <div className="bg-gray-50 p-4 rounded-md">
        <SearchProducts />
        <div className="mt-5">
          <p className="text-xl font-bold mb-4">Categories:</p>
          <div className="flex flex-col">
            <Radio
              crossOrigin={""}
              name="category"
              label="None"
              checked={!searchOptions.category}
              onChange={() => setSearchValueToTheSlice("category", "")}
            />
            {categoryOptions?.map((category) => (
              <Radio
                crossOrigin={""}
                key={category.value}
                name="category"
                label={category.label}
                value={category.value}
                onChange={() =>
                  setSearchValueToTheSlice("category", category.value)
                }
                checked={searchOptions.category === category.value}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xl font-bold mb-4">Sort by price:</p>
          <div className="flex flex-col">
            {priceSortOptions?.map((sortOrder) => (
              <Radio
                crossOrigin={""}
                key={sortOrder.value}
                name="sortOrder"
                label={sortOrder.label}
                value={sortOrder.value}
                onChange={() =>
                  setSearchValueToTheSlice("sortOrder", sortOrder.value)
                }
                checked={searchOptions.sortOrder === sortOrder.value}
              />
            ))}
          </div>
        </div>
        {/* Price Slider */}
        <div className="mt-5">
          <p className="text-xl font-bold mb-4">Filter by Price:</p>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">${0}</span>
            <Slider defaultValue={50} />
            <span className="text-gray-700">20</span>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 lg:mt-0 mt-5">
        <ProductCard products={allProducts} cols={3} />
      </div>
    </div>
  );
};

export default Products;
