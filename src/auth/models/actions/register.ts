import { action } from '@solidjs/router';
import register from '../server/register';

export const registerAction = action((form) => register(form), 'registerUser');
