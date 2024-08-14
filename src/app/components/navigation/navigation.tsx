import { Show } from 'solid-js';
import Link from '~/app/components/links/link';
import { useI18n } from '~/app/models/contexts/i18n.context';
import { logoutAction } from '~/auth/models/actions/logout';
import { UserResponse } from '~/user/models/services/generated/user.client';
import Icon from '../icons/icon';
import { Typography } from '../typographies';
import { hideLiInMobile, icon, item, li, list, logoutButton, navigation, root, truncated } from './navigation.css';

type NavigationProps = {
  currentUser: UserResponse;
  isAdmin: boolean;
};

const Navigation = (props: NavigationProps) => {
  const [{ t }] = useI18n();
  return (
    <header class={root}>
      <nav class={navigation}>
        <ul class={list}>
          <li class={li}>
            <Link title={t('common.menu.home')} class={item} href="/">
              <Icon name="Home" class={icon} />
              <Typography class={truncated} color="menu" size="xsmall">
                {t('common.menu.home')}
              </Typography>
            </Link>
          </li>
          <li class={li}>
            <Link title={t('common.menu.users')} class={item} href="/users">
              <Icon name="Users" class={icon} />
              <Typography class={truncated} color="menu" size="xsmall">
                {t('common.menu.users')}
              </Typography>
            </Link>
          </li>
          <li class={li}>
            <Link title={t('common.menu.messages')} class={item} href="/messages">
              <Icon name="Message" class={icon} />
              <Typography class={truncated} color="menu" size="xsmall">
                {t('common.menu.messages')}
              </Typography>
            </Link>
          </li>
          <li class={li}>
            <Link title={t('common.menu.profile')} class={item} href={`/users/${props.currentUser?.id}`}>
              <Icon name="User" class={icon} />
              <Typography class={truncated} color="menu" size="xsmall">
                {t('common.menu.profile')}
              </Typography>
            </Link>
          </li>
          <Show when={props.isAdmin}>
            <li class={li}>
              <Link title={t('common.menu.apps')} class={item} href="/applications">
                <Icon name="Server" class={icon} />
                <Typography class={truncated} color="menu" size="xsmall">
                  {t('common.menu.apps')}
                </Typography>
              </Link>
            </li>
          </Show>
          <Show when={props.isAdmin}>
            <li class={hideLiInMobile}>
              <Link title={t('common.menu.settings')} class={item} href="/settings">
                <Icon name="Settings" class={icon} />
                <Typography class={truncated} color="menu" size="xsmall">
                  {t('common.menu.settings')}
                </Typography>
              </Link>
            </li>
          </Show>
          <li class={li}>
            <form class={item} action={logoutAction} method="post" title={t('common.menu.logout')}>
              <button class={logoutButton} name="logout" type="submit">
                <Icon name="Logout" class={icon} />
                <Typography class={truncated} color="menu" size="xsmall">
                  {t('common.menu.logout')}
                </Typography>
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;
