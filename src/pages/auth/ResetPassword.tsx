import { useLocation, useNavigate } from "react-router-dom";
import FormikForm from "../../components/formik/FormikForm";
import FormikInput from "../../components/formik/FormikInput";
import CustomButton from "../../components/ui/CustomButton";
import { useResetPassMutation } from "../../redux/features/auth";
import { FormikValues } from "formik";
import { toast } from "sonner";
import { TErrorResponse, TResponse } from "../../types";

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const token = queryParams.get("token");
  const navigate = useNavigate();
  const [resetPassFunc] = useResetPassMutation();
  const handleResetPassword = async (values: FormikValues) => {
    if (values.password !== values.confirmPassword) {
      return toast.error("Password not Matched! Please check again");
    }
    const toastId = toast.loading("Password updating please wait!");
    const payload = {
      id,
      token,
      newPassword: values.password,
    };
    try {
      const res = (await resetPassFunc(payload).unwrap()) as TResponse;
      toast.success(res.message, { id: toastId, duration: 2000 });
      navigate("/login");
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <FormikForm
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={handleResetPassword}
        className="w-1/3 bg-white p-10 rounded-md shadow-md"
      >
        <p className="text-2xl font-bold text-gray-800">Forget Password Form</p>
        <FormikInput name="password" label="Password" required />
        <FormikInput name="confirmPassword" label="Confirm Password" required />
        <CustomButton label="Submit" type="submit" />
      </FormikForm>
    </div>
  );
};

export default ResetPassword;
