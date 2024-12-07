import { ReactNode } from "react";

const CustomTable = ({
  tableHead,
  children,
}: {
  tableHead: string[];
  children: ReactNode;
}) => {
  return (
    <div>
      <div className="p-5 ">
        <table className="table-fixed w-full bg-white">
          <thead className="bg-white border">
            <tr>
              {tableHead?.map((head: string, index: number) => (
                <th key={index} className="border border-gray-300 py-4">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
