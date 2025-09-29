import {defineCliConfig} from 'sanity/cli'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineCliConfig({
  api: {
    projectId: 'fe6bomwn',
    dataset: 'production'
  },
  vite: (viteConfig) => ({
    ...viteConfig,
    plugins: [tsconfigPaths(), ...viteConfig.plugins],
    build: {
      commonjsOptions: {
        include: [/@sanity\/.*/, /node_modules/],
      },
      rollupOptions: {
        input: {
          main: './index.html'
        },
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
  })
})