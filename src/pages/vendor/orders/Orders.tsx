import CustomTable from "../../../components/ui/CustomTable";
import { useGetOrderByVendorIdQuery } from "../../../redux/features/order";
import { useAppSelector } from "../../../redux/hooks";
import { TUser, useCurrentUser } from "../../../redux/slices/auth";
import { format } from "date-fns";
import { TOrder } from "../../../types/order.type";
import { useState } from "react";
import Pagination from "../../../components/ui/Pagination";

const tableHead = ["User", "Email", "Price", "Date", "TNX-ID"];

const Orders = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetOrderByVendorIdQuery({
    id: user?.id,
    page: currentPage,
  });
  const orderHistory = data?.data?.data as TOrder[];
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  console.log(data);

  return (
    <div className="min-h-screen">
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
      {data?.data?.meta?.page > 1 && (
        <div className="flex justify-end py-5 m-5">
          <Pagination
            active={currentPage}
            totalPages={data?.data?.meta?.page}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
