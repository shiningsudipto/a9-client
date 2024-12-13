import CustomTable from "../../../components/ui/CustomTable";
import { useGetOrderByVendorIdQuery } from "../../../redux/features/order";
import { useAppSelector } from "../../../redux/hooks";
import { TUser, useCurrentUser } from "../../../redux/slices/auth";
import { format } from "date-fns";
import { TOrder } from "../../../types/order.type";

const tableHead = ["User", "Email", "Price", "Date", "TNX-ID"];

const Orders = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data } = useGetOrderByVendorIdQuery(user?.id);
  const orderHistory = data?.data as TOrder[];
  return (
    <div>
      <CustomTable tableHead={tableHead} label="Order History">
        {orderHistory?.map((item) => {
          return (
            <tr key={item?.id}>
              <td className="px-5 py-3 border">{item.user.name}</td>
              <td className="px-5 py-3 border">{item.user.email}</td>
              <td className="px-5 py-3 border">{item?.total}</td>
              <td className="px-5 py-3 border ">
                {format(new Date(item?.createdAt), "dd-MM-yyyy, HH:mm")}
              </td>
              <td className="px-5 py-3 border">{item?.transactionId}</td>
            </tr>
          );
        })}
      </CustomTable>
    </div>
  );
};

export default Orders;
