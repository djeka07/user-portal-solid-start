import { object, string, nonempty, refine } from 'superstruct';
import { isEmail } from '~/app/helpers/email';
import { message } from '~/app/helpers/schema';

export const loginSchema = object({
  email: refine(string(), 'email-validation', (value) => {
    if (!value) {
      return 'form.login.input.email.error.empty';
    }
    return isEmail(value) ? true : 'form.login.input.email.error.not-valid';
  }),
  password: message(nonempty(string()), 'form.login.input.password.error.empty'),
});
