import { For } from 'solid-js';
import { UserResponse } from '~/messages/models/services/generated/message.client';

type ParticipantListProps = {
  users: UserResponse[];
};

const ParticipantList = (props: ParticipantListProps) => (
  <div>
    <For each={props.users}>{(item, index) => <div>{item.firstName}</div>}</For>
  </div>
);

export default ParticipantList;
