import { Option, Select } from "@material-tailwind/react";
import { ErrorMessage, Field, FieldProps } from "formik";

export interface TDropdownOption {
  value: string;
  label: string;
}

interface InputProps {
  name: string;
  label?: string;
  options?: TDropdownOption[];
}

const FormikDropdown = ({ name, label, options }: InputProps) => {
  return (
    <div>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <>
            <Select
              variant="standard"
              label={label}
              value={field.value}
              onChange={(e) => form.setFieldValue(name, e)}
            >
              {options?.map((item: TDropdownOption) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </>
        )}
      </Field>
      <ErrorMessage name={name} component="p" className="text-danger" />
    </div>
  );
};

export default FormikDropdown;
