import { Textarea } from "@material-tailwind/react";
import { ErrorMessage, Field, FieldProps } from "formik";

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
}

const FormikTextarea = ({ name, label, required = false }: InputProps) => {
  return (
    <div>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <>
            <Textarea
              {...field}
              variant="standard"
              label={label}
              placeholder={label}
              required={required}
              id={name}
            />
          </>
        )}
      </Field>
      <ErrorMessage name={name} component="p" className="text-danger" />
    </div>
  );
};

export default FormikTextarea;
