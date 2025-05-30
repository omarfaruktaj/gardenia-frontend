import { cookies } from 'next/headers';

import { decodeJwt } from './decode-jwt';

export default async function getLoginUser() {
  const token = cookies().get('access_token');

  if (!token) {
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
