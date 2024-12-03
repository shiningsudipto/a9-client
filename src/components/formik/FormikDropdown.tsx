import { Option, Select } from "@material-tailwind/react";
import { ErrorMessage, Field, FieldProps } from "formik";
interface Option {
  value: string;
  label: string;
}

interface InputProps {
  name: string;
  label?: string;
  options?: Option[];
}

const FormikDropdown = ({ name, label, options }: InputProps) => {
  return (
    <div>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <>
            <Select {...field} variant="standard" label={label}>
              {options?.map((item: Option) => {
                return <Option key={item.value}>{item.label}</Option>;
              })}
            </Select>
          </>
        )}
      </Field>
      <ErrorMessage name={name} component="p" className="text-danger" />
    </div>
  );
};

export default FormikDropdown;
