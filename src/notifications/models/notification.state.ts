import { createSignal } from 'solid-js';
import { Notification } from './notification.model';

export const [notifications, setNotifications] = createSignal<Notification[]>([]);
