'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export const getCurrentUser = async () => {
  const accessToken = cookies().get('access_token')?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken?.userId,
      username: decodedToken?.avatar,
      avatar: decodedToken?.avatar,
      name: decodedToken?.name,
      isVerified: decodedToken?.isVerified,
      role: decodedToken?.role,
    };
  }

  return decodedToken;
};
