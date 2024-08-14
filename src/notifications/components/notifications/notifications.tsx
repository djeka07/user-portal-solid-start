import { For, Match, Show, Switch } from 'solid-js';
import { Portal } from 'solid-js/web';
import { Notification } from '~/notifications/models/notification.model';
import { NotificationEvent, UserResponse } from '~/notifications/models/services/generated/notification.client';

import { UserLoggedInNotification } from './components/user-logged-in-notification';
import { root } from './notifications.css';
import { MessageNotification } from './components/message-notification';
import { MessageReponse } from '~/messages/models/services/generated/message.client';
import { isEmpty } from '~/app/helpers/array';
import { Motion, Presence } from 'solid-motionone';

type NotificationsProps = {
  notifications: Notification[];
  onDelete: (id: string) => void;
};

const Notifications = (props: NotificationsProps) => (
  <Portal>
    <div class={root}>
      <Presence>
        <Show when={!isEmpty(props.notifications)}>
          <Motion initial={{ x: '200px' }} animate={{ x: '0px' }} exit={{ x: '200px' }}>
            <For each={props.notifications}>
              {(item) => (
                <Switch>
                  <Match when={item.type === NotificationEvent.USER_LOGGED_IN}>
                    <UserLoggedInNotification
                      notification={item as Notification<UserResponse>}
                      onDelete={props.onDelete}
                    />
                  </Match>
                  <Match when={item.type === NotificationEvent.MESSAGE}>
                    <MessageNotification
                      notification={item as Notification<MessageReponse>}
                      onDelete={props.onDelete}
                    />
                  </Match>
                </Switch>
              )}
            </For>
          </Motion>
        </Show>
      </Presence>
    </div>
  </Portal>
);

export default Notifications;
