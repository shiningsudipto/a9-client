/* eslint-disable @typescript-eslint/no-explicit-any */
export type TUserRole = "USER" | "VENDOR" | "ADMIN";

export type TResponse = {
  success: boolean;
  status: number;
  message: string;
  data: any;
};

export type TErrorResponse = {
  status: number;
  data: {
    success: boolean;
    status: number;
    message: string;
  };
};
