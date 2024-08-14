import { object, nonempty, string } from 'superstruct';
import { message } from '~/app/helpers/schema';

export default object({
  message: message(nonempty(string()), 'form.register.input.first-name.error.empty'),
});
