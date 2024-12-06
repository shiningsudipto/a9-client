/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from "formik";
import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  required?: boolean;
  multiple?: boolean;
  values: Record<string, any>; // Generic record for Formik values
  setFieldValue: (field: string, value: any) => void; // Update signature
}

const ImgUpload = ({
  name,
  required = false,
  multiple = false,
  setFieldValue,
  values,
}: InputProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle multiple files or a single file
      setFieldValue(name, multiple ? Array.from(files) : files[0]);
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

        {/* File Name or Count Display */}
        <input
          type="text"
          className="border-b border-gray-400 w-full px-3 focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-black"
          value={
            multiple
              ? `${values?.[name]?.length || 0} file(s) selected`
              : values?.[name]?.name || ""
          }
        />

        {/* Hidden File Input */}
        <input
          multiple={multiple}
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
