import { defineConfig } from 'vite';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [
    nodeResolve(),
  ],
  build: {
    define: {
      'process.env.MY_APP_ENTRY': JSON.stringify('./src/main.js') // <-- update this line
    }
  },
  define: {
    'process.env.REACT_APP_BACKEND_URL': JSON.stringify('http://localhost:5000'),
  },
});
