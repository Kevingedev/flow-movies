// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import icon from 'astro-icon';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["significance-surprised-think-lightning.trycloudflare.com"]
    }
  },

  integrations: [react(), icon()],

  adapter: node({
    mode: 'standalone'
  })
});