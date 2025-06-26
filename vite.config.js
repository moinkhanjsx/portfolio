import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable tree shaking and code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'vendor-react': ['react', 'react-dom'],
          'vendor-aos': ['aos'],
          // Component chunks for lazy loading
          'components': [
            './src/components/PreviewModal.jsx',
            './src/components/HoverPreview.jsx',
            './src/components/ProjectFilters.jsx'
          ]
        }
      }
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging
    sourcemap: false,
    // Minimize bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    }
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: false
    }
  },
  // Configure path resolution
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components'
    }
  }
})
