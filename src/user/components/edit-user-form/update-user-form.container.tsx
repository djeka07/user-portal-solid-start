/* eslint-disable indent */
import { useAuth } from '~/auth/models/hooks/use-auth';
import { UserForm } from '../user-form';
import { updateUserAction } from '~/user/models/actions/update-user';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { UserResponse } from '~/user/models/services/generated/user.client';
import { Accessor, Setter, createMemo } from 'solid-js';

type UpdateUserFormContainerProps = {
  user: UserResponse;
  hideTitle?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
};

const UpdateUserFormContainer = (props: UpdateUserFormContainerProps) => {
  const [state] = useAuth();
  const [{ t }] = useI18n();
  const form = createMemo(() =>
    props.user
      ? {
          id: props.user.id,
          firstName: props.user.firstName,
          lastName: props.user.lastName,
          email: props.user.email,
          roles: props.user.roles.map((r) => r.id),
        }
      : undefined,
  );
  return (
    <UserForm
      onCancel={props.onCancel}
      onSuccess={props.onSuccess}
      successText={t('form.user.success.update')}
      submitText={t('common.button.update')}
      action={updateUserAction}
      form={form()}
      roles={state.roles}
      title={props.hideTitle ? undefined : t('form.user.title.update')}
    />
  );
};

export default UpdateUserFormContainer;
