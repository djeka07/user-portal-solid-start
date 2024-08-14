import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import solidSvg from 'vite-plugin-solid-svg';

import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  vite: {
    plugins: [solidSvg({ defaultAsComponent: true }), vanillaExtractPlugin()],
  },
});
