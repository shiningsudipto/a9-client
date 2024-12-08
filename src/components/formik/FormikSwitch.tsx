import React from "react";
import { Switch } from "@material-tailwind/react";
import { Field, FieldProps } from "formik";

interface FormikSwitchProps {
  name: string;
  label: string;
}

const FormikSwitch: React.FC<FormikSwitchProps> = ({ name, label }) => {
  return (
    <div className="flex justify-between items-center">
      <p className="">{label}</p>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <Switch
            name={name}
            crossOrigin=""
            checked={field.value}
            onChange={(e) => {
              field.onChange({
                target: { name: field.name, value: e.target.checked },
              });
            }}
            onBlur={field.onBlur}
          />
        )}
      </Field>
    </div>
  );
};

export default FormikSwitch;
