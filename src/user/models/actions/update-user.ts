import { action } from '@solidjs/router';
import updateUsersAccess from '../server/update-users-access';
import updateUser from '../server/update-user';

export const updateUserAction = action((form) => updateUser(form), 'updateUser');
export const updateAccessUsersAction = action((form) => updateUsersAccess(form), 'updateUserAccess');
