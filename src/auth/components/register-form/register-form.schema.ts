/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable max-len */
import { object, nonempty, string, refine } from 'superstruct';
import { isEmail } from '~/app/helpers/email';
import { message } from '~/app/helpers/schema';

export default object({
  email: refine(string(), 'email-validation', (value) => {
    if (!value) {
      return 'form.login.input.email.error.empty';
    }
    return isEmail(value) ? true : 'form.login.input.email.error.not-valid';
  }),

  firstName: message(nonempty(string()), 'form.register.input.first-name.error.empty'),
  lastName: message(nonempty(string()), 'form.register.input.last-name.error.empty'),
  password: message(nonempty(string()), 'form.login.input.password.error.empty'),
  confirmPassword: message(nonempty(string()), 'form.register.input.confirm-password.error.empty'),
});
