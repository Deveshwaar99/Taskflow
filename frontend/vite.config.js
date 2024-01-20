import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    // Specify the port for the build output
    outDir: 'dist',
    assetsDir: '.',
    port: 8080, // Example port for the build output
  },
  server: {
    port: 3000, // Specify the port for the development server
  },
})
