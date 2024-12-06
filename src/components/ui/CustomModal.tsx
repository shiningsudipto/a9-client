import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ReactNode, FC } from "react";

interface CustomModalProps {
  title?: string;
  onClick?: () => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  header?: boolean;
  footer?: boolean;
  scroll?: boolean;
  children: ReactNode;
}

const CustomModal: FC<CustomModalProps> = ({
  title,
  open = false,
  setOpen,
  header = false,
  footer = false,
  scroll = false,
  onClick,
  children,
}) => {
  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <Dialog open={open} handler={handleOpen}>
        {header && <DialogHeader className="px-5">{title}</DialogHeader>}
        <DialogBody
          className={`${scroll && "max-h-[95vh] overflow-y-scroll"} p-5`}
        >
          {children}
        </DialogBody>
        {footer && (
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              type="submit"
              onClick={onClick}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        )}
      </Dialog>
    </div>
  );
};

export default CustomModal;
