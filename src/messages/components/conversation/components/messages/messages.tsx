import { createDeferred, createEffect, createMemo, createSignal, For, onCleanup, onMount, Show } from 'solid-js';
import { Spinner } from '~/app/components/spinners';
import { Typography } from '~/app/components/typographies';
import { MessageReponse, UserResponse } from '~/messages/models/services/generated/message.client';
import { UserResponse as UsrResponse } from '~/user/models/services/generated/user.client';

import debounce from 'lodash.debounce';
import { isEmpty } from '~/app/helpers/array';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { SessionInformation } from '../../../../../app/models/types/user.session';
import { Message } from '../message';
import { messages, spinnerWrapper, wrapper } from './messages.css';
import { ConversationState } from '~/messages/models/contexts/conversation.state';

type MessagesProps = {
  id: string;
  conversation?: ConversationState;
  currentUser: UsrResponse;
  loggedInUsers: SessionInformation[];
  onFetch?: () => Promise<void>;
  onMessagesRead?: (ids: string[]) => void;
};

const Messages = (props: MessagesProps) => {
  const [{ t }] = useI18n();
  let ref: HTMLDivElement | undefined;
  const [hasScrolled, setHasScrolled] = createSignal(false);
  const [messagesToSend, setMessagesToSend] = createSignal<string[]>([]);
  const unreadMessages = createMemo(
    () =>
      props.conversation?.items?.filter(
        (item) => isEmpty(item.readBy) && item.from?.userId !== props.currentUser?.id,
      ) || [],
  );
  const onScoll = () => {
    if (
      (ref?.scrollTop as number) < 500 &&
      props.conversation?.state !== 'pending' &&
      props.conversation?.hasNextPage &&
      props.conversation?.state !== 'pending-next'
    ) {
      props.onFetch?.();
    }

    // console.log(ref?.scrollTop, (ref?.scrollHeight as number) - (ref?.clientHeight as number));
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'instant') => {
    setTimeout(() => {
      ref?.scrollTo({ top: ref?.scrollHeight, left: 0, behavior });
      setHasScrolled(true);
    }, 0);
  };

  const onSend = debounce(
    () => {
      if (!isEmpty(messagesToSend())) {
        props.onMessagesRead?.(messagesToSend());
        setMessagesToSend([]);
      }
    },
    500,
    { leading: false, trailing: true },
  );

  const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setMessagesToSend((prev) => [...prev, entry.target.id]);
        observer.unobserve(entry.target);
      }
    });

    onSend();
  };

  onMount(async () => {
    if (!ref) {
      return;
    }
    scrollToBottom();
    ref.addEventListener('scroll', onScoll, { passive: true });
    return;
  });

  createEffect(() => {
    if (!ref || isEmpty(unreadMessages()) || !props.onMessagesRead) {
      return;
    }
    let observers: IntersectionObserver[] = [];
    unreadMessages().forEach((message) => {
      const element = document.getElementById(message?.messageId);
      if (element) {
        const observer = new IntersectionObserver(observerCallback, { root: ref, threshold: 1 });
        observer.observe(element);
        observers = [...observers, observer];
      }
    });

    onCleanup(() => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    });
  });

  createEffect(() => {
    if (!ref) {
      return;
    }
    if (props.id) {
      scrollToBottom();
    }
  });

  createEffect((prev: MessageReponse[] | undefined) => {
    const prevLastMessage = prev?.at(-1);
    const lastMessage = props.conversation?.items?.at(-1);
    if (prevLastMessage?.messageId !== lastMessage?.messageId && lastMessage?.from?.userId === props.currentUser?.id) {
      scrollToBottom('smooth');
    }
    return props.conversation?.items;
  });

  onCleanup(() => {
    if (!ref) {
      return;
    }
    ref.removeEventListener('scroll', onScoll);
  });
  return (
    <div class={wrapper} ref={ref}>
      <Show when={props.conversation?.state === 'pending' || props.conversation === undefined}>
        <div class={spinnerWrapper}>
          <Spinner />
        </div>
      </Show>
      <Show when={!props.conversation?.hasNextPage && props.conversation !== undefined}>
        <Typography marginBottom="medium" align="center" variant="h4">
          {t('label.start-of-conversation')}
        </Typography>
      </Show>
      <div class={messages({ show: hasScrolled() })}>
        <For each={props.conversation?.items}>
          {(s, index) => (
            <Message
              currentUser={props.currentUser}
              isGroup={props.conversation?.isGroup}
              index={index()}
              isLastMessage={(props.conversation?.items?.length || 0) - 1 === index()}
              item={s}
              users={props.conversation?.users}
            />
          )}
        </For>
      </div>
    </div>
  );
};

export default Messages;
