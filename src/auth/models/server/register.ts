'use server';

import { ApiException } from '@djeka07/fetch-service';
import { tryParse } from '~/app/helpers/json';
import { SchemaError, validateSchema } from '~/app/helpers/schema';
import registerFormSchema from '~/auth/components/register-form/register-form.schema';
import { register } from '~/user/models/services/user.service';

export default async (formData: FormData) => {
  const form = {
    email: formData.get('email') as string,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };

  const { isValid, formErrors } = validateSchema(registerFormSchema, form);
  if (!isValid) {
    return new SchemaError('', formErrors);
  }

  try {
    const submit = await register({ ...form, url: import.meta.env.VITE_USER_API as string });
    return submit;
  } catch (error) {
    if (error instanceof ApiException) {
      const errorResponse = error as ApiException;
      return new SchemaError('form.register.error', tryParse(errorResponse.response));
    }
  }
};
