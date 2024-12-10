import { TFollower } from "../types";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Result {
  value: string;
  label: string;
}
export const transformItemsToValueAndLabel = (items: any): Result[] => {
  return items?.map((item: any) => ({
    value: item?.name,
    label: item?.name,
  }));
};

export const createOptions = (options: string[]): Result[] => {
  return options.map((option) => ({
    label: option,
    value: option, //.toLowerCase() if need to transfer in lowercase
  }));
};

export const isUserFollowingShop = (
  followers: TFollower[],
  userId: string
): boolean => {
  return followers?.some((follower) => follower?.userId === userId);
};
