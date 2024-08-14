import { Show, createSignal } from 'solid-js';
import { Icon } from '~/app/components/icons';
import { Button } from '~/app/components/inputs';
import { PanelContainer, PanelContent } from '~/app/components/panels';
import { PanelSize } from '~/app/components/panels/panel.type';
import { Typography } from '~/app/components/typographies';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { CreateUserFormContainer } from '../create-user-form';
import { root, wrapper } from './create-user-item.css';

const CreateUserItem = () => {
  const [{ t }] = useI18n();
  const [show, setShow] = createSignal(false);
  return (
    <>
      <div class={root}>
        <div class={wrapper}>
          <Icon color="grey700" size="xxlarge" name="UserPlus" />
          <Typography color="grey700" variant="h3">
            {t('form.user.title.create')}
          </Typography>
          <Button color="light" onClick={() => setShow(true)}>
            {t('common.button.create')}
          </Button>
        </div>
      </div>
      <Show when={show()}>
        <PanelContainer panelElementProps={{ maxWidth: PanelSize.Small }} afterPanelClosed={() => setShow(false)}>
          {(props) => (
            <PanelContent>
              <CreateUserFormContainer onSuccess={() => props.closePanel()} onCancel={() => props.closePanel()} />
            </PanelContent>
          )}
        </PanelContainer>
      </Show>
    </>
  );
};

export default CreateUserItem;
