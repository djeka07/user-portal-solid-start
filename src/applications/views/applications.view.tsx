import { Title } from '@solidjs/meta';
import { root } from './applications.view.css';
import { createEffect, createResource } from 'solid-js';
import { fetchApplications } from '../models/services/app.service';
import getOrRefreshUserToken from '~/auth/models/server/get-or-refresh-user-token';

const f = async () => {
  'use server';
  const userTokens = await getOrRefreshUserToken();
  const response = await fetchApplications({
    accessToken: userTokens!.accessToken,
    page: 1,
    take: 10,
    url: import.meta.env.VITE_USER_API,
  });
  return response;
};

const ApplicationsView = () => {
  const [data] = createResource(f);

  createEffect(() => {
    console.log(data());
  });

  return (
    <div class={root}>
      <Title>Applications</Title>
      <h1>Applications</h1>
    </div>
  );
};

export default ApplicationsView;
