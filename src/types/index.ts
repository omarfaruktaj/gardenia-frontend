export interface TUser {
  _id: string;
  name: string;
  avatar: string;
  username: string;
  email: string;
  isVerified: boolean;
  role: 'user' | 'admin';
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
