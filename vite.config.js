import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite acceder desde una IP externa
    port: 5173, // o el puerto que estés usando
    allowedHosts: [
      'c465-2800-486-e7f-4060-58d9-2e3a-ec17-b2b5.ngrok-free.app' // <- tu host ngrok
    ]
  }
})
