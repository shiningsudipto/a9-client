import { Card, Typography } from "@material-tailwind/react";
import { useDeleteProductMutation } from "../../../redux/features/product";
import { TResponse } from "../../../types";
import { toast } from "sonner";

const TABLE_HEAD = ["Name", "Price", "Stock", "Category", "Actions"];
const ProductTable = ({ TABLE_ROWS }) => {
  const [deleteProduct] = useDeleteProductMutation();
  const handleProductDelete = async (id: string) => {
    const toastId = toast.loading("Product deleting please wait!");
    const res = (await deleteProduct({ id: id }).unwrap()) as TResponse;
    toast.success(res.message, { id: toastId, duration: 2000 });
  };
  return (
    <div>
      <Card className="h-full w-full overflow-scroll px-6">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="">
              {TABLE_HEAD?.map((head) => (
                <th key={head} className="border-b border-gray-300 pb-4 pt-10">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS?.map(({ name, price, stock, category, id }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

              return (
                <tr key={name} className="hover:bg-gray-50">
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {price}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {stock}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {category}
                    </Typography>
                  </td>
                  <td className={`${classes} max-w-[150px]`}>
                    <div className="flex items-center gap-10">
                      <button>Edit</button>
                      <button onClick={() => handleProductDelete(id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ProductTable;
