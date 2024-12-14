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

export interface TProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  discount: number;
  category: string;
  flashSale: boolean;
  images: string[];
  shopId: string;
}
export interface TProductWithShop {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  discount: number;
  category: string;
  flashSale: boolean;
  images: string[];
  shopId: string;
  shop: TShopWithoutOwner;
}

export interface TShopWithoutOwner {
  id: string;
  name: string;
  description: string;
  logo: string;
  ownerId: string;
  status: string;
  owner: string;
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
// review
export interface TReview {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  reply: string | null;
  createdAt: string;
  user: TReviewUser;
  product: TReviewProduct;
}

export interface TReviewUser {
  name: string;
  email: string;
}

export interface TReviewProduct {
  name: string;
  shop: TReviewShop;
}

export interface TReviewShop {
  name: string;
}

export type TFollower = {
  id: string;
  userId: string;
  shopId: string;
};

export interface TReview {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface TCategory {
  id: string;
  name: string;
  createdAt: string;
}

export interface TUserDB {
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

export interface TCoupon {
  id: string;
  code: string;
  discount: number;
  expDate: string;
  userId: string;
  createdAt: string;
}
