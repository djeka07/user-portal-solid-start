import { action } from '@solidjs/router';
import reset from '../server/reset';

export const resetAction = action((form) => reset(form), 'resetUser');
