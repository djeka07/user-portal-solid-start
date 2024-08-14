import { Action, useSubmission } from '@solidjs/router';
import { JSX, Match, Resource, Switch, createEffect, createMemo } from 'solid-js';
import { SchemaError } from '~/app/helpers/schema';
import {
  AppResponse,
  GetApplicationsResponse,
  UserResponse,
  UsersResponse,
} from '~/user/models/services/generated/user.client';
import { UsersFormPart } from './components/users-form-part';
import { ApplicationFormPart } from './components/applications-form-part';
import { buttonWrapper } from './users-access-form.css';
import { Button } from '~/app/components/inputs';
import { useI18n } from '~/app/models/contexts/i18n.context';

type UserAccessListProps = {
  data: Resource<UsersResponse | undefined>;
  appData: Resource<GetApplicationsResponse>;
  defaultAction: Action<[form: FormData], SchemaError | UserResponse[]>;
  onSuccess: () => void;
};

const UserAccessForm = (props: UserAccessListProps): JSX.Element => {
  const [{ t }] = useI18n();
  const state = useSubmission(props.defaultAction);
  const errors = createMemo(() => state.result as SchemaError);

  createEffect(() => {
    if (state.result && !errors().isError) {
      props.onSuccess();
    }
  });

  return (
    <div>
      <form action={props.defaultAction} method="post">
        <input type="hidden" name="access" value="true" />
        <Switch fallback={<div>Loading applications</div>}>
          <Match when={props.appData.state === 'ready'}>
            <ApplicationFormPart applications={props.appData()?.applications as AppResponse[]} errors={errors()} />
          </Match>
        </Switch>
        <Switch fallback={<div>Loading users</div>}>
          <Match when={props.data.state === 'ready'}>
            <UsersFormPart errors={errors()} users={props.data() as UsersResponse} />
          </Match>
        </Switch>
        <div class={buttonWrapper}>
          <Button size="small" disabled={(props?.data()?.total || 0) === 0} type="submit">
            {t('common.button.update')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserAccessForm;
