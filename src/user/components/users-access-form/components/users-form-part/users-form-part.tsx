import { For, Show, createMemo, createSignal } from 'solid-js';
import { Icon } from '~/app/components/icons';
import { Checkbox } from '~/app/components/inputs';
import { Message } from '~/app/components/messages';
import { Typography } from '~/app/components/typographies';
import { SchemaError } from '~/app/helpers/schema';
import { Dictionary, useI18n } from '~/app/models/contexts/i18n.context';
import { UsersResponse } from '~/user/models/services/generated/user.client';
import { message, selectAllCheckbox } from './users-form-part.css';

type UsersFormPartProps = {
  users: UsersResponse;
  errors?: SchemaError;
};

const UsersFormPart = (props: UsersFormPartProps) => {
  const [{ t }] = useI18n();
  const [selectAll, setSelectAll] = createSignal(false);
  const toggleCheckAll = () => setSelectAll((prev) => !prev);
  const hasUsers = createMemo(() => props.users.total > 0);

  return (
    <>
      <Typography marginBottom="small" color="grey700" variant="h3">
        {hasUsers() ? 'Choose users' : 'No users'}
      </Typography>
      <Show when={hasUsers()}>
        <Checkbox
          name="select-all"
          class={selectAllCheckbox}
          label={selectAll() ? 'Unselect all' : 'Select all'}
          onChange={toggleCheckAll}
        />
      </Show>
      <ul>
        <For each={props.users.users}>
          {(user) => (
            <li>
              <Checkbox
                defaultChecked={selectAll()}
                value={user.id}
                name="users"
                label={`${user.firstName} ${user.lastName}`}
              />
            </li>
          )}
        </For>
      </ul>
      <Message margin={{ bottom: 4 }} class={message} show={!!props.errors?.fieldErrors?.users} type="error">
        <Icon name="AlertCircle" color="error" />
        {t(props.errors?.fieldErrors?.users as keyof Dictionary) as string}
      </Message>
    </>
  );
};

export default UsersFormPart;
