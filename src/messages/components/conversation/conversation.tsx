import { MessageFormContainer } from './components/message-form';
import { MessagesContainer } from './components/messages';
import { ParticipantsHeaderContainer } from './components/participants-header';
import { wrapper } from './conversion.css';

type ConversationProps = {
  id: string;
};

const Conversation = (props: ConversationProps) => {
  return (
    <div class={wrapper}>
      <ParticipantsHeaderContainer id={props.id} />
      <MessagesContainer id={props.id} />
      <MessageFormContainer id={props.id} />
    </div>
  );
};

export default Conversation;
