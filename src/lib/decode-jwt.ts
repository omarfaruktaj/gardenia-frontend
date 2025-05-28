import { jwtDecode } from 'jwt-decode';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function decodeJwt(token: string): Record<string, any> {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    throw new Error('Invalid JWT token');
  }
}
