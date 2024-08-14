import { object, refine, string } from 'superstruct';
import { isEmail } from '~/app/helpers/email';

export default object({
  email: refine(string(), 'email-validation', (value) => {
    if (!value) {
      return 'form.login.input.email.error.empty';
    }
    return isEmail(value) ? true : 'form.login.input.email.error.not-valid';
  }),
});
