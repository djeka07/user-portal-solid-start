'use server';
import { SchemaError, validateSchema } from '~/app/helpers/schema';
import { UserResponse } from '../services/generated/user.client';
import { userFormSchema } from '~/user/components/user-form/user-form.schema';
import { updateUserRequest } from '../services/user.service';
import { ApiException } from '@djeka07/fetch-service';
import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';

export default async (form: FormData): Promise<UserResponse | SchemaError> => {
  try {
    const firstName = form.get('firstName') as string;
    const lastName = form.get('lastName') as string;
    const email = form.get('email') as string;
    const id = form.get('id') as string;
    const roles = form.getAll('roles') as string[];

    const { isValid, formErrors } = validateSchema(userFormSchema, { firstName, lastName, email, roles });
    if (!isValid) {
      return new SchemaError('', formErrors!);
    }
    const token = await getOrRefreshUserToken();
    const response = await updateUserRequest({
      id,
      url: process.env.VITE_USER_API as string,
      accessToken: token?.accessToken,
      form: { email, lastName, firstName, roles: roles?.map((r) => ({ roleId: r })) || [] },
    });
    return response;
  } catch (error) {
    return new SchemaError((error as ApiException).message || 'form.user.error.create');
  }
};
