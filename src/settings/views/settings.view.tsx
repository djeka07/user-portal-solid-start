import { Typography } from '~/app/components/typographies';
import { item, root, header } from './settings.view.css';
import { For, createSignal } from 'solid-js';
import { Button } from '~/app/components/inputs';

const SettingsView = () => {
  const [showOriginal, setShowOriginal] = createSignal(false);
  const metas = import.meta.env || {};
  return (
    <div class={root}>
      <div class={header}>
        <Typography color="grey700" variant="h1">
          Settings
        </Typography>
        <Button size="small" onClick={() => setShowOriginal((orginal) => !orginal)}>
          {showOriginal() ? 'Show pretty' : 'Show original'}
        </Button>
      </div>
      <For each={Object.keys(metas).filter((key) => key.startsWith('VITE_'))}>
        {(key) => (
          <div class={item}>
            <span>{showOriginal() ? key : key?.replace('VITE_', '')?.replaceAll('_', ' ')}</span>
            <span>{metas?.[key as keyof ImportMetaEnv]}</span>
          </div>
        )}
      </For>
    </div>
  );
};

export default SettingsView;
