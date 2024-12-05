/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from "formik";
import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  required?: boolean;
  values: Record<string, any>; // Make values a generic record
  setFieldValue: (field: string, value: any) => void; // Update signature
}

const ImgUpload = ({
  name,
  required = false,
  setFieldValue,
  values,
}: InputProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setFieldValue(name, file);
    }
  };

  return (
    <div>
      <div className="flex items-stretch">
        {/* Upload Button */}
        <label
          htmlFor={name}
          className="bg-blue-100 text-black px-4 py-2 rounded-md cursor-pointer font-medium"
        >
          Upload
        </label>

        {/* File Name Display */}
        <input
          type="text"
          className="border-b border-gray-400 w-full px-3 focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-black"
          value={values?.[name]?.name || ""}
          readOnly
        />

        {/* Hidden File Input */}
        <input
          required={required}
          className="hidden"
          type="file"
          name={name}
          id={name}
          onChange={handleFileChange}
        />
      </div>

      {/* Error Message */}
      <ErrorMessage name={name} component="p" className="text-danger" />
    </div>
  );
};

export default ImgUpload;
