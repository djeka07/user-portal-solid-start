'use server';
import { redirect } from '@solidjs/router';
import { SchemaError, validateSchema } from '~/app/helpers/schema';
import { createToken } from '~/app/helpers/token';
import { loginSchema } from '~/auth/views/login/login.schema';
import { createUserSession } from '~/db/session';
import { login } from '~/user/models/services/user.service';

export default async (form: FormData) => {
  const email = form.get('email') as string;
  const password = form.get('password') as string;
  const redirectTo = form.get('redirectTo') as string;
  const { isValid, formErrors } = validateSchema(loginSchema, { email, password });
  if (!isValid) {
    return new SchemaError('', formErrors!);
  }
  try {
    const response = await login({
      email,
      password,
      applicationId: process.env.VITE_APPLICATION_ID as string,
      url: process.env.VITE_USER_API as string,
    });
    await createUserSession(createToken(response));
  } catch (error) {
    return new SchemaError('form.login.error');
  }
  throw redirect(redirectTo);
};
