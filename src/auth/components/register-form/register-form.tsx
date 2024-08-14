import { Button, TextInput } from '~/app/components/inputs';
import Link from '~/app/components/links/link';
import { SchemaError } from '~/app/helpers/schema';

import { useSubmission } from '@solidjs/router';
import { Message } from '~/app/components/messages';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { registerAction } from '~/auth/models/actions/register';
import { OkResponse } from '~/user/models/services/generated/user.client';
import { Dictionary } from '../../../app/models/contexts/i18n.context';
import { buttonWrapper, form, inputs, link } from './register-form.css';

const ResetForm = () => {
  const [{ t }] = useI18n();
  const state = useSubmission(registerAction);

  const error = () => state?.result as SchemaError;

  return (
    <form class={form} action={registerAction} method="post" noValidate>
      <div class={inputs}>
        <TextInput
          type="email"
          name="email"
          autoComplete="email"
          label={t('form.login.input.email.label')}
          placeholder={t('form.login.input.email.placeholder')}
          error={error()?.fieldErrors?.email ? `${t(error().fieldErrors?.email as keyof Dictionary)}` : undefined}
        />
        <TextInput
          type="text"
          name="firstName"
          autoComplete="firstname"
          label={t('form.register.input.first-name.label')}
          placeholder={t('form.register.input.first-name.placeholder')}
          error={
            error()?.fieldErrors?.firstName ? `${t(error().fieldErrors?.firstName as keyof Dictionary)}` : undefined
          }
        />
        <TextInput
          type="text"
          name="lastName"
          autoComplete="lastname"
          label={t('form.register.input.last-name.label')}
          placeholder={t('form.register.input.last-name.placeholder')}
          error={error()?.fieldErrors?.lastName ? `${t(error().fieldErrors?.lastName as keyof Dictionary)}` : undefined}
        />
        <TextInput
          type="password"
          name="password"
          autoComplete="new-password"
          label={t('form.login.input.password.label')}
          placeholder={t('form.login.input.password.placeholder')}
          error={error()?.fieldErrors?.password ? `${t(error().fieldErrors?.password as keyof Dictionary)}` : undefined}
        />
        <TextInput
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          label={t('form.register.input.confirm-password.label')}
          placeholder={t('form.register.input.confirm-password.placeholder')}
          error={
            error()?.fieldErrors?.confirmPassword
              ? `${t(error().fieldErrors?.confirmPassword as keyof Dictionary)}`
              : undefined
          }
        />
      </div>
      <Message type="error" show={!!error()?.message}>
        {t('form.register.error', { requestId: error().fieldErrors?.['x-request-id'] as string })}
      </Message>

      <Message type="success" show={(state.result as OkResponse)?.statusCode === 200}>
        {t('form.register.success')}
      </Message>
      <div class={buttonWrapper}>
        <Button isLoading={false} type="submit">
          {t('form.register.button')}
        </Button>
        <Link class={link} href="/login">
          {t('form.reset.link.login')}
        </Link>
      </div>
    </form>
  );
};

export default ResetForm;
