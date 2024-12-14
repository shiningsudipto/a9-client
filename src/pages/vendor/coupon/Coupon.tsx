import CustomTable from "../../../components/ui/CustomTable";
import { useGetAllCouponQuery } from "../../../redux/features/coupon";
import { TCoupon } from "../../../types";
import CreateCoupon from "./CreateCoupon";

const tableHead = ["Code", "Discount", "Exp Date"];

const Coupon = () => {
  const { data } = useGetAllCouponQuery("");
  const couponData = data?.data as TCoupon[];
  return (
    <div>
      <div className="flex justify-end m-5">
        <CreateCoupon />
      </div>
      <CustomTable tableHead={tableHead} label="Order History">
        {couponData?.map((item) => {
          return (
            <tr key={item?.id}>
              <td className="px-5 py-3 border">{item?.code}</td>
              <td className="px-5 py-3 border">{item?.discount}</td>
              <td className="px-5 py-3 border">{item?.expDate}</td>
            </tr>
          );
        })}
      </CustomTable>
    </div>
  );
};

export default Coupon;
