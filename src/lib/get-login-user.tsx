import { cookies } from 'next/headers';

import { decodeJwt } from './decode-jwt';

export type UserInfo = {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  name: string;
  isVerified: boolean;
  role: string;
  exp: number;
  iat: number;
};

export default async function getLoginUser(): Promise<UserInfo | null> {
  const token = cookies().get('access_token');

  if (!token || token.value === '') {
    return null;
  }

  const userInfo = decodeJwt(token.value);

  return {
    _id: userInfo.userId,
    username: userInfo.username,
    email: userInfo.email,
    avatar: userInfo.avatar,
    name: userInfo.name,
    isVerified: userInfo.isVerified,
    role: userInfo.role,
    exp: userInfo.exp,
    iat: userInfo.iat,
  };
}
