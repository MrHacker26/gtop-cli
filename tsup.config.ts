import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'],
  outDir: 'dist',
  minify: true,
  target: 'esnext',
  format: ['esm'],
  shims: true,
})
