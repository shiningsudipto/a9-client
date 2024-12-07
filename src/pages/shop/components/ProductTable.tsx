import {
  useDeleteProductMutation,
  useDuplicateProductMutation,
  useUpdateProductMutation,
} from "../../../redux/features/product";
import { TProduct, TResponse } from "../../../types";
import { toast } from "sonner";
import { useState } from "react";
import CustomModal from "../../../components/ui/CustomModal";
import { Form, Formik, FormikValues } from "formik";
import FormikInput from "../../../components/formik/FormikInput";
import CustomButton from "../../../components/ui/CustomButton";
import FormikTextarea from "../../../components/formik/FormikTextarea";
import CustomTable from "../../../components/ui/CustomTable";

const TABLE_HEAD = ["Name", "Price", "Stock", "Category", "Actions"];
const ProductTable = ({ TABLE_ROWS }: { TABLE_ROWS: TProduct[] }) => {
  const [isEditProductModalOpen, setEditProductModalOpen] = useState(false);
  const [isEditProductDetails, setEditProductDetails] = useState({});
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [duplicateProductFunc] = useDuplicateProductMutation();

  const handleProductDelete = async (id: string) => {
    console.log(id);
    const toastId = toast.loading("Product deleting please wait!");
    const res = (await deleteProduct({ id: id }).unwrap()) as TResponse;
    toast.success(res.message, { id: toastId, duration: 2000 });
  };

  const handleDuplicateProduct = async (item: TProduct) => {
    console.log({ item });
    const toastId = toast.loading("Product duplicating please wait!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...productData } = item;
    try {
      const res = (await duplicateProductFunc(
        productData
      ).unwrap()) as TResponse;
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log(error);
    }
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
      <CustomTable tableHead={TABLE_HEAD} label="All Products">
        {TABLE_ROWS?.map((item) => {
          return (
            <tr key={item?.id}>
              <td className="px-5 py-3 border">{item?.name}</td>
              <td className="px-5 py-3 border"> {item?.price}</td>
              <td className="px-5 py-3 border">{item?.stock}</td>
              <td className="px-5 py-3 border">{item?.category}</td>
              <td className="px-5 py-3 border">
                <div className="flex items-center gap-10">
                  <button
                    onClick={() => {
                      setEditProductDetails(item);
                      setEditProductModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleProductDelete(item?.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleDuplicateProduct(item)}>
                    Duplicate
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </CustomTable>
      <CustomModal
        open={isEditProductModalOpen}
        setOpen={setEditProductModalOpen}
      >
        <Formik
          initialValues={isEditProductDetails}
          onSubmit={handleEditProduct}
        >
          {() => {
            return (
              <Form className="">
                <div className=" bg-white">
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
