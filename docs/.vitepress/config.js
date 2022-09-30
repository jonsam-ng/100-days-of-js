import { defineConfig } from "vitepress";
import head from "./config/head.config";
import themeConfig from "./config/theme.config";
import markdown from "./config/markdown.config";

export default defineConfig({
	lang: "zh-CN",
	title: "100 days of JavaScript",
	titleTemplate: false,
	description: "100 days to enhance your skills on JavaScript.",
	appearance: true,
	base: "/",
	lastUpdated: true,
	assetsInclude: ["**/*.xmind"],
	head,
	cleanUrls: "without-subfolders",
	markdown,
	themeConfig,
	pwa: {
		workboxOptions: {
			skipWaiting: true,
		},
	},
});
