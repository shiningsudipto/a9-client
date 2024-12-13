import { FormikValues } from "formik";
import FormikForm from "../../components/formik/FormikForm";
import FormikInput from "../../components/formik/FormikInput";
import CustomButton from "../../components/ui/CustomButton";
import { toast } from "sonner";
import { TErrorResponse, TResponse } from "../../types";
import { useForgetPassMutation } from "../../redux/features/auth";

const ForgetPassword = () => {
  const [forgetPassFunc] = useForgetPassMutation();
  const handleForgetPassword = async (values: FormikValues) => {
    const toastId = toast.loading("Category creating please wait!");
    try {
      const res = (await forgetPassFunc(values).unwrap()) as TResponse;
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <FormikForm
        initialValues={{ email: "" }}
        onSubmit={handleForgetPassword}
        className="w-1/3 bg-white p-10 rounded-md shadow-md"
      >
        <p className="text-2xl font-bold text-gray-800">Forget Password Form</p>
        <FormikInput name="email" label="Email" />
        <CustomButton label="Submit" type="submit" />
      </FormikForm>
    </div>
  );
};

export default ForgetPassword;
