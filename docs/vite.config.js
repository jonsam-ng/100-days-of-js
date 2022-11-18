import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { SearchPlugin } from "vitepress-plugin-search";
import { ExportBuildInfo } from "@vitue/export-build-info";

export default defineConfig({
	plugins: [
		VitePWA(),
		SearchPlugin({
			cache: true,
			context: true,
		}),
		ExportBuildInfo({
			fileName: "build-info",
			extend: {},
		}),
	],
	define: {},
});
