import { Meta, Title } from '@solidjs/meta';
import { redirect } from '@solidjs/router';
import getIsAuthenticated from '~/auth/models/server/get-is-authenticated';
import { RegisterView } from '~/auth/views';

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

export default function RegisterRoute() {
  return (
    <>
      <Title>Register</Title>
      <Meta name="description" content="Register a account to the users app" />
      <RegisterView />
    </>
  );
}
