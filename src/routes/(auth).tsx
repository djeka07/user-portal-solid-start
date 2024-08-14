import '../app/components/layout/layout.css';
import '../app/components/navigation/navigation.css';
import '../chat/components/chat.css';

import { cache, createAsync, redirect, RouteSectionProps } from '@solidjs/router';
import { lazy, Suspense } from 'solid-js';
import { PanelsRendererContainer } from '~/app/components/panels';
import { Spinner } from '~/app/components/spinners';
import { Authorization } from '~/app/helpers/token';
import getUserAndToken from '~/auth/models/server/get-user-and-token';
import { UserResponse, RoleResponse } from '~/user/models/services/generated/user.client';

const Layout = lazy(async () => {
  return import('~/app/components/layout/layout');
});

const getUsrAndToken = cache(async () => {
  'use server';
  try {
    const data = await getUserAndToken();
    if (!data?.user) {
      throw redirect('/login');
    }
    return data;
  } catch (error) {
    throw redirect('/login');
  }
}, 'gettoken');

export const route = {
  load: () => getUsrAndToken(),
};

export default function AuthLayout(props: RouteSectionProps) {
  const data = createAsync(() => getUsrAndToken());
  return (
    <Suspense
      fallback={
        <div class="loading-wrapper">
          <Spinner />
        </div>
      }
    >
      <Layout
        token={data()?.token as Authorization}
        user={data()?.user as UserResponse}
        roles={data()?.roles as RoleResponse[]}
      >
        {props.children}
      </Layout>
    </Suspense>
  );
}
