import { ReactNode } from "react";

const CustomTable = ({
  tableHead,
  label,
  children,
}: {
  tableHead: string[];
  label?: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <div className="p-5 m-5 bg-white">
        {label && <h3 className="text-xl font-bold mb-5">{label}</h3>}
        <table className="table-fixed w-full ">
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
