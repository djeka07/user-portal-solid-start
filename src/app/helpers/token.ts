import { Token } from '~/user/models/services/generated/user.client';
import { createDate } from './date';

export type Authorization = {
  accessToken: string;
  refreshToken: string;
  expires: number;
};

export const createToken = (token: Token): Authorization => ({
  accessToken: `${token?.type} ${token?.accessToken}`,
  refreshToken: token?.refreshToken,
  expires: createDate().add(token?.expiresIn, 'seconds').valueOf(),
});
