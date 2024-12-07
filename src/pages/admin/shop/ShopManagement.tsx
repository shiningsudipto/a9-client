import { Form, Formik, FormikValues } from "formik";
import CustomModal from "../../../components/ui/CustomModal";
import CustomTable from "../../../components/ui/CustomTable";
import {
  useGetAllShopQuery,
  useUpdateShopMutation,
} from "../../../redux/features/shop";
import { TShop } from "../../../types";
import FormikDropdown from "../../../components/formik/FormikDropdown";
import { userStatusOptions } from "../../../utils/constants.utils";
import { createOptions } from "../../../utils";
import CustomButton from "../../../components/ui/CustomButton";
import { toast } from "sonner";
import { useState } from "react";

const tableHead = ["Shop Name", "Status", "Owner", "Actions"];

const ShopManagement = () => {
  const { data } = useGetAllShopQuery("");
  const shopsData = data?.data;
  const [isShopUpdateModalOpen, setShopUpdateModalOpen] = useState(false);
  const [selectedShopData, setSelectedShopData] = useState({});
  const [updateShop] = useUpdateShopMutation();
  const handleUpdateShop = async (values: FormikValues) => {
    setShopUpdateModalOpen(false);
    const toastId = toast.loading("Shop updating please wait!");
    const data = {
      id: values.id,
      status: values?.status,
    };
    console.log({ data });
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    try {
      console.log([...formData.entries()]);
      const res = await updateShop(formData).unwrap();
      console.log({ res });
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CustomTable label="All Shops" tableHead={tableHead}>
        {shopsData?.map((item: TShop) => {
          return (
            <tr key={item?.id}>
              <td className="px-5 py-3 border">{item?.name}</td>
              <td className="px-5 py-3 border">{item?.status}</td>
              <td className="px-5 py-3 border">{item?.owner.name}</td>
              <td className="px-5 py-3 border ">
                <div className="flex justify-evenly">
                  <button
                    onClick={() => {
                      setSelectedShopData(item);
                      setShopUpdateModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </CustomTable>
      <CustomModal
        open={isShopUpdateModalOpen}
        setOpen={setShopUpdateModalOpen}
        header={true}
        title="Update Shop status"
      >
        <Formik initialValues={selectedShopData} onSubmit={handleUpdateShop}>
          {() => {
            return (
              <Form className="space-y-8">
                <FormikDropdown
                  options={createOptions(userStatusOptions)}
                  label="Select status"
                  name="status"
                />
                <CustomButton label="Update" variant="filled" type="submit" />
              </Form>
            );
          }}
        </Formik>
      </CustomModal>
    </>
  );
};

export default ShopManagement;
