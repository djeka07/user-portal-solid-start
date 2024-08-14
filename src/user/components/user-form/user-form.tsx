import { Action, useSubmission } from '@solidjs/router';
import { For, JSX, Match, Setter, Show, Switch, createEffect, createMemo, onCleanup } from 'solid-js';
import { Icon } from '~/app/components/icons';
import { Message } from '~/app/components/messages';
import { Typography } from '~/app/components/typographies';
import { isEmpty } from '~/app/helpers/array';
import { Button, Checkbox, TextInput } from '../../../app/components/inputs';
import { SchemaError } from '../../../app/helpers/schema';
import { Dictionary, useI18n } from '../../../app/models/contexts/i18n.context';
import { RoleResponse, UserResponse } from '../../models/services/generated/user.client';
import { buttonWrapper, error, form, root } from './user-form.css';

type Form = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  roles: string[];
};

type UserFormProps = {
  action: Action<[form: FormData], SchemaError | UserResponse>;
  roles?: RoleResponse[];
  title?: string;
  submitText: string;
  successText: string;
  form?: Form;
  onCancel?: () => void;
  onSuccess?: () => void;
};

const UserForm = (props: UserFormProps): JSX.Element => {
  const [{ t }] = useI18n();
  // eslint-disable-next-line solid/reactivity
  const state = useSubmission(props.action);
  const errors = createMemo(() => state.result as SchemaError);

  createEffect(() => {
    if (props.onSuccess && !!state.result && !errors()?.isError) {
      props.onSuccess();
    }
  });

  onCleanup(() => {
    if (state.clear) {
      state.clear();
    }
  });

  return (
    <div class={root}>
      <Show when={!!props.title}>
        <Typography weight="bold" variant="h2" color="grey700">
          {props.title}
        </Typography>
      </Show>
      <form class={form} method="post" action={props.action}>
        <TextInput
          type="text"
          value={props.form?.firstName}
          name="firstName"
          autoComplete="firstname"
          label={t('form.user.input.firstName.label')}
          placeholder={t('form.user.input.firstName.placeholder')}
          error={
            errors()?.fieldErrors?.firstName ? `${t(errors().fieldErrors.firstName as keyof Dictionary)}` : undefined
          }
        />
        <TextInput
          type="text"
          name="lastName"
          autoComplete="lastname"
          label={t('form.user.input.lastName.label')}
          placeholder={t('form.user.input.lastName.placeholder')}
          value={props.form?.lastName}
          error={
            errors()?.fieldErrors?.lastName ? `${t(errors().fieldErrors.lastName as keyof Dictionary)}` : undefined
          }
        />
        <TextInput
          type="text"
          name="email"
          autoComplete="email"
          value={props.form?.email}
          label={t('form.login.input.email.label')}
          placeholder={t('form.login.input.email.placeholder')}
          error={errors()?.fieldErrors?.email ? `${t(errors().fieldErrors.email as keyof Dictionary)}` : undefined}
        />
        <Show when={props.form?.id}>
          <input type="hidden" name="id" value={props.form?.id} />
        </Show>
        <Show when={!isEmpty(props.roles)}>
          <div>
            <Typography marginBottom="small" variant="h5" color="grey700">
              {t('form.user.input.roles.label')}
            </Typography>
            <For each={props.roles}>
              {(item) => (
                <Checkbox
                  defaultChecked={props?.form?.roles?.includes(item.id)}
                  name="roles"
                  label={item.name}
                  value={item.id}
                />
              )}
            </For>
            <Show when={!!errors()?.fieldErrors?.roles}>
              <Message class={error} type="error">
                <Icon name="AlertCircle" color="error" size="small" />
                {t(errors().fieldErrors.roles as keyof Dictionary) as string}
              </Message>
            </Show>
          </div>
        </Show>
        <Switch>
          <Match when={!state.result || errors()?.isError}>
            <div class={buttonWrapper}>
              <Button size="medium" isLoading={state.pending} type="submit">
                {props.submitText}
              </Button>
              <Show when={props.onCancel}>
                <Button size="medium" color="white" onClick={props.onCancel}>
                  {t('common.button.cancel')}
                </Button>
              </Show>
            </div>
          </Match>
          <Match when={state.result && !errors()?.isError}>
            <Message type="success">{props.successText}</Message>
          </Match>
        </Switch>
      </form>
    </div>
  );
};

export default UserForm;
