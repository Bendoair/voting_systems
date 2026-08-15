import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow ngrok (and similar) tunnels during local sharing
    allowedHosts: ['.ngrok-free.app', '.ngrok.io'],
  },
})
