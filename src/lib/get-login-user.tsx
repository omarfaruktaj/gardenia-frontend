import { cookies } from 'next/headers';

import { decodeJwt } from './decode-jwt';

export default async function getLoginUser() {
  const token = cookies().get('access_token');

  if (!token) {
    return null;
  }

  return decodeJwt(token.value);
}
