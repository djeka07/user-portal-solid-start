import { Notification } from '~/notifications/models/notification.model';
import { item, icon } from '../../notifications.css';
import { Icon } from '~/app/components/icons';
import { UserResponse } from '~/notifications/models/services/generated/notification.client';
import { Typography } from '~/app/components/typographies';
import { useI18n } from '~/app/models/contexts/i18n.context';

type UserLoggedInNotificationProps = {
  notification: Notification<UserResponse>;
  onDelete: (id: string) => void;
};

const UserLoggedInNotification = (props: UserLoggedInNotificationProps) => {
  const [{ t }] = useI18n();
  const onDelete = () => {
    props.onDelete(props?.notification?.id);
  };

  return (
    <div class={item}>
      <div>
        <Typography variant="body" size="normal">
          {t('common.notification.user-logged-in.title', {
            firstName: props.notification?.data?.firstName,
            lastName: props?.notification?.data?.lastName,
          })}
        </Typography>
      </div>
      <Icon size="large" class={icon} name="Close" onClick={onDelete} />
    </div>
  );
};

export default UserLoggedInNotification;
