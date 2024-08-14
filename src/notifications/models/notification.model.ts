import { NotificationEvent } from './services/generated/notification.client';

export type Notification<T = unknown> = {
  type: NotificationEvent;
  id: string;
  data: T;
};
