import { For, createSignal } from 'solid-js';
import { Checkbox } from '~/app/components/inputs';
import { Message } from '~/app/components/messages';
import { Typography } from '~/app/components/typographies';
import { SchemaError } from '~/app/helpers/schema';
import { Dictionary, useI18n } from '~/app/models/contexts/i18n.context';
import { GetApplicationsResponse } from '~/user/models/services/generated/user.client';
import { message } from './applications-form-part.css';
import { Icon } from '~/app/components/icons';
import { selectAllCheckbox } from '../users-form-part/users-form-part.css';

type ApplicationFormPartProps = {
  applications: GetApplicationsResponse['applications'];
  errors?: SchemaError;
};

const ApplicationFormPart = (props: ApplicationFormPartProps) => {
  const [{ t }] = useI18n();
  const [selectAll, setSelectAll] = createSignal(false);
  const toggleCheckAll = () => setSelectAll((prev) => !prev);
  return (
    <>
      <Typography marginBottom="small" color="grey700" variant="h3">
        Choose applications
      </Typography>
      <Checkbox
        name="select-all"
        class={selectAllCheckbox}
        label={selectAll() ? 'Unselect all' : 'Select all'}
        onChange={toggleCheckAll}
      />
      <ul>
        <For each={props.applications}>
          {(item) => (
            <li>
              <Checkbox name="applicationIds" defaultChecked={selectAll()} label={item.appName} value={item.appId} />
            </li>
          )}
        </For>
      </ul>
      <Message margin={{ bottom: 8 }} class={message} type="error" show={!!props.errors?.fieldErrors?.applicationIds}>
        <Icon name="AlertCircle" color="error" />
        {t(props.errors?.fieldErrors?.applicationIds as keyof Dictionary) as string}
      </Message>
    </>
  );
};
export default ApplicationFormPart;
