import { Switch, Match, For, createSignal, Show, createMemo } from 'solid-js';
import { Motion, Presence } from 'solid-motionone';
import { PillInput } from '~/app/components/inputs';
import { TextEvent } from '~/app/components/inputs/text-input/text-input';
import { Spinner } from '~/app/components/spinners';
import { ProgressState } from '~/app/models/types/fetch.state';
import { UserResponse, UsersResponse } from '~/user/models/services/generated/user.client';
import { pillWrapper, popupContent, root, user } from './user-pill-input.css';
import { Typography } from '~/app/components/typographies';
import { UserBadge } from '~/app/components/badges';
import { clickOutside } from '~/app/directives/on-click-outside';
import { isEnter } from '~/app/helpers/keyboard';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const d = clickOutside;

type UserPillInputProps = {
  onInputChange: (val: string) => Promise<void>;
  onUserClick: (user: UserResponse) => Promise<void>;
  onDelete: (id: string) => void;
  state: ProgressState<UsersResponse>;
  pills: { id: string; label: string }[];
};

const UserPillInput = (props: UserPillInputProps) => {
  let ref: HTMLInputElement | undefined;
  const [focus, setFocus] = createSignal(false);
  const [value, setValue] = createSignal<string>('');
  const pillsIds = createMemo(() => props.pills.map((p) => p.id));
  const filteredUsers = createMemo(() => props.state.data?.users?.filter((u) => !pillsIds()?.includes(u.id)));

  const onInputChange = (e: TextEvent) => {
    const { value: val } = e.currentTarget;
    setValue(val);
    props.onInputChange(val);
  };

  const onUserClick = (user: UserResponse) => {
    setValue('');
    props.onUserClick(user);
    ref?.focus();
  };
  return (
    <div class={root} use:clickOutside={() => setFocus(false)}>
      <PillInput
        ref={ref}
        pills={props.pills}
        wrapperClass={pillWrapper}
        type="text"
        value={value()}
        onDeletePill={props.onDelete}
        onFocus={() => setFocus(true)}
        onChange={onInputChange}
        name="to"
        label="To:"
      />
      <Presence>
        <Show when={focus()}>
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div class={popupContent}>
              <Switch fallback={<Spinner />}>
                <Match when={props.state.state === 'initial'}>
                  <Typography weight="bold" color="light">
                    Type to search users
                  </Typography>
                </Match>
                <Match when={props.state.state === 'ready'}>
                  <For each={filteredUsers()}>
                    {(item) => (
                      <div
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => (isEnter(e) ? onUserClick(item) : undefined)}
                        class={user}
                        onClick={[onUserClick, item]}
                      >
                        <UserBadge user={item} />
                        <span>
                          {item.firstName} {item.lastName}
                        </span>
                      </div>
                    )}
                  </For>
                </Match>
              </Switch>
            </div>
          </Motion.div>
        </Show>
      </Presence>
    </div>
  );
};

export default UserPillInput;
