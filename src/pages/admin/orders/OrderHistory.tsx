import { format } from "date-fns";
import CustomTable from "../../../components/ui/CustomTable";
import { useGetAllOrderQuery } from "../../../redux/features/order";
import { TOrder } from "../../../types/order.type";

const tableHead = ["User", "Email", "Price", "Date", "TNX-ID"];

const OrderHistory = () => {
  const { data } = useGetAllOrderQuery("");
  const orderHistory = data?.data as TOrder[];
  return (
    <div>
      <CustomTable tableHead={tableHead} label="Order History">
        {orderHistory?.length === 0 ? (
          <p>No order yet</p>
        ) : (
          orderHistory?.map((item) => {
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
          })
        )}
      </CustomTable>
    </div>
  );
};

export default OrderHistory;
