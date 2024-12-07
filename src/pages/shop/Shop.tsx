import { Form, Formik, FormikValues } from "formik";
import {
  useCreateShopMutation,
  useGetShopByVendorQuery,
  useUpdateShopMutation,
} from "../../redux/features/shop";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import HandleShop from "./components/HandleShop";
import { TResponse } from "../../types";
import { toast } from "sonner";
import { FaRegEdit } from "react-icons/fa";
import ProductTable from "./components/ProductTable";
import CreateProduct from "./components/CreateProduct";
import CustomModal from "../../components/ui/CustomModal";
import FormikInput from "../../components/formik/FormikInput";
import ImgUpload from "../../components/formik/ImgUpload";
import CustomButton from "../../components/ui/CustomButton";
import { useState } from "react";

const initialValues = {
  name: "",
  description: "",
  logo: undefined,
};

const Shop = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data, error } = useGetShopByVendorQuery(user.id);
  const [updateShopFunc] = useUpdateShopMutation();
  const [isUpdateShopModalOpen, setUpdateShopModalOpen] = useState(false);

  const shopData = data?.data;
  const [createShop] = useCreateShopMutation();

  const initialValuesOfShopUpdate = {
    id: shopData?.id,
    name: shopData?.name,
    description: shopData?.description,
    logo: shopData?.logo,
  };

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

  const handleUpdateShop = async (values: FormikValues) => {
    setUpdateShopModalOpen(false);
    const toastId = toast.loading("Shop updating please wait!");
    const data = {
      id: shopData?.id,
      name: values.name,
      description: values.description,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (values.logo instanceof File) {
      formData.append("logo", values.logo);
    }
    try {
      const res = (await updateShopFunc(formData).unwrap()) as TResponse;
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      toast.success(error?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      {error?.success === false ? (
        <HandleShop
          initialValues={initialValues}
          handleShopData={handleCreateShop}
        />
      ) : (
        <div>
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
              <button
                onClick={() => setUpdateShopModalOpen(true)}
                className="absolute top-0 right-2 flex items-center gap-2"
              >
                <FaRegEdit />
                Edit
              </button>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <div className=" me-10 bg-white w-fit px-10 py-4">
              <CreateProduct shopId={shopData?.id} />
            </div>
          </div>
          <ProductTable TABLE_ROWS={shopData?.Product} />
        </div>
      )}
      <CustomModal
        open={isUpdateShopModalOpen}
        setOpen={setUpdateShopModalOpen}
        header={true}
        title="Update Shop"
      >
        <Formik
          initialValues={initialValuesOfShopUpdate}
          onSubmit={handleUpdateShop}
        >
          {({ setFieldValue, values }) => {
            return (
              <Form className="">
                <div className=" bg-white">
                  <div className="space-y-5">
                    <FormikInput required name="name" label="Name" />
                    <FormikInput
                      required
                      name="description"
                      label="Description"
                    />
                    <ImgUpload
                      name="logo"
                      setFieldValue={setFieldValue}
                      values={values}
                    />
                    <CustomButton
                      label="Update"
                      variant="filled"
                      type="submit"
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </CustomModal>
    </>
  );
};

export default Shop;
