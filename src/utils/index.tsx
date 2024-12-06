/* eslint-disable @typescript-eslint/no-explicit-any */
interface Result {
  value: string;
  label: string;
}
export const transformItemsToNameAndValue = (items: any): Result[] => {
  return items?.map((item: any) => ({
    value: item?.name,
    label: item?.name,
  }));
};
