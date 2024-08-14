import { RouteSectionProps } from '@solidjs/router';
import MessageView from '../../../messages/views/message/message.view';

export default (props: RouteSectionProps) => {
  return <MessageView location={props.location} params={props.params} />;
};
