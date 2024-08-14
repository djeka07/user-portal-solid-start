import { ConversationState } from './conversation.state';
export default (partial?: Partial<ConversationState>): ConversationState => ({
  isGroup: false,
  users: [],
  conversationName: undefined,
  hasNextPage: false,
  isFetching: false,
  isFetchingNext: false,
  isSending: false,
  items: [],
  page: 1,
  total: 0,
  ...(partial || {}),
});
