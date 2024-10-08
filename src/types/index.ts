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
  favorites: IFavorite[];
  verificationEligible: boolean;
}

export interface PostResponse {
  _id: string;
  title: string;
  content: string;
  category: string;
  images: string[];
  author: string;
  votes: number;
  premium: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum VoteType {
  Upvote = 'upvote',
  Downvote = 'downvote',
}

export interface IVotes {
  _id: string;
  post: string;
  user: string;
  voteType: VoteType;
}

export interface IComment {
  _id: string;
  post: string;
  user: string;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface CommentResponse {
  _id: string;
  post: string;
  user: UserResponse;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IFavorite {
  user: string;
  post: string;
}

export interface ISinglePost {
  _id: string;
  title: string;
  content: string;
  category: TCategory;
  comments: CommentResponse[];
  images: string[];
  author: UserResponse;
  votes: number;
  premium: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  allVotes: IVotes[];
  id: string;
}

export interface UserActivityData {
  month: string;
  year: string;
  totalUsers: number;
}

export interface PaymentData {
  month: string;
  year: string;
  totalAmount: number;
}
export interface PostData {
  month: string;
  year: string;
  count: number;
}
export interface VoteData {
  month: string;
  year: string;
  totalVotes: number;
}
