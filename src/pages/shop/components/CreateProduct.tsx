import { Form, Formik, FormikValues } from "formik";
import CustomModal from "../../../components/ui/CustomModal";
import FormikInput from "../../../components/formik/FormikInput";
import CustomButton from "../../../components/ui/CustomButton";
import { useState } from "react";
import FormikDropdown from "../../../components/formik/FormikDropdown";
import { useGetAllCategoryQuery } from "../../../redux/features/category";
import { transformItemsToValueAndLabel } from "../../../utils";
import ImgUpload from "../../../components/formik/ImgUpload";
import { useCreateProductMutation } from "../../../redux/features/product";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const CreateProduct = ({ shopId }: { shopId: string }) => {
  const [isCreateProductModalOpen, setCreateProductModalOpen] = useState(false);
  const [createProductFunc] = useCreateProductMutation();
  const { data } = useGetAllCategoryQuery("");
  const options = transformItemsToValueAndLabel(data?.data);
  const initialValues = {
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    shopId: shopId,
    images: [""],
  };
  const handleCreateProduct = async (values: FormikValues) => {
    setCreateProductModalOpen(false);
    const toastId = toast.loading("Product creating please wait!");
    const data = {
      name: values?.name,
      price: values?.price,
      description: values?.description,
      stock: values?.stock,
      category: values?.category,
      shopId: shopId,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    values.images.forEach((image: File) => {
      formData.append("images", image);
    });
    try {
      // console.log([...formData.entries()]);
      const res = (await createProductFunc(formData).unwrap()) as TResponse;
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={() => setCreateProductModalOpen(true)}>
        Create product
      </button>
      <CustomModal
        open={isCreateProductModalOpen}
        setOpen={setCreateProductModalOpen}
      >
        <Formik initialValues={initialValues} onSubmit={handleCreateProduct}>
          {({ setFieldValue, values }) => {
            return (
              <Form className="">
                <div className=" bg-white">
                  <h3 className="text-center text-3xl font-bold mb-5">
                    Create Product
                  </h3>
                  <div className="space-y-5">
                    <FormikInput required name="name" label="Name" />
                    <FormikInput
                      required
                      name="description"
                      label="Description"
                    />
                    <FormikInput
                      type="number"
                      required
                      name="price"
                      label="Price"
                    />
                    <FormikInput
                      required
                      type="number"
                      name="stock"
                      label="Stock"
                    />
                    <FormikDropdown
                      options={options}
                      label="Select category"
                      name="category"
                    />
                    <ImgUpload
                      name="images"
                      setFieldValue={setFieldValue}
                      values={values}
                      multiple={true}
                    />
                    <CustomButton
                      label="Create"
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
    </div>
  );
};

export default CreateProduct;
