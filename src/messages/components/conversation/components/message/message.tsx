import { createDate, formatDate } from '~/app/helpers/date';
import { MessageReponse, UserResponse as MsgUserResponse } from '~/messages/models/services/generated/message.client';
import { UserResponse } from '~/user/models/services/generated/user.client';
import { badge, badgeMessageWrapper, message, messageWrapper, userWrapper } from './message.css';
import { Typography } from '~/app/components/typographies';
import { For, Show, createSignal } from 'solid-js';
import { UserBadge } from '~/app/components/badges';
import { isEmpty } from '~/app/helpers/array';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { PanelContainer, PanelContent } from '~/app/components/panels';
import { PanelPosition, PanelSize } from '~/app/components/panels/panel.type';

type MessageProps = {
  item: MessageReponse;
  currentUser: UserResponse;
  users?: MsgUserResponse[];
  isGroup?: boolean;
  index: number;
  isLastMessage: boolean;
};

const Message = (props: MessageProps) => {
  const [{ t }] = useI18n();
  const [showReadPanel, setShowReadPanel] = createSignal(false);
  return (
    <>
      <Typography align="center" color="grey500" size="xsmall">
        {createDate(props.item.createdAt).format('lll')}
      </Typography>
      <div
        class={messageWrapper({ user: props.item?.from?.userId === props.currentUser.id ? 'current' : undefined })}
        id={props.index === 0 ? 'fetchRef' : undefined}
      >
        <Show when={props.item?.from?.userId !== props.currentUser?.id && (props.users?.length || 0) > 2}>
          <Typography color="grey500" size="xsmall">
            {props.item.from.firstName}
          </Typography>
        </Show>
        <div class={badgeMessageWrapper}>
          <Show when={props.item.from?.userId !== props?.currentUser?.id}>
            <UserBadge class={badge} user={props.item.from} />
          </Show>
          <div
            id={props.item.messageId}
            class={message({ user: props.item.from?.userId === props.currentUser?.id ? 'current' : undefined })}
          >
            {props.item.message}
          </div>
        </div>
        <Show when={props.isLastMessage && !isEmpty(props.item?.readBy)}>
          <div
            class={userWrapper({ isGroup: props.isGroup })}
            onClick={props.isGroup ? () => setShowReadPanel(true) : undefined}
          >
            <For each={props.item?.readBy}>
              {(user) => (
                <UserBadge
                  text={t('messages.conversation.seen-by-text', {
                    name: user?.user?.firstName,
                    date: formatDate(createDate(user?.readAt)),
                  })}
                  size="small"
                  user={user?.user}
                />
              )}
            </For>
          </div>
        </Show>
      </div>
      <Show when={showReadPanel()}>
        <PanelContainer
          afterPanelClosed={() => setShowReadPanel(false)}
          overlayElementProps={{ shouldCloseOnClick: true }}
          panelElementProps={{
            showCloseButton: true,
            closeOnEscape: true,
            panelPosition: PanelPosition.Center,
            maxWidth: PanelSize.Small,
          }}
        >
          <PanelContent background="blue" title={t('messages.conversation.seen-by')} centerTitle>
            Hej
          </PanelContent>
        </PanelContainer>
      </Show>
    </>
  );
};

export default Message;
