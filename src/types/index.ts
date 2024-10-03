export interface TUser {
  _id: string;
  name: string;
  avatar: string;
  username: string;
  email: string;
  isVerified: boolean;
  role: 'user' | 'admin';
}
