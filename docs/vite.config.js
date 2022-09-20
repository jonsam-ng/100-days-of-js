import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { SearchPlugin } from "vitepress-plugin-search";

export default defineConfig({
	plugins: [VitePWA(), SearchPlugin()],
	define: {},
});
