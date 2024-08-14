import { mount, StartClient } from '@solidjs/start/client';
import { MountableElement } from 'solid-js/web';

mount(() => <StartClient />, document.getElementById('app') as MountableElement);
