import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },

  optimizeDeps: {
    include: ['./src/core/router/Router.js'],
  },
  build: {
    sourcemap: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['./src/index.js', './src/core/router/Router.js'],
        },
      },
    },
  },
});
