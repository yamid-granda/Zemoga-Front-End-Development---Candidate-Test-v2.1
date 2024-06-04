import { defineConfig } from 'astro/config';
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import react from "@astrojs/react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: [
        { find: '@/', replacement: path.resolve(__dirname, './') },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/styles/index" as *;
          `,
        },
      },
    },
  }
});