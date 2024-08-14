import { useI18n } from '~/app/models/contexts/i18n.context';
import Layout from '~/auth/components/layout/layout';
import { RegisterForm } from '~/auth/components/register-form';

const RegisterView = () => {
  const [{ t }] = useI18n();
  return (
    <Layout>
      <h1>{t('form.register.title')}</h1>
      <RegisterForm />
    </Layout>
  );
};

export default RegisterView;
