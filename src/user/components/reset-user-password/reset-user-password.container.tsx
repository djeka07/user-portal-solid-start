import { useAction } from '@solidjs/router';
import { Show } from 'solid-js';
import { Button } from '~/app/components/inputs';
import { resetAction } from '~/auth/models/actions/reset';
import { UserResponse } from '~/user/models/services/generated/user.client';
import { root, buttonWrapper, contentWrapper } from './reset-user-password.css';
import { Typography } from '~/app/components/typographies';
import { Icon } from '~/app/components/icons';

type ResetUserPasswordContainerProps = {
  user: UserResponse;
  onClose?: () => void;
};

const ResetUserPasswordContainer = (props: ResetUserPasswordContainerProps) => {
  const reset = useAction(resetAction);

  const resetPassword = async () => {
    const formData = new FormData();
    formData.append('email', props.user?.email);

    const response = await reset(formData);
    console.log(response);
  };

  return (
    <div class={root}>
      <Icon name="Repeat" size="large" background="white" />
      <div class={contentWrapper}>
        <Typography align="center" color="grey700" variant="h3">
          Reset password
        </Typography>
        <Typography align="center" fontStyle="italic" color="grey700" variant="label">
          Are you sure you want to reset password for {props.user.firstName} {props.user.lastName}?
        </Typography>
      </div>
      <div class={buttonWrapper}>
        <Button color="success" onClick={resetPassword}>
          Ok
        </Button>
        <Show when={props.onClose}>
          <Button color="warning" onClick={props.onClose}>
            Close
          </Button>
        </Show>
      </div>
    </div>
  );
};

export default ResetUserPasswordContainer;
