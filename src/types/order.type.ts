import { TProduct, TUserDB } from ".";

export interface TUserReview {
  id: string;
  userId: string;
  shopId: string;
  total: number;
  status: string;
  transactionId: string;
  createdAt: string;
  items: TOrderItem[];
}

export interface TOrderItem {
  id: string;
  orderId: string;
  productId: string;
  userId: string;
  quantity: number;
  price: number;
  reviewed: boolean;
  product: TProduct;
}

export interface TOrder {
  id: string;
  userId: string;
  shopId: string;
  total: number;
  status: string;
  transactionId: string;
  createdAt: string;
  user: TUserDB;
}
