import { useI18n } from '~/app/models/contexts/i18n.context';
import Layout from '~/auth/components/layout/layout';
import { ResetForm } from '~/auth/components/reset-form';

const ResetView = () => {
  const [{ t }] = useI18n();
  return (
    <Layout>
      <h1>{t('form.reset.title')}</h1>
      <ResetForm />
    </Layout>
  );
};

export default ResetView;
