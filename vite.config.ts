import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [tsconfigPaths(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/@sanity\/.*/, /node_modules/],
    },
  },
  optimizeDeps: {
    include: ['@sanity/client', '@sanity/image-url'],
    force: true,
  },
  ssr: {
    noExternal: ['@sanity/client', '@sanity/image-url'],
  },
}));
