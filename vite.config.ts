import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
      // name: 'DynamicForm',
      // fileName: (format) => `dynamic-form.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
  plugins: [react(), libInjectCss(), dts({ include: ['src'] })]
})