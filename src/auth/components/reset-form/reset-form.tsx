import { Button, TextInput } from '~/app/components/inputs';
import Link from '~/app/components/links/link';
import { Message } from '~/app/components/messages';

import { useSubmission } from '@solidjs/router';
import { Dictionary, useI18n } from '~/app/models/contexts/i18n.context';
import { resetAction } from '~/auth/models/actions/reset';
import { OkResponse } from '~/user/models/services/generated/user.client';
import { SchemaError } from '../../../app/helpers/schema';
import { buttonWrapper, form, link } from './reset-form.css';

const ResetForm = () => {
  const [{ t }] = useI18n();
  const state = useSubmission(resetAction);
  const error = () => state.result as SchemaError;
  return (
    <form action={resetAction} method="post" noValidate class={form}>
      <TextInput
        type="email"
        name="email"
        label={t('form.login.input.email.label')}
        placeholder={t('form.login.input.email.placeholder')}
        error={error()?.fieldErrors?.email ? `${t(error().fieldErrors?.email as keyof Dictionary)}` : undefined}
      />
      <Message show={(state.result as OkResponse)?.statusCode === 200} type="success">
        {t('form.reset.success')}
      </Message>
      <div class={buttonWrapper}>
        <Button isLoading={state.pending} type="submit">
          {t('form.reset.button')}
        </Button>
        <Link class={link} href="/login">
          {t('form.reset.link.login')}
        </Link>
      </div>
    </form>
  );
};

export default ResetForm;
