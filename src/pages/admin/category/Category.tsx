import { useState } from "react";
import FormikInput from "../../../components/formik/FormikInput";
import CustomModal from "../../../components/ui/CustomModal";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../redux/features/category";
import { Form, Formik, FormikValues } from "formik";
import CustomButton from "../../../components/ui/CustomButton";
import { toast } from "sonner";
import { TResponse } from "../../../types";

export type TCategory = {
  id: string;
  name: string;
  createdAt: string;
};

const Category = () => {
  const { data } = useGetAllCategoryQuery("");
  const categoryData = data?.data;
  const [createCategoryFunc] = useCreateCategoryMutation();
  const [deleteCategoryFunc] = useDeleteCategoryMutation();
  const [updateCategoryFunc] = useUpdateCategoryMutation();
  const [isCreateCategoryModalOpen, setCreateCategoryModalOpen] =
    useState(false);
  const [isUpdateCategoryModalOpen, setUpdateCategoryModalOpen] =
    useState(false);
  const [selectedCategoryData, setSelectedCategoryData] = useState({});

  const initialValues = {
    name: "",
  };

  const handleCreateCategory = async (values: FormikValues) => {
    setCreateCategoryModalOpen(false);
    const toastId = toast.loading("Category creating please wait!");
    try {
      const res = (await createCategoryFunc(values).unwrap()) as TResponse;
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (values: { id: string }) => {
    const toastId = toast.loading("Category deleting please wait!");
    try {
      const res = (await deleteCategoryFunc({
        id: values.id,
      }).unwrap()) as TResponse;
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCategory = async (values: FormikValues) => {
    setUpdateCategoryModalOpen(false);
    const toastId = toast.loading("Category updating please wait!");
    try {
      const res = (await updateCategoryFunc({
        id: values.id,
        name: values.name,
      }).unwrap()) as TResponse;
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-1/2 mx-auto mt-10">
        <div className="flex justify-between mb-5">
          <p className="text-xl font-bold">
            Total category: {categoryData?.length}
          </p>
          <button onClick={() => setCreateCategoryModalOpen(true)}>
            Add new
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full mx-auto table-auto border-collapse border border-gray-50">
            {/* Table Header */}
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {categoryData?.map((item: TCategory) => (
                <tr
                  key={item?.id}
                  className="hover:bg-gray-50 bg-blue-gray-100 transition-colors duration-200"
                >
                  {/* Name Column */}
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {item.name || "N/A"}
                  </td>
                  {/* Actions Column */}
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCategoryData(item);
                          setUpdateCategoryModalOpen(true);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory({ id: item?.id })}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomModal
        open={isCreateCategoryModalOpen}
        setOpen={setCreateCategoryModalOpen}
        header={true}
        title="Create Category"
      >
        <Formik initialValues={initialValues} onSubmit={handleCreateCategory}>
          {() => {
            return (
              <Form className="space-y-8">
                <FormikInput name="name" label="Name" />
                <CustomButton label="Create" variant="filled" type="submit" />
              </Form>
            );
          }}
        </Formik>
      </CustomModal>
      <CustomModal
        open={isUpdateCategoryModalOpen}
        setOpen={setUpdateCategoryModalOpen}
        header={true}
        title="Update Category"
      >
        <Formik
          initialValues={selectedCategoryData}
          onSubmit={handleUpdateCategory}
        >
          {() => {
            return (
              <Form className="space-y-8">
                <FormikInput name="name" label="Name" />
                <CustomButton label="Update" variant="filled" type="submit" />
              </Form>
            );
          }}
        </Formik>
      </CustomModal>
    </>
  );
};

export default Category;
