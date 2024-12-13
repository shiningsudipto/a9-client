import CustomTable from "../../../components/ui/CustomTable";
import { useGetOrderByUserIdQuery } from "../../../redux/features/order";
import { useAppSelector } from "../../../redux/hooks";
import { TUser, useCurrentUser } from "../../../redux/slices/auth";
import { TUserReview } from "../../../types/order.type";
import { format } from "date-fns";

const tableHead = ["Name", "Price", "Date", "Quantity", "TNX-ID"];

const UserOrders = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data } = useGetOrderByUserIdQuery(user?.id);
  const orderHistory = data?.data as TUserReview[];
  return (
    <div>
      <CustomTable tableHead={tableHead} label="Order History">
        {orderHistory?.map((item) => {
          return (
            <tr key={item?.id}>
              <td className="px-5 py-3 border">
                {item?.items?.map((productItem, index) => (
                  <p>
                    <span>{index + 1}/ </span>
                    {productItem?.product?.name}
                  </p>
                ))}
              </td>
              <td className="px-5 py-3 border">{item?.total}</td>
              <td className="px-5 py-3 border ">
                {format(new Date(item?.createdAt), "dd-MM-yyyy, HH:mm")}
              </td>
              <td className="px-5 py-3 border">{item?.items?.length}</td>
              <td className="px-5 py-3 border">{item?.transactionId}</td>
            </tr>
          );
        })}
      </CustomTable>
    </div>
  );
};

export default UserOrders;
