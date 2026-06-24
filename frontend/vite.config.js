import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  envDir: path.resolve(__dirname, '..'),
  server: {
    host: true,
    allowedHosts: ['.ngrok-free.app', '.ngrok.io', '.ngrok.app'],
    proxy: {
      '/api': { target: 'http://localhost:3001', changeOrigin: true },
      '/uploads': { target: 'http://localhost:3001', changeOrigin: true },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/logo.png', 'assets/eye-icon.png'],
      manifest: {
        name: 'Wizklub Teacher Upload',
        short_name: 'WizKlub',
        description: 'Teacher media upload dashboard for school review categories',
        theme_color: '#F97316',
        background_color: '#fcf9f8',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/assets/logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/assets/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
})
