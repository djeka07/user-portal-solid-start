import { nonempty, array, object } from 'superstruct';
import { message } from '~/app/helpers/schema';

export const usersFormSchema = object({
  users: message(nonempty(array()), 'form.user.input.users.error'),
  applicationIds: message(nonempty(array()), 'form.user.input.apps.error'),
});
