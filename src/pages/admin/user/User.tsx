import { toast } from "sonner";
import CustomTable from "../../../components/ui/CustomTable";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/features/auth";
import { TDBUser, TResponse } from "../../../types";
import CustomModal from "../../../components/ui/CustomModal";
import { Form, Formik, FormikValues } from "formik";
import CustomButton from "../../../components/ui/CustomButton";
import { useState } from "react";
import FormikDropdown from "../../../components/formik/FormikDropdown";
import { createOptions } from "../../../utils";
import { userStatusOptions } from "../../../utils/constants.utils";

const tableHead = ["Name", "Email", "Role", "Status", "Actions"];

const User = () => {
  const { data } = useGetAllUsersQuery("");
  const userData = data?.data;
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [isUserUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState({});
  const handleDeleteUser = async (id: string) => {
    const toastId = toast.loading("User deleting please wait!");
    const data = {
      id,
    };
    try {
      const res = (await deleteUser(data).unwrap()) as TResponse;
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateUser = async (values: FormikValues) => {
    setUserUpdateModalOpen(false);
    const toastId = toast.loading("User updating please wait!");
    const data = {
      status: values?.status,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    try {
      // console.log([...formData.entries()]);
      const res = await updateUser({
        id: values.id,
        userData: formData,
      }).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="p-5">
        <CustomTable tableHead={tableHead}>
          {userData?.map((item: TDBUser) => {
            return (
              <tr key={item?.id}>
                <td className="px-5 py-3 border">{item?.name}</td>
                <td className="px-5 py-3 border">{item?.email}</td>
                <td className="px-5 py-3 border">{item?.role}</td>
                <td className="px-5 py-3 border">{item?.status}</td>
                <td className="px-5 py-3 border ">
                  <div className="flex justify-evenly">
                    <button
                      onClick={() => {
                        setSelectedUserData(item);
                        setUserUpdateModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteUser(item?.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </CustomTable>
      </div>
      <CustomModal
        open={isUserUpdateModalOpen}
        setOpen={setUserUpdateModalOpen}
        header={true}
        title="Update User"
      >
        <Formik initialValues={selectedUserData} onSubmit={handleUpdateUser}>
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

export default User;
