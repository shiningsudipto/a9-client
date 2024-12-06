import { Form, Formik, FormikValues } from "formik";
import CustomModal from "../../../components/ui/CustomModal";
import FormikInput from "../../../components/formik/FormikInput";
import FormikTextarea from "../../../components/formik/FormikTextarea";
import CustomButton from "../../../components/ui/CustomButton";
import { useState } from "react";
import FormikDropdown, {
  TDropdownOption,
} from "../../../components/formik/FormikDropdown";
import { useGetAllCategoryQuery } from "../../../redux/features/category";
import { transformItemsToNameAndValue } from "../../../utils";

const CreateProduct = ({ shopId }) => {
  const [isCreateProductModalOpen, setCreateProductModalOpen] = useState(false);
  const { data } = useGetAllCategoryQuery("");
  const options = transformItemsToNameAndValue(data?.data);
  const initialValues = {
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    images: [],
    shopId: shopId,
  };
  const handleCreateProduct = async (values: FormikValues) => {
    console.log(values);
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
                <div className="p-10 bg-white">
                  <h3 className="text-center text-3xl font-bold mb-8">
                    Create Product
                  </h3>
                  <div className="space-y-5">
                    <FormikInput required name="name" label="Name" />
                    <FormikTextarea
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
                    <FormikInput required name="stock" label="Stock" />
                    <FormikDropdown options={options} name="category" />
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
