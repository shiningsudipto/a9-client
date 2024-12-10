import CustomButton from "../../components/ui/CustomButton";
import CustomTable from "../../components/ui/CustomTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearComparison,
  selectComparison,
} from "../../redux/slices/comparison";

const tableHead = ["Name", "Category", "Price", "Discount", "Review"];

const Comparison = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(selectComparison);
  return (
    <div className="section-gap-xy">
      {products?.length === 0 ? (
        <p className="text-xl font-bold">
          There is no selected products for comparison
        </p>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Comparison</h2>
            <div>
              <CustomButton
                label="Clear all"
                onclick={() => dispatch(clearComparison())}
              />
            </div>
          </div>
          <CustomTable tableHead={tableHead}>
            {products?.map((item) => {
              return (
                <tr key={item?.id}>
                  <td className="px-5 py-3 border">{item?.name}</td>
                  <td className="px-5 py-3 border">{item?.category}</td>
                  <td className="px-5 py-3 border">{item?.price}</td>
                  <td className="px-5 py-3 border">{item?.discount}</td>
                  <td className="px-5 py-3 border">{item?.rating}</td>
                </tr>
              );
            })}
          </CustomTable>
        </div>
      )}
    </div>
  );
};

export default Comparison;
