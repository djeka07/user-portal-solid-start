import { For } from 'solid-js';
import { Typography } from '~/app/components/typographies';
import { UserResponse } from '~/messages/models/services/generated/message.client';
import { participants } from './participants-names.css';

type ParticipantsProps = {
  conversationName?: string;
  items: UserResponse[];
};

const ParticipantsName = (props: ParticipantsProps) => (
  <span class={participants}>
    {props.conversationName ? (
      <Typography as="span" variant="body" size="small">
        {props.conversationName}
      </Typography>
    ) : (
      <For each={props.items}>
        {(user, index) => (
          <Typography as="span" variant="body" size="small">
            {`${user.firstName}${index() === props.items.length - 1 ? '' : ', '}`}
          </Typography>
        )}
      </For>
    )}
  </span>
);

export default ParticipantsName;
