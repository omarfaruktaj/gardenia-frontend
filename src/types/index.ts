export interface TUser {
  _id: string;
  name: string;
  avatar: string;
  username: string;
  email: string;
  bio?: string;
  isVerified: boolean;
  role: 'user' | 'admin';
}
export interface TUserExtended extends TUser {
  followers: string[];
  following: string[];
}

export interface TCategory {
  _id: string;
  name: string;
  description?: string | undefined;
}

export interface IPayment {
  user: TUser;
  amount: number;
  description?: string;
  transactionID: string;
  paymentProvider?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TPost {
  _id: string;
  title: string;
  content: string;
  category?: string;
  images?: string[];
  author: string;
  votes?: number;
  premium?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserResponse {
  _id: string;
  name: string;
  username: string;
  email: string;
  isVerified: boolean;
  followers: string[];
  following: string[];
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
  __v: number;
  avatar?: string;
  cover?: string;
  posts?: number;
  bio: string;
  verificationEligible: boolean;
}
