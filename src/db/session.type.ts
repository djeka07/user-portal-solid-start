import { Authorization } from '~/app/helpers/token';
import { RoleResponse, UserResponse } from '~/user/models/services/generated/user.client';

export type GetTokenResponse = { user: UserResponse; token: Authorization; roles: RoleResponse[] };

export type SessionData = {
  userId?: string;
  token?: Authorization;
};
