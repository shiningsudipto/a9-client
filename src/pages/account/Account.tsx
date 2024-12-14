import { FaRegEdit } from "react-icons/fa";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import { useState } from "react";
import CustomModal from "../../components/ui/CustomModal";
import FormikInput from "../../components/formik/FormikInput";
import { Form, Formik, FormikValues } from "formik";
import CustomButton from "../../components/ui/CustomButton";
import ImgUpload from "../../components/formik/ImgUpload";
import { toast } from "sonner";

const Account = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data, isLoading } = useGetUserByIdQuery(user.id);
  const userData = data?.data;
  const [updateProfile] = useUpdateUserMutation();
  const initialValues = {
    name: userData?.name,
    address: userData?.address,
    avatar: userData?.avatar,
  };
  const handleUpdateProfile = async (values: FormikValues) => {
    setUpdateUserModalOpen(false);
    const toastId = toast.loading("Profile updating please wait!");
    const data = {
      name: values?.name,
      address: values?.address,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (values.avatar instanceof File) {
      formData.append("avatar", values.avatar);
    }
    try {
      // console.log([...formData.entries()]);
      const res = await updateProfile({
        id: userData.id,
        userData: formData,
      }).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log(error);
    }
  };
  const [isUpdateUserModalOpen, setUpdateUserModalOpen] = useState(false);

  if (isLoading) {
    return <p>Profile data fetching please wait</p>;
  }

  return (
    <>
      <div className=" lg:w-[500px] relative p-5 m-5 bg-white rounded-md lg:mx-auto mt-10">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={userData?.avatar}
            alt=""
            className="size-[150px] rounded-full object-cover"
          />
          <p className="text-xl font-bold">{userData?.name}</p>
          <p className="text-lg font-medium">{userData?.email}</p>
        </div>
        <div className="mt-5 flex items-baseline gap-2">
          <p className="font-bold">Address:</p>
          <p>{userData?.address}</p>
        </div>
        <button
          onClick={() => setUpdateUserModalOpen(true)}
          className="absolute top-0 right-2 flex items-center gap-2"
        >
          <FaRegEdit />
          Edit
        </button>
      </div>
      <CustomModal
        open={isUpdateUserModalOpen}
        setOpen={setUpdateUserModalOpen}
        header={true}
        title="Update User"
      >
        <Formik initialValues={initialValues} onSubmit={handleUpdateProfile}>
          {({ setFieldValue, values }) => {
            return (
              <Form className="">
                <div className=" bg-white">
                  <div className="space-y-5">
                    <FormikInput required name="name" label="Name" />
                    <FormikInput required name="address" label="Address" />
                    <ImgUpload
                      name="avatar"
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

export default Account;
