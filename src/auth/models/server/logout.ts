'use server';

import { redirect } from '@solidjs/router';
import { clearSession } from '~/db/session';

export default async () => {
  await clearSession();
  throw redirect('/login');
};
