import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
      port: 8080,
      open: true,
      host: true, // allows for external device connection on local network
      proxy: {
         // prevent CORS error in dev when backend and frontend servers run on different ports
         '^/api/.*': {
            target: 'http://localhost:8000',
            changeOrigin: true,
         },
      }
   }
})
