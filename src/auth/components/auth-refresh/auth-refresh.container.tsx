import { createSignal, onCleanup, onMount } from 'solid-js';
import { createDate } from '~/app/helpers/date';
import { ProgressState } from '~/app/models/types/fetch.state';

import { useLocation, useNavigate } from '@solidjs/router';
import { Authorization } from '~/app/helpers/token';
import { useAuth } from '~/auth/models/hooks/use-auth';
import refreshAuthentication from '~/auth/models/server/refresh-authentication';
import AuthRefresh from './auth-refresh';

const AuthRefreshContainer = () => {
  const route = useNavigate();
  const location = useLocation();
  const [state, { updateToken }] = useAuth();
  let interval: NodeJS.Timeout;
  const [progress, setProgress] = createSignal<ProgressState<{ show: boolean }>>({
    state: 'initial',
    data: { show: false },
  });

  const refreshToken = async (token: string) => {
    try {
      setProgress((prev) => ({ ...prev, state: 'pending', data: { show: true } }));
      const response = await refreshAuthentication(token);
      if (!(response as Authorization)?.accessToken) {
        throw new Error('Could not refresh token');
      }
      updateToken(response as Authorization);
      setProgress((prev) => ({ ...prev, state: 'ready' }));
      setTimeout(() => {
        setProgress((prev) => ({ ...prev, data: { show: false } }));
      }, 3000);
    } catch (error) {
      setProgress((prev) => ({ ...prev, state: 'errored' }));
      setTimeout(() => {
        route(`/login?forcedLoggedOut=true&redirectTo=${location.pathname}`);
      }, 1000);
    }
  };

  onMount(async () => {
    interval = setInterval(
      async () => {
        const expires = createDate(state.token?.expires).subtract(
          parseInt(import.meta.env.VITE_AUTH_SUBSTRACT_MS, 10),
          'milliseconds',
        );
        if (createDate().isAfter(expires)) {
          await refreshToken(state.token!.refreshToken);
        }
      },
      parseInt(import.meta.env.VITE_AUTH_CHECK_INTERVAL_MS, 10),
    );
  });

  onCleanup(() => clearInterval(interval));

  return (
    <AuthRefresh
      state={progress().state}
      show={progress().data?.show || false}
      onClose={() => setProgress((p) => ({ ...p, data: { show: false } }))}
    />
  );
};

export default AuthRefreshContainer;
