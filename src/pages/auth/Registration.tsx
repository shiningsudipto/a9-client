import { Form, Formik, FormikValues } from "formik";
import FormikInput from "../../components/formik/FormikInput";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useRegistrationMutation } from "../../redux/features/auth";
import { TErrorResponse, TResponse } from "../../types";
import { toast } from "sonner";

const customerInitialValues = {
  name: "",
  email: "",
  password: "",
  address: "",
  avatar: File,
};
const vendorInitialValues = {
  name: "",
  email: "",
  password: "",
};

const Registration = () => {
  const [createUser] = useRegistrationMutation();
  const navigate = useNavigate();
  const handleVendorSubmit = async (values: FormikValues) => {
    const toastId = toast.loading("Vendor creating please wait!");
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: "VENDOR",
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }
    try {
      const res = (await createUser(formData).unwrap()) as TResponse;
      console.log({ res });
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        navigate("/login");
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };
  const handleCustomerSubmit = async (values: FormikValues) => {
    const toastId = toast.loading("User creating please wait!");
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      address: values.address,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }
    try {
      const res = (await createUser(formData).unwrap()) as TResponse;
      console.log({ res });
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        navigate("/login");
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };
  const customer = (
    <>
      <Formik
        initialValues={customerInitialValues}
        onSubmit={handleCustomerSubmit}
      >
        {({ setFieldValue, values }) => {
          return (
            <Form className="flex items-center justify-center">
              <div className="w-full rounded-md p-10 mx-auto bg-white shadow-md">
                <h3 className="text-center text-3xl font-bold mb-8">
                  Register
                </h3>
                <div className="space-y-5">
                  <FormikInput required name="name" label="Name" />
                  <FormikInput required name="email" label="Email" />
                  <FormikInput required name="password" label="Password" />
                  <FormikInput required name="address" label="Address" />
                  {/* file upload */}
                  <div className="flex items-stretch">
                    <label
                      htmlFor="avatar"
                      className="bg-blue-100 text-black px-4 py-2 rounded-md cursor-pointer font-medium"
                    >
                      Upload
                    </label>
                    <input
                      type="text"
                      className="border-b border-gray-400 w-full px-3 focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-black"
                      value={values?.avatar?.name || ""}
                    />
                    <input
                      className="hidden"
                      type="file"
                      name="avatar"
                      id="avatar"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const file = event.target.files
                          ? event.target.files[0]
                          : null;
                        setFieldValue("avatar", file);
                      }}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                  <p>
                    Already have an account? Please{" "}
                    <Link to="/login" className="text-blue-500 font-semibold">
                      login!
                    </Link>
                  </p>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
  const vendor = (
    <>
      <Formik initialValues={vendorInitialValues} onSubmit={handleVendorSubmit}>
        {() => {
          return (
            <Form className="flex items-center justify-center">
              <div className="w-full rounded-md p-10 mx-auto bg-white shadow-md">
                <h3 className="text-center text-3xl font-bold mb-8">
                  Register
                </h3>
                <div className="space-y-5">
                  <FormikInput required name="name" label="Name" />
                  <FormikInput required name="email" label="Email" />
                  <FormikInput required name="password" label="Password" />
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                  <p>
                    Already have an account? Please{" "}
                    <Link to="/login" className="text-blue-500 font-semibold">
                      login!
                    </Link>
                  </p>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
  const data = [
    {
      label: "Customer",
      value: "customer",
      content: customer,
    },
    {
      label: "Vendor",
      value: "vendor",
      content: vendor,
    },
  ];
  return (
    <div className="bg-gray-100 h-[100vh] flex items-center">
      <Tabs value="customer" className="w-[500px] mx-auto">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="mt-5">
          {data.map(({ value, content }) => (
            <TabPanel key={value} value={value} className="p-0">
              {content}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Registration;
