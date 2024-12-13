import { Button } from "@material-tailwind/react";
import { Form, Formik, FormikValues } from "formik";
import FormikInput from "../../components/formik/FormikInput";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth";
import { TErrorResponse, TResponse } from "../../types";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, TUser } from "../../redux/slices/auth";
import { verifyToken } from "../../utils/verifyToken";
import { userRole } from "../../utils/constants.utils";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: FormikValues) => {
    const toastId = toast.loading("Login processing!");
    try {
      const res = (await login(values).unwrap()) as TResponse;
      console.log({ res });
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        const user = verifyToken(res.data.token) as TUser;
        console.log({ user });
        dispatch(setUser({ user: user, token: res.data.token }));
        if (user.role === userRole.VENDOR) {
          navigate("/vendor/shop");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          email: "johndoe@example.com",
          password: "hashedpassword123",
        }}
        onSubmit={handleSubmit}
      >
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
              <p>
                Forget password?{" "}
                <Link
                  to="/forget-password"
                  className="text-blue-500 font-semibold"
                >
                  Reset now
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
