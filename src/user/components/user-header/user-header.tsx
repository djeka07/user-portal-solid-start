import { For, Show, createSignal } from 'solid-js';
import { Icon } from '~/app/components/icons';
import { Button } from '~/app/components/inputs';
import { Typography } from '~/app/components/typographies';
import { UserResponse } from '~/user/models/services/generated/user.client';

import { PanelContainer, PanelContent } from '~/app/components/panels';
import { PanelSize } from '~/app/components/panels/panel.type';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { UserActions } from './components/user-actions';
import { actionsButtonContent, icon, nameAndRolesWrapper, rolesWrapper, root } from './user-header.css';

type UserHeaderProps = {
  user: UserResponse;
  isAdmin: boolean;
  isCurrentUser: boolean;
};

const UserHeader = (props: UserHeaderProps) => {
  const [{ t }] = useI18n();
  const [showUserActions, setShowUserActions] = createSignal(false);

  return (
    <div class={root}>
      <div class={nameAndRolesWrapper}>
        <div
          class={rolesWrapper}
          title={`${t('form.user.input.roles.label')}: ${props.user.roles?.map((r) => r.name)?.join(', ')}`}
        >
          <div class={icon}>
            <Icon size="normal" color="grey600" name="User" />
          </div>
          <For each={props.user.roles} fallback={<span>No roles</span>}>
            {(item, index) => (
              <>
                {item.name}
                <Show when={index() !== props.user.roles?.length - 1}>, </Show>
              </>
            )}
          </For>
        </div>
        <Typography color="grey700" variant="h1">
          {props.user.firstName} {props.user.lastName}
        </Typography>
      </div>
      <Show when={props.isCurrentUser || props.isAdmin}>
        <Button size="small" onClick={() => setShowUserActions(true)}>
          <span class={actionsButtonContent}>
            {t('common.button.actions')}
            <Icon color="white" name="Menu" />
          </span>
        </Button>
      </Show>
      <Show when={showUserActions()}>
        <PanelContainer
          panelElementProps={{ maxWidth: PanelSize.Small, showCloseButton: true, closeOnEscape: true }}
          afterPanelClosed={() => setShowUserActions(false)}
        >
          <PanelContent title={t('common.button.actions')}>
            <UserActions user={props.user} />
          </PanelContent>
        </PanelContainer>
      </Show>
    </div>
  );
};

export default UserHeader;
