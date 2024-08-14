import { action } from '@solidjs/router';
import createUser from '../server/create-user';

export const createUserAction = action((form) => createUser(form), 'createUser');
