import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // 모든 네트워크 인터페이스에서 접근 가능하도록 설정
    port: 5173, // 포트 번호를 5173으로 설정
    strictPort: true, // 포트 충돌이 발생하면 에러를 발생시키도록 설정
  },
  plugins: [react()],
})
