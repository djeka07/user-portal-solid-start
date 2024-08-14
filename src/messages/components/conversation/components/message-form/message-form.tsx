import { Icon } from '~/app/components/icons';
import { Button, TextArea } from '~/app/components/inputs';
import { useForm } from '~/app/models/hooks/use-form';

import messageFormSchema from './conversation.schema';
import { root } from './message-form.css';
import { useI18n } from '~/app/models/contexts/i18n.context';

export type Form = { message: string };

type MessageFormProps = {
  onSubmit: (form: Form) => Promise<void>;
  isSending: boolean;
};

export const MessageForm = (props: MessageFormProps) => {
  const [{ t }] = useI18n();
  const { update, handleSubmit, errors, get, clear } = useForm({
    initialForm: { message: '' },
    validate: messageFormSchema,
  });

  const submit = (form: Form) => {
    props.onSubmit(form);
    clear();
  };

  return (
    <form class={root} noValidate>
      <TextArea
        radius="xxlarge"
        onEnterWithoutShift={handleSubmit(submit)}
        errored={!!errors()?.message}
        value={get().message}
        boxShadow={false}
        onChange={update}
        width="full"
        name="message"
        type="text"
        placeholder={t('form.conversation.input.message.placeholder')}
      />
      <Button isLoading={props.isSending} wide={false} color="transparent" onClick={handleSubmit(submit)}>
        <Icon color="white" name="Send" />
      </Button>
    </form>
  );
};
