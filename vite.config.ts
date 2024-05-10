import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import basicSsl from '@vitejs/plugin-basic-ssl'
import fs from 'fs';
// https://vitejs.dev/config/
export default defineConfig({
  
  server: {
    proxy: {
      '/api': {
        target: 'http://120.79.55.90:8090', // 要代理的目标地址
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
      }
    },
    // https: true,
    // https: {
    //   key: fs.readFileSync('./.cert/key.pem'),
    //   cert: fs.readFileSync('./.cert/cert.pem'),
    // },
    host: '0.0.0.0',
  },
  plugins: [react(), nodePolyfills()],
  base: ((process.env.GITHUB_REPOSITORY ?? "") + "/").match(/(\/.*)/)?.[1],
});
