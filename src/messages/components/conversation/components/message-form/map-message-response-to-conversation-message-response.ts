import { ConversionMessageResponse, MessageReponse } from '~/messages/models/services/generated/message.client';

export default (response: MessageReponse): ConversionMessageResponse => ({
  createdAt: response.createdAt,
  from: response.from?.userId,
  messageId: response.messageId,
  message: response.message,
  readAt: response.readAt,
});
