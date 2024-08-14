'use server';
import { SchemaError, validateSchema } from '~/app/helpers/schema';
import { UserResponse } from '../services/generated/user.client';
import { toBool } from '~/app/helpers/string';
import { usersFormSchema } from '~/user/components/users-access-form/users-access-form.schema';
import { UpdateUsersAccessRequest, updateUsersAccessRequest } from '../services/user.service';
import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';

export default async (form: FormData): Promise<UserResponse[] | SchemaError> => {
  const access = toBool(form.get('access') as string);
  const users = form.getAll('users') as string[];
  const applicationIds = form.getAll('applicationIds') as string[];

  const { isValid, formErrors } = validateSchema(usersFormSchema, { users, applicationIds });
  if (!isValid) {
    return new SchemaError('', formErrors);
  }
  const token = await getOrRefreshUserToken();
  const request: UpdateUsersAccessRequest = {
    accessToken: token?.accessToken,
    url: import.meta.env.VITE_USER_API,
    form: {
      applicationIds: applicationIds,
      grantAccess: access,
      userIds: users,
    },
  };
  const response = await updateUsersAccessRequest(request);
  return response;
};
