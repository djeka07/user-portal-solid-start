import { Meta, Title } from '@solidjs/meta';
import { cache, redirect, useSearchParams } from '@solidjs/router';
import getIsAuthenticated from '~/auth/models/server/get-is-authenticated';
import { LoginView } from '~/auth/views';

const checkUser = cache(async () => {
  'use server';
  const data = await getIsAuthenticated();
  if (data) {
    throw redirect('/');
  }
  return { ok: true };
}, 'checkuser');

export const route = {
  load: () => checkUser(),
};

export default function LoginRoute() {
  const [searchParams] = useSearchParams();

  return (
    <>
      <Title>Login</Title>
      <Meta name="description" content="Login to the users app" />
      <LoginView redirectTo={searchParams?.redirectTo} />
    </>
  );
}
