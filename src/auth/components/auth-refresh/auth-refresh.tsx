import { FetchState } from '~/app/models/types/fetch.state';
import { root, motion } from './auth-refresh.css';
import { Match, Switch, Show } from 'solid-js';
import { Spinner } from '~/app/components/spinners';
import { Typography } from '~/app/components/typographies';
import { Icon } from '~/app/components/icons';
import { Motion, Presence } from 'solid-motionone';
import { isEnter } from '~/app/helpers/keyboard';

type AuthRefresh = {
  onClose: () => void;
  show: boolean;
  state: FetchState;
};

const AuthRefresh = (props: AuthRefresh) => (
  <Presence>
    <Show when={props.show}>
      <Motion class={motion} initial={{ x: '100%' }} animate={{ x: '0px' }} exit={{ x: '100%' }}>
        <div
          tabIndex={0}
          role="button"
          onKeyDown={(e) => (isEnter(e) ? props.onClose() : undefined)}
          class={root}
          onClick={() => props.onClose()}
        >
          <Switch>
            <Match when={props.state === 'pending'}>
              <Spinner margin="no" size="small" color="dark" />
              <Typography size="small" weight="bold" color="grey700">
                Refreshing token
              </Typography>
            </Match>
            <Match when={props.state === 'ready'}>
              <Icon size="large" color="success" name="UserSuccess" />
              <Typography size="small" weight="bold" color="success">
                Token refreshed
              </Typography>
            </Match>
            <Match when={props.state === 'errored'}>
              <Spinner margin="no" size="small" color="error" />
              <Typography size="small" weight="bold" color="grey700">
                Something went wrong, logging out
              </Typography>
            </Match>
          </Switch>
        </div>
      </Motion>
    </Show>
  </Presence>
);

export default AuthRefresh;
