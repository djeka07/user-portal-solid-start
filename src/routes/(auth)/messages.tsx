import { RouteSectionProps } from '@solidjs/router';
import { AsideLayout } from '~/app/components/layout';
import { ConversationListContainer } from '~/messages/components/conversation-list';
import { ConversationsProvider } from '~/messages/models/contexts/conversations.context';

export default (props: RouteSectionProps) => (
  <ConversationsProvider id={props.params.id}>
    <AsideLayout
      location={props.location}
      params={props.params}
      title="Messages"
      asideRender={<ConversationListContainer />}
    >
      {props.children}
    </AsideLayout>
  </ConversationsProvider>
);
