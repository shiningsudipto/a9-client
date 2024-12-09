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
import { Radio } from "@material-tailwind/react";

const Products = () => {
  const searchOptions = useSelector(useSearchOptions);
  // console.log(searchOptions);
  const { data } = useGetAllProductsQuery(searchOptions);
  const productsData = data?.data?.data;
  // console.log(productsData);
  const { data: categoryData } = useGetAllCategoryQuery("");
  const allCategory = categoryData?.data;
  console.log(allCategory);
  const categoryOptions = transformItemsToValueAndLabel(allCategory);
  console.log(categoryOptions);
  const dispatch = useAppDispatch();

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

  const setSearchValueToTheSlice = (name, value) => {
    dispatch(setSearchOptions({ [name]: value }));
  };

  return (
    <div className="section-gap-xy grid gap-10 grid-cols-4">
      <div className="bg-gray-50">
        <div>
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
      </div>
      <div className="col-span-3">
        <ProductCard products={productsData} cols={3} />
      </div>
    </div>
  );
};

export default Products;
