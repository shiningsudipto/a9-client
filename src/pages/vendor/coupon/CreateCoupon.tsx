import { useState } from "react";
import { useCreateCouponMutation } from "../../../redux/features/coupon";
import { useAppSelector } from "../../../redux/hooks";
import { TUser, useCurrentUser } from "../../../redux/slices/auth";
import CustomModal from "../../../components/ui/CustomModal";
import FormikForm from "../../../components/formik/FormikForm";
import FormikInput from "../../../components/formik/FormikInput";
import CustomButton from "../../../components/ui/CustomButton";
import { FormikValues } from "formik";
import { toast } from "sonner";
import { TErrorResponse } from "../../../types";

const CreateCoupon = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const [isCreateCouponModalOpen, setCreateCouponModalOpen] = useState(false);
  const [createCouponFunc] = useCreateCouponMutation();

  const handleCreateCoupon = async (values: FormikValues) => {
    setCreateCouponModalOpen(false);
    const toastId = toast.loading("Coupon creating please wait!");
    const data = {
      userId: user.id,
      ...values,
    };
    try {
      const res = await createCouponFunc(data).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <CustomButton
        label="Create Coupon"
        variant="filled"
        onclick={() => setCreateCouponModalOpen(true)}
      />
      <CustomModal
        open={isCreateCouponModalOpen}
        setOpen={setCreateCouponModalOpen}
        header={true}
        title="Create Coupon"
      >
        <FormikForm
          initialValues={{ code: "", expDate: "", discount: "" }}
          onSubmit={handleCreateCoupon}
        >
          <FormikInput required name="code" label="Code" />
          <FormikInput
            required
            name="expDate"
            label="Expire Date(DD-MM-YYYY)"
          />
          <FormikInput
            required
            name="discount"
            type="number"
            label="Discount"
          />
          <CustomButton label="Create" variant="filled" type="submit" />
        </FormikForm>
      </CustomModal>
    </div>
  );
};

export default CreateCoupon;
