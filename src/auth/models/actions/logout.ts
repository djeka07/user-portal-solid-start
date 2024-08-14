import { action } from '@solidjs/router';
import logout from '../server/logout';

export const logoutAction = action(() => logout(), 'logoutUser');
