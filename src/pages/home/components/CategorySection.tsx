import { useNavigate } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../../redux/features/category";
import { useAppDispatch } from "../../../redux/hooks";
import { setSearchOptions } from "../../../redux/slices/searchOptions";
import { TCategory } from "../../../types";

const CategorySection = () => {
  const { data } = useGetAllCategoryQuery("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categoryData = data?.data as TCategory[];
  const setSearchValueToTheSlice = (name: string, value: string) => {
    dispatch(setSearchOptions({ [name]: value }));
    navigate("/products");
  };
  return (
    <div className="section-gap-xy">
      <div className="mb-5">
        <h2 className="text-3xl font-bold">Categories</h2>
      </div>
      <div className="grid lg:grid-cols-6 grid-cols-2 gap-5">
        {categoryData?.map((item) => {
          return (
            <button
              onClick={() => setSearchValueToTheSlice("category", item?.name)}
              key={item?.id}
              className="border py-4 px-6 rounded-md bg-secondary-500 text-white font-semibold"
            >
              {item?.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;
