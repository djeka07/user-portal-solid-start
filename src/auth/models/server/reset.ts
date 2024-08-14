'use server';

import { ErrorResponse } from '@djeka07/fetch-service';
import { SchemaError, validateSchema } from '~/app/helpers/schema';
import resetFormSchema from '~/auth/components/reset-form/reset-form.schema';
import { ResetRequest, reset } from '~/user/models/services/user.service';

export default async (form: FormData) => {
  const email = form.get('email') as string;
  const { isValid, formErrors } = validateSchema(resetFormSchema, { email });

  if (!isValid) {
    return new SchemaError('', formErrors);
  }

  try {
    const request: ResetRequest = {
      applicationId: import.meta.env.VITE_APPLICATION_ID,
      email,
      url: import.meta.env.VITE_USER_API,
    };
    const result = await reset(request);
    return result;
  } catch (error) {
    const errorResponse = error as ErrorResponse;
    return new SchemaError('Could not reset', { ...(errorResponse || {}) });
  }
};
