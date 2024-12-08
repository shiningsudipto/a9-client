import { Link } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../../redux/features/category";

const CategorySection = () => {
  const { data } = useGetAllCategoryQuery("");
  const categoryData = data?.data;
  return (
    <div className="section-gap-xy">
      <div className="mb-5">
        <h2 className="text-3xl font-bold">Categories</h2>
      </div>
      <div className="grid grid-cols-6 gap-5">
        {categoryData?.map((item) => {
          return (
            <Link
              key={item?.id}
              to={"/all-products"}
              className="border py-4 px-6 rounded-md bg-secondary-500 text-white font-semibold"
            >
              {item?.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;
