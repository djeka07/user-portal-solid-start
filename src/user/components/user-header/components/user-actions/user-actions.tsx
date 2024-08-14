import { Match, Show, Switch, createMemo, createSignal } from 'solid-js';
import { ActionButton } from '~/app/components/inputs';
import { PanelContainer, PanelContent } from '~/app/components/panels';
import { PanelSize } from '~/app/components/panels/panel.type';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { UpdateUserFormContainer } from '~/user/components/edit-user-form';
import { ResetUserPasswordContainer } from '~/user/components/reset-user-password';
import { UserResponse } from '~/user/models/services/generated/user.client';
import { root } from './user-actions.css';

type Actions = undefined | 'edit' | 'reset-password';

type UserActionsProps = {
  user: UserResponse;
};

const UserActions = (props: UserActionsProps) => {
  const [{ t }] = useI18n();
  const [selectedAction, setSelectedAction] = createSignal<Actions>();
  let inputRef: HTMLInputElement | undefined;

  return (
    <>
      <div class={root}>
        <ActionButton
          iconName="Edit"
          onClick={() => setSelectedAction('edit')}
          description={t('users.user-view.actions.edit.text')}
        >
          {t('users.user-view.actions.edit.title')}
        </ActionButton>
        <ActionButton
          iconName="Repeat"
          onClick={() => setSelectedAction('reset-password')}
          description={t('users.user-view.actions.reset.text')}
        >
          {t('users.user-view.actions.reset.title')}
        </ActionButton>
      </div>
      <Show when={!!selectedAction()}>
        <PanelContainer
          afterPanelClosed={() => setSelectedAction(undefined)}
          panelElementProps={{
            maxWidth: PanelSize.Xsmall,
            closeOnEscape: true,
          }}
        >
          {(panelProps) => (
            <Switch>
              <Match when={selectedAction() === 'edit'}>
                <PanelContent title={t('form.user.title.update')}>
                  <UpdateUserFormContainer
                    user={props.user}
                    hideTitle
                    onCancel={() => panelProps.closePanel()}
                    onSuccess={() => setTimeout(() => panelProps.closePanel(), 1000)}
                  />
                </PanelContent>
              </Match>
              <Match when={selectedAction() === 'reset-password'}>
                <PanelContent background="grey" centerContent>
                  <ResetUserPasswordContainer user={props.user} onClose={panelProps.closePanel} />
                </PanelContent>
              </Match>
            </Switch>
          )}
        </PanelContainer>
      </Show>
    </>
  );
};

export default UserActions;
