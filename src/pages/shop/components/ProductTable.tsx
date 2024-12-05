import { Card, Typography } from "@material-tailwind/react";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../../redux/features/product";
import { TResponse } from "../../../types";
import { toast } from "sonner";
import { useState } from "react";
import CustomModal from "../../../components/ui/CustomModal";
import { Form, Formik, FormikValues } from "formik";
import FormikInput from "../../../components/formik/FormikInput";
import CustomButton from "../../../components/ui/CustomButton";
import FormikTextarea from "../../../components/formik/FormikTextarea";

const TABLE_HEAD = ["Name", "Price", "Stock", "Category", "Actions"];
const ProductTable = ({ TABLE_ROWS }) => {
  const [isEditProductModalOpen, setEditProductModalOpen] = useState(false);
  const [isEditProductDetails, setEditProductDetails] = useState({});
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const handleProductDelete = async (id: string) => {
    const toastId = toast.loading("Product deleting please wait!");
    const res = (await deleteProduct({ id: id }).unwrap()) as TResponse;
    toast.success(res.message, { id: toastId, duration: 2000 });
  };
  const handleEditProduct = async (values: FormikValues) => {
    setEditProductModalOpen(false);
    const toastId = toast.loading("Product updating please wait!");
    console.log(values);
    const data = {
      id: values?.id,
      name: values?.name,
      stock: values?.stock,
      description: values?.id,
      price: values?.price,
    };
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(data));
    const res = (await updateProduct(formdata).unwrap()) as TResponse;
    toast.success(res.message, { id: toastId, duration: 2000 });
  };
  return (
    <>
      <Card className="h-full w-full overflow-scroll px-6">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="">
              {TABLE_HEAD?.map((head) => (
                <th key={head} className="border-b border-gray-300 pb-4 pt-10">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS?.map((item, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

              return (
                <tr key={item?.id} className="hover:bg-gray-50">
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {item?.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {item?.price}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {item?.stock}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {item?.category}
                    </Typography>
                  </td>
                  <td className={`${classes} max-w-[150px]`}>
                    <div className="flex items-center gap-10">
                      <button
                        onClick={() => {
                          setEditProductDetails(item);
                          setEditProductModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleProductDelete(id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <CustomModal
        open={isEditProductModalOpen}
        setOpen={setEditProductModalOpen}
      >
        <Formik
          initialValues={isEditProductDetails}
          onSubmit={handleEditProduct}
        >
          {({ setFieldValue, values }) => {
            return (
              <Form className="">
                <div className="p-10 bg-white">
                  <h3 className="text-center text-3xl font-bold mb-8">
                    Edit Product
                  </h3>
                  <div className="space-y-5">
                    <FormikInput required name="name" label="Name" />
                    <FormikTextarea
                      required
                      name="description"
                      label="Description"
                    />
                    <FormikInput required name="stock" label="Stock" />
                    <FormikInput
                      type="number"
                      required
                      name="price"
                      label="Price"
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
    </>
  );
};

export default ProductTable;
