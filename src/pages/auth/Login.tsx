import { Button } from "@material-tailwind/react";
import { Form, Formik, FormikValues } from "formik";
import FormikInput from "../../components/formik/FormikInput";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth";
import { TResponse } from "../../types";
import { toast } from "sonner";

const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const handleSubmit = async (values: FormikValues) => {
    const toastId = toast.loading("Login processing!");
    try {
      const res = (await login(values).unwrap()) as TResponse;
      console.log({ res });
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.success(error?.data?.message, { id: toastId, duration: 2000 });
    }
  };
  return (
    <div>
      <Formik initialValues={{ password: "" }} onSubmit={handleSubmit}>
        <Form className="flex items-center justify-center h-[100vh] border bg-gray-100">
          <div className="w-[450px] rounded-md p-10 mx-auto bg-white shadow-md">
            <h3 className="text-center text-3xl font-bold mb-8">Login</h3>
            <div className="space-y-5">
              <FormikInput name="email" label="Email" />
              <FormikInput name="password" label="Password" />
              <Button type="submit" className="w-full">
                Login
              </Button>
              <p>
                Don't have an account? Please{" "}
                <Link
                  to="/registration"
                  className="text-blue-500 font-semibold"
                >
                  register!
                </Link>
              </p>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
