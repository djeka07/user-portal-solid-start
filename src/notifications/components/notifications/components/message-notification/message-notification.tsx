import { Icon } from '~/app/components/icons';
import Link from '~/app/components/links/link';
import { Typography } from '~/app/components/typographies';
import { subString } from '~/app/helpers/string';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { MessageReponse } from '~/messages/models/services/generated/message.client';
import { Notification } from '~/notifications/models/notification.model';
import { icon, item } from '../../notifications.css';
import { link } from './message-notification.css';

type UserLoggedInNotificationProps = {
  notification: Notification<MessageReponse>;
  onDelete: (id: string) => void;
};

const MessageNotification = (props: UserLoggedInNotificationProps) => {
  const [{ t }] = useI18n();
  const onDelete = () => {
    props.onDelete(props?.notification?.id);
  };

  return (
    <div class={item}>
      <div>
        <Typography variant="body" size="normal">
          {t('common.notification.new-message.title', {
            firstName: props.notification?.data?.from?.firstName,
          })}
        </Typography>
        <Typography variant="body" size="small">
          {subString(props.notification.data.message, 20)}
        </Typography>
        <Link href={`/messages/${props.notification.data.conversationId}`} onClick={onDelete} class={link}>
          Gå till
        </Link>
      </div>
      <Icon size="normal" class={icon} name="Close" onClick={onDelete} />
    </div>
  );
};

export default MessageNotification;
