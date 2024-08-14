import { Title } from '@solidjs/meta';
import { Typography } from '~/app/components/typographies';
import { UserAccessFormContainer } from '~/user/components/users-access-form';
import { content, header } from './users-access.css';
import { useI18n } from '~/app/models/contexts/i18n.context';

const UsersAccessView = () => {
  const [{ t }] = useI18n();
  return (
    <div>
      <Title>{t('users.access.title')}</Title>
      <div class={header}>
        <Typography color="grey700" variant="h1">
          {t('users.access.title')}
        </Typography>
      </div>
      <div class={content}>
        <UserAccessFormContainer />
      </div>
    </div>
  );
};

export default UsersAccessView;
