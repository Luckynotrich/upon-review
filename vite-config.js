import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import axios from 'axios'

export const getConfigs = async () => {
  try {
    console.log(await axios.get("http://localhost:8081/api/v1/configurations")) // "http://localhost:3000/api/v1/configurations"
  } catch (e) {
    console.log(e)
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src',
  server: {
     port: 5173,//following from proxy config: rewrite: (path) = path.replace(/^\/api/, "/api")
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
        // configure: (proxy, _options) => {
        //   proxy.on('error', (err, _req, _res) => {
        //     console.log('proxy error', err);
        //   });
        //   proxy.on('proxyReq', (proxyReq, req, _res) => {
        //     console.log('Sending Request to the Target:', req.method, req.url);
        //   });
        //   proxy.on('proxyRes', (proxyRes, req, _res) => {
        //     console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
        //   });
        // },
      
    }
  },
})