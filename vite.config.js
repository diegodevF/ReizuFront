import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'all', // Permite todos los hosts externos (opcional y más general)
      'cb2f-2800-486-e84-6000-2df1-45b6-ace-e13e.ngrok-free.app' // dominio ngrok específico
    ]
  }
})
