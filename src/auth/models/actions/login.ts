import { action } from '@solidjs/router';
import login from '../server/login';

export const loginAction = action((form) => login(form), 'login');
