import { Form, Formik } from "formik";
import FormikInput from "../../../components/formik/FormikInput";
import ImgUpload from "../../../components/formik/ImgUpload";
import CustomButton from "../../../components/ui/CustomButton";

interface HandleShopProps {
  initialValues: {
    name: string;
    description: string;
    logo?: File;
  };
  handleShopData: (values: {
    name: string;
    description: string;
    logo?: File;
  }) => void;
}

const HandleShop: React.FC<HandleShopProps> = ({
  initialValues,
  handleShopData,
}) => {
  return (
    <div className="mt-10">
      <Formik initialValues={initialValues} onSubmit={handleShopData}>
        {({ setFieldValue, values }) => {
          return (
            <Form className="flex items-center justify-center">
              <div className="w-1/2 rounded-md p-10 mx-auto bg-white shadow-md border border-gray-100">
                <h3 className="text-center text-3xl font-bold mb-8">
                  Create Shop
                </h3>
                <div className="space-y-5">
                  <FormikInput required name="name" label="Name" />
                  <FormikInput
                    required
                    name="description"
                    label="Description"
                  />
                  <ImgUpload
                    name="logo"
                    placeholder="Upload logo"
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                  <CustomButton label="Create" variant="filled" type="submit" />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default HandleShop;
