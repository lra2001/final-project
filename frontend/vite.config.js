import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const baseURL = 'http://127.0.0.1:8000'
const arrayApiTantoFaz = ['/core', '/users', '/dashboard', '/reviews']

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: Object.fromEntries(
      arrayApiTantoFaz.map((path) => [
        path,baseURL
      ])
    ),
  },
})