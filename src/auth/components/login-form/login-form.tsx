import { useSubmission } from '@solidjs/router';
import { Button, TextInput } from '~/app/components/inputs';
import Link from '~/app/components/links/link';
import { Message } from '~/app/components/messages';
import { Dictionary, useI18n } from '~/app/models/contexts/i18n.context';
import { loginAction } from '~/auth/models/actions/login';
import { buttonWrapper, errorMessage, form, link, linkWrapper } from './login-form.css';
import { Icon } from '~/app/components/icons';

type LoginFormProps = {
  redirectTo: string | undefined;
};

const LoginForm = (props: LoginFormProps) => {
  const [{ t }] = useI18n();
  const formState = useSubmission(loginAction);
  return (
    <form action={loginAction} method="post" class={form}>
      <input type="hidden" name="redirectTo" value={props.redirectTo ?? '/'} />
      <TextInput
        type="text"
        name="email"
        autoComplete="email"
        label={t('form.login.input.email.label')}
        placeholder={t('form.login.input.email.placeholder')}
        error={
          formState?.result?.fieldErrors.email
            ? `${t(formState.result.fieldErrors.email as keyof Dictionary)}`
            : undefined
        }
      />
      <TextInput
        type="password"
        name="password"
        label={t('form.login.input.password.label')}
        autoComplete="current-password"
        placeholder={t('form.login.input.password.placeholder')}
        error={
          formState?.result?.fieldErrors.password
            ? `${t(formState?.result?.fieldErrors.password as keyof Dictionary)}`
            : undefined
        }
      />
      <Message class={errorMessage} type="error" show={!!formState?.result?.message}>
        <Icon name="AlertCircle" color="error" /> {t('form.login.error')}
      </Message>
      <div class={buttonWrapper}>
        <Button isLoading={formState.pending} type="submit">
          {t('common.button.login')}
        </Button>
        <div class={linkWrapper}>
          <Link class={link} href="/register">
            {t('form.login.link.not-a-user')}
          </Link>
          <Link class={link} href="/reset">
            {t('form.login.link.forgot')}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
