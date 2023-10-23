import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: ['.js', '.ts', '.json', ".tsx"] // 导入时想要省略的扩展名列表
  },
  server: {
    open: true
  },
})
