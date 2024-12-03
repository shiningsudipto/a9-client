import { Button } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import FormikInput from "../../components/formik/FormikInput";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (values) => {
    console.log(values);
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
