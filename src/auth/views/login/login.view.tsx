import { Component } from 'solid-js';
import Layout from '~/auth/components/layout/layout';

import { useI18n } from '~/app/models/contexts/i18n.context';
import { LoginForm } from '~/auth/components/login-form';

type LoginViewProps = {
  redirectTo: string | undefined;
};

const LoginView: Component<LoginViewProps> = (props: LoginViewProps) => {
  const [{ t }] = useI18n();
  return (
    <Layout>
      <h1>{t('form.login.title')}</h1>
      <LoginForm redirectTo={props.redirectTo} />
    </Layout>
  );
};

export default LoginView;
