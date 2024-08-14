import { createUserAction } from '~/user/models/actions/create-user';
import { UserForm } from '../user-form';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { useI18n } from '~/app/models/contexts/i18n.context';

type CreateUserContainerProps = {
  onCancel?: () => void;
  onSuccess?: () => void;
};

const CreateUserFormContainer = (props: CreateUserContainerProps) => {
  const [state] = useAuth();
  const [{ t }] = useI18n();
  return (
    <UserForm
      title={t('form.user.title.create')}
      successText={t('form.user.success.create')}
      submitText={t('common.button.create')}
      action={createUserAction}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      roles={state.roles}
    />
  );
};

export default CreateUserFormContainer;
