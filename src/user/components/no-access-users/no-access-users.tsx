import { Match, Show, Switch } from 'solid-js';
import { Spinner } from '~/app/components/spinners';
import { Typography } from '~/app/components/typographies';
import { ProgressState } from '~/app/models/types/fetch.state';
import { UsersResponse } from '~/user/models/services/generated/user.client';
import { root, userWrapper, wrapper, usersCount, buttonWrapper, textWrapper } from './no-access-users.css';
import { Icon } from '~/app/components/icons';
import { Button } from '~/app/components/inputs';
import { Skeleton } from '~/app/components/lists';
import { useNavigate } from '@solidjs/router';
import { useI18n } from '~/app/models/contexts/i18n.context';

type NoAccessUsersProps = {
  state: ProgressState<UsersResponse>;
};

const NoAccessUsers = (props: NoAccessUsersProps) => {
  const [{ t }] = useI18n();
  const navigate = useNavigate();
  return (
    <div class={root}>
      <div class={wrapper}>
        <Icon color="grey700" size="xxlarge" name="Users" />
      </div>
      <div class={userWrapper}>
        <Switch fallback={<Spinner margin="no" size="small" color="dark" />}>
          <Match when={props.state?.state === 'ready'}>
            <span class={usersCount}>{props.state.data?.total}</span>
          </Match>
          <Match when={props.state?.state === 'errored'}>Something went wrong</Match>
        </Switch>
        <Typography color="grey700" variant="h3">
          {t('users.users-view.users')}
        </Typography>
      </div>
      <div class={textWrapper}>
        <Typography marginTop="small" size="small" align="center" color="grey600" fontStyle="italic" variant="body">
          <Show when={props.state?.state === 'ready'} fallback={<Skeleton height="20px" amount={1} />}>
            {t('users.users-view.waiting-text', { count: `${props.state.data?.total}` })}
          </Show>
        </Typography>
      </div>
      <div class={buttonWrapper}>
        <Button
          disabled={(props.state.data?.total || 0) === 0}
          wide
          color="light"
          onClick={() => navigate('/users/access')}
        >
          {t('users.users-view.give-access')}
        </Button>
      </div>
    </div>
  );
};

export default NoAccessUsers;
