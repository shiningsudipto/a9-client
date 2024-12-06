import { FormikValues } from "formik";
import {
  useCreateShopMutation,
  useGetShopByVendorQuery,
} from "../../redux/features/shop";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import HandleShop from "./components/HandleShop";
import { TResponse } from "../../types";
import { toast } from "sonner";
import { FaRegEdit } from "react-icons/fa";
import ProductTable from "./components/ProductTable";
import CreateProduct from "./components/CreateProduct";

const initialValues = {
  name: "",
  description: "",
  logo: undefined,
};

const Shop = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data, error } = useGetShopByVendorQuery(user.id);

  console.log(data, error);
  const shopData = data?.data;
  const [createShop] = useCreateShopMutation();

  const handleCreateShop = async (values: FormikValues) => {
    const toastId = toast.loading("Vendor creating please wait!");
    const data = {
      name: values.name,
      description: values.description,
      ownerId: user.id,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("logo", values.logo);
    try {
      const res = (await createShop(formData).unwrap()) as TResponse;
      console.log({ res });
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      toast.success(error?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="">
      {error?.success === false ? (
        <HandleShop
          initialValues={initialValues}
          handleShopData={handleCreateShop}
        />
      ) : (
        <div className="">
          <div>
            <div className="w-[500px] p-5 bg-white rounded-md mx-auto relative mt-10">
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={shopData?.logo}
                  alt=""
                  className="size-[150px] rounded-full object-cover"
                />
                <p className="text-xl font-bold">{shopData?.name}</p>
                <p className="text-lg font-medium text-center">
                  {shopData?.description}
                </p>
              </div>
              <div className="flex items-start justify-between mt-5">
                <p>{shopData?.Product?.length} Products</p>
                <p>{shopData?.Order?.length} Order</p>
                <p>{shopData?.Follower?.length} Followers</p>
              </div>
              <button className="absolute top-0 right-2 flex items-center gap-2">
                <FaRegEdit />
                Edit
              </button>
            </div>
          </div>
          <div className="bg-white m-10 rounded-md p-5">
            <div className="flex justify-end me-10">
              <CreateProduct />
            </div>
            <ProductTable TABLE_ROWS={shopData?.Product} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
