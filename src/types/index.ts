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

export interface TDBUser {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  avatar: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface TShop {
  id: string;
  name: string;
  description: string;
  logo: string;
  ownerId: string;
  status: string;
  owner: TDBUser;
}
