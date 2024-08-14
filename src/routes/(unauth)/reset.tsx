import { Meta, Title } from '@solidjs/meta';
import { redirect } from '@solidjs/router';
import getIsAuthenticated from '~/auth/models/server/get-is-authenticated';
import { ResetView } from '~/auth/views';

const checkUser = async () => {
  'use server';
  const data = await getIsAuthenticated();
  if (data) {
    return redirect('/');
  }
  return { ok: true };
};
export const route = {
  load: () => checkUser,
};

export default function LoginRoute() {
  return (
    <>
      <Title>Reset password</Title>
      <Meta name="description" content="Reset password for the users app" />
      <ResetView />
    </>
  );
}
