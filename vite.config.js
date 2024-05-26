import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  ,
  server:{
    proxy:{
      '/api':{ //取得path中包含/api的Request
        target:'http://localhost:4090',
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/,'') //將/api換成''
      }
    }
  }
})
