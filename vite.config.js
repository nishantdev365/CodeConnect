import { defineConfig } from 'vite';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [
    nodeResolve(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        socket: path.resolve(__dirname, 'src', 'socket.js'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  define: {
    'process.env.REACT_APP_BACKEND_URL': JSON.stringify('http://localhost:5000'),
  },
});
