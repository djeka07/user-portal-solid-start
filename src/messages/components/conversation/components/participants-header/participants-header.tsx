import { Show, createEffect, createMemo, createSignal } from 'solid-js';
import { UserBadges } from '~/app/components/badges';
import { Icon } from '~/app/components/icons';
import { Button } from '~/app/components/inputs';
import { PanelContainer, PanelContent } from '~/app/components/panels';
import { PanelPosition, PanelSize } from '~/app/components/panels/panel.type';
import { Typography } from '~/app/components/typographies';
import { isEmpty } from '~/app/helpers/array';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { SessionInformation } from '~/app/models/types/user.session';
import { ConversationState } from '~/messages/models/contexts/conversation.state';
import { UserResponse as UserClientResponse } from '~/user/models/services/generated/user.client';
import { ParticipantList } from '../participant-list';
import { ParticipantsNames } from '../participant-names';
import { participantsWrapper, root, status, statusWrapper, wrapper } from './participants-header.css';

type ParticipantsHeaderProps = {
  currentUser: UserClientResponse;
  conversation?: ConversationState;
  loggedInUsers: SessionInformation[];
  onBackClick: () => void;
};

const ParticipantsHeader = (props: ParticipantsHeaderProps) => {
  const [{ t }] = useI18n();
  const [showParticipantsPanel, setShowParticipantsPanel] = createSignal(false);
  const [showInformationPanel, setShowInformationPanel] = createSignal(false);
  const isConversationWithSelf = createMemo(() =>
    props.conversation?.users?.every((u) => u.userId === props.currentUser?.id),
  );
  const filteredUsers = createMemo(() =>
    isConversationWithSelf()
      ? props.conversation?.users || []
      : props.conversation?.users?.filter((u) => u?.userId !== props.currentUser?.id) || [],
  );
  const filteredUserIds = createMemo(() => filteredUsers().map((f) => f.userId));
  const anyOnline = createMemo(() =>
    props.loggedInUsers.some((u) => filteredUserIds().includes(u?.user?.userId || '')),
  );

  return (
    <>
      <div class={root}>
        <Button color="transparent" innerClass={wrapper} onClick={() => setShowParticipantsPanel(true)}>
          <UserBadges items={filteredUsers()} />
          <span class={participantsWrapper}>
            <ParticipantsNames items={filteredUsers()} conversationName={props.conversation?.conversationName} />
            <span class={statusWrapper}>
              <span
                class={status({
                  status: anyOnline() ? 'online' : undefined,
                })}
              ></span>
              <Typography as="span" variant="body" color="grey400" size="small">
                {anyOnline() ? t('messages.conversation.active') : t('messages.conversation.not-active')}
              </Typography>
            </span>
          </span>
        </Button>

        <Button color="transparent" onClick={() => setShowInformationPanel(true)}>
          <Icon name="AlertCircle" size="large" color="white" />
        </Button>
      </div>

      <Show when={showParticipantsPanel() && !isEmpty(props.conversation?.users)}>
        <PanelContainer
          afterPanelClosed={() => setShowParticipantsPanel(false)}
          panelElementProps={{
            panelPosition: PanelPosition.Center,
            showCloseButton: true,
            closeOnEscape: true,
          }}
          overlayElementProps={{ shouldCloseOnClick: true }}
        >
          <PanelContent title={t('messages.conversation.participants')} centerTitle radius="medium" background="blue">
            <ParticipantList users={props.conversation?.users!} />
          </PanelContent>
        </PanelContainer>
      </Show>
      <Show when={showInformationPanel()}>
        <PanelContainer
          afterPanelClosed={() => setShowInformationPanel(false)}
          panelElementProps={{
            panelPosition: PanelPosition.Right,
            maxWidth: PanelSize.Xsmall,
            showCloseButton: true,
            closeOnEscape: true,
          }}
          overlayElementProps={{ shouldCloseOnClick: true }}
        >
          <PanelContent background="grey">hej</PanelContent>
        </PanelContainer>
      </Show>
    </>
  );
};

export default ParticipantsHeader;
