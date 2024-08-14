import { nonempty, object, refine, string, array } from 'superstruct';
import { isEmail } from '~/app/helpers/email';
import { message } from '~/app/helpers/schema';

export const userFormSchema = object({
  email: refine(nonempty(string()), 'email-validation', (value) => {
    if (!value) {
      return 'form.login.input.email.error.empty';
    }
    return isEmail(value) ? true : 'form.login.input.email.error.not-valid';
  }),
  firstName: message(nonempty(string()), 'form.login.input.password.error.empty'),
  lastName: message(nonempty(string()), 'form.login.input.password.error.empty'),
  roles: message(nonempty(array()), 'form.user.error.roles'),
});
