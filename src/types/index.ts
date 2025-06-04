export interface TUser {
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

export interface TCategory {
  _id: string;
  name: string;
  description?: string | undefined;
}
export interface TCategoryResponse {
  _id: string;
  name: string;
  description?: string | undefined;
  createdAt: string;
  updatedAt: string;
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

export interface Pagination {
  page?: number;
  totalPage?: number;
  limit?: number;
  next?: number;
  prev?: number;
  total?: number;
  pageParam: number;
}
export interface QueryString {
  searchTerm?: string;
  page?: string;
  sort?: string;
  limit?: number;
  fields?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
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
}

export interface LoggedInUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  name: string;
  isVerified: boolean;
  role: string;
  exp: number;
  iat: number;
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

export type Favorite = {
  _id: string;
  user: string;
  post: ISinglePost;
  createdAt: string;
  updatedAt: string;
};

export type CommentsArray = Comment[];
