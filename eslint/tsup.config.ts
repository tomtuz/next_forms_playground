import * as path from 'path'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./run.ts'],
  format: ['esm'],
  platform: 'node',
  sourcemap: true,
  dts: true,
  splitting: false,
  clean: true,
  esbuildOptions(options) {
    options.alias = {
      '@': path.resolve(__dirname, '.')
    }
  },
})

