import { defineConfig } from 'vite';
// import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  // really? I have to install path?
  // resolve: {
  //   alias: {
  //     '/@/': path.resolve(__dirname, './src'),
  //   },
  // },
});
