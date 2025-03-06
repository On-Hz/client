import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    // 엔트리 파일과 청크 파일 이름을 고정
    rollupOptions: {
      output: {
        // 엔트리 파일의 이름을 'index.js'로 고정
        entryFileNames: 'index.js',
        // 청크 파일의 이름을 고정 (필요시 수정)
        chunkFileNames: 'assets/[name].js',
      }
    }
  }
})