import vitePluginString from "vite-plugin-string";
import { defineConfig } from 'vite'


export default defineConfig({
  plugins: [vitePluginString.default()],
  base: "/ThreeJs-3DEarth-Project-Vite-React/"
});
