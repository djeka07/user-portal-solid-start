import { APIEvent } from '@solidjs/start/server';
import { createToken } from '~/app/helpers/token';
import { getSession } from '~/db/session';
import { refresh } from '~/user/models/services/user.service';

export async function PUT({ params }: APIEvent) {
  const session = await getSession();
  try {
    const response = await refresh({ token: params.token, url: process.env.VITE_USER_API as string });
    session?.update((d) => {
      d.token = createToken(response);
      return d;
    });
    return new Response('', { status: 500 });
  } catch (error) {
    session?.update((d) => {
      d.token = undefined;
      d.userId = undefined;
      return d;
    });
    return new Response('', {
      status: 500,
    });
  }
}
