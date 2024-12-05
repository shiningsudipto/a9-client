import { Button } from "@material-tailwind/react";

interface CustomButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  variant?: "outlined" | "filled";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  type = "button",
  variant = "filled",
}) => {
  return (
    <Button
      type={type}
      fullWidth
      variant={variant}
      className={` font-medium ${
        variant === "filled"
          ? "bg-primary hover:bg-primary-500"
          : "text-secondary border-secondary font-semibold"
      } hover:shadow-none text-base capitalize`}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
