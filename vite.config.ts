import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: 'dist',  // 빌드된 파일들이 저장될 디렉토리
    rollupOptions: {
      input: {
        main: '/src/main.tsx',  // 메인 파일 지정
      },
    },
  },
})