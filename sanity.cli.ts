import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'fe6bomwn',
    dataset: 'production'
  },
  vite: {
    build: {
      commonjsOptions: {
        include: [/@sanity\/.*/, /node_modules/],
      },
      rollupOptions: {
        output: {
          manualChunks: {
            sanity: ['@sanity/client', '@sanity/image-url'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['@sanity/client', '@sanity/image-url'],
    },
  }
})