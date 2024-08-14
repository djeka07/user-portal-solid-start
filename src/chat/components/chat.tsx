import { createSignal, Index, Show } from 'solid-js';
import { css } from '~/app/helpers/class';
import { Authorization } from '~/app/helpers/token';
import { root, heading, username, online, list, listWrapper, noUsers } from './chat.css';
import { small } from '../../app/styles/svg.css';
import { UserResponse } from '~/user/models/services/generated/user.client';
import { Icon } from '~/app/components/icons';
import { createDate } from '~/app/helpers/date';
import { SessionInformation } from '~/app/models/types/user.session';

type ChatProps = {
  user: UserResponse;
  token: Authorization;
  loggedInUsers: SessionInformation[];
};

const Chat = (props: ChatProps) => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div
      style={{
        height: isOpen() ? '30vh' : '40px',
      }}
      class={root}
    >
      <div class={css(username)} onClick={() => setIsOpen((open) => !open)}>
        {props.user?.firstName} {props.user?.lastName}
        <Show when={!isOpen()} fallback={<Icon name="Down" class={small} />}>
          <Icon name="Up" class={small} />
        </Show>
      </div>
      <Show when={isOpen()}>
        <div class={listWrapper}>
          <h4 class={heading}>Users online</h4>
          <ul class={list}>
            <Index fallback={<li class={noUsers}>No users online</li>} each={props.loggedInUsers}>
              {(item) => (
                <li class={online}>
                  {item()?.user?.firstName} {createDate(item()?.lastActive)?.format('d')}
                </li>
              )}
            </Index>
          </ul>
        </div>
      </Show>
    </div>
  );
};

export default Chat;
