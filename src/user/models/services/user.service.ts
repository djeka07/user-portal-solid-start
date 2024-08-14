import createHeaders from '~/app/models/create-headers';
import {
  GetApplicationsResponse,
  OkResponse,
  RegisterRequest,
  RoleResponse,
  Token,
  UpdateUsersAccessRequest as UpdateUsersAccessReq,
  UserRequest,
  UserResponse,
  UsersResponse,
} from './generated/user.client';
import { fetch } from '@djeka07/fetch-service';

export type LoginRequestModel = {
  username: string;
};

type Request = {
  url: string;
};

type RefreshRequest = Request & {
  token: string;
};

export type ResetRequest = Request & {
  email: string;
  applicationId: string;
};

export type LoginBody = {
  email: string;
  password: string;
  applicationId: string;
};

export type GetSelfRequest = Request & {
  accessToken?: string;
};

export type CreateUserRequest = GetSelfRequest & {
  form: UserRequest;
};

export type UpdateUserRequest = GetSelfRequest & {
  id: string;
  form: UserRequest;
};

export type UpdateUsersAccessRequest = GetSelfRequest & {
  form: UpdateUsersAccessReq;
};

export type FetchUserByIdRequest = GetSelfRequest & {
  id: string;
};

export type FetchUsersRequest = GetSelfRequest & {
  page: number;
  take: number;
  filter?: { hasGrantedAccess?: boolean; roleIds?: string[] };
};

export type SearchUsersRequest = GetSelfRequest & {
  page: number;
  take: number;
  query?: string;
};

export type FetchApplicationsRequestParams = GetSelfRequest & {
  page: number;
  take: number;
};

export const login = ({ email, password, applicationId, url }: LoginBody & Request): Promise<Token> => {
  const headers = createHeaders();
  return fetch({ method: 'POST', url, path: '/api/v1/auth', headers, body: { email, password, applicationId } });
};

export const refresh = ({ token, url }: RefreshRequest): Promise<Token> => {
  const headers = createHeaders();
  return fetch({ method: 'PUT', url, path: `/api/v1/auth/${token}`, headers });
};

export const register = ({ url, ...rest }: RegisterRequest & Request): Promise<OkResponse> => {
  const headers = createHeaders();
  return fetch({ method: 'POST', headers, url, path: '/api/v1/auth/register', body: rest });
};

export const reset = ({ url, ...rest }: ResetRequest): Promise<OkResponse> => {
  const headers = createHeaders();
  return fetch({ method: 'PUT', headers, url, path: '/api/v1/auth/resets', body: rest });
};

export const getSelf = async ({ accessToken, url }: GetSelfRequest): Promise<UserResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ headers, url, path: '/api/v1/selfs' });
};

export const fetchUsers = async ({
  accessToken,
  url,
  page,
  take,
  filter,
}: FetchUsersRequest): Promise<UsersResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ headers, url, path: '/api/v1/users', query: { page, take, filter: JSON.stringify(filter) } });
};

export const searchUsers = async ({
  accessToken,
  page,
  take,
  url,
  query,
}: SearchUsersRequest): Promise<UsersResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ headers, url, path: '/api/v1/users/search', query: { page, take, query: query || '' } });
};

export const createUser = async ({ accessToken, form, url }: CreateUserRequest): Promise<UserResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ headers, url, method: 'POST', path: '/api/v1/users', body: form });
};

export const updateUserRequest = async ({ accessToken, form, url, id }: UpdateUserRequest): Promise<UserResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ headers, url, method: 'PUT', path: `/api/v1/users/${id}`, body: form });
};

export const updateUsersAccessRequest = async ({
  accessToken,
  form,
  url,
}: UpdateUsersAccessRequest): Promise<UserResponse[]> => {
  const headers = createHeaders({ accessToken });
  return fetch({ headers, url, method: 'PUT', path: '/api/v1/users/access', body: form });
};

export const fetchUserById = async ({ accessToken, url, id }: FetchUserByIdRequest): Promise<UserResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ headers, url, path: `/api/v1/users/${id}` });
};

export const fetchRoles = async ({ accessToken, url }: GetSelfRequest): Promise<RoleResponse[]> => {
  const headers = createHeaders({ accessToken });
  return fetch({ headers, url, path: '/api/v1/roles' });
};

export const fetchApplications = async ({
  accessToken,
  url,
  page,
  take,
}: FetchApplicationsRequestParams): Promise<GetApplicationsResponse> => {
  const headers = createHeaders({ accessToken });
  return fetch({ headers, url, path: '/api/v1/applications', query: { page, take } });
};
