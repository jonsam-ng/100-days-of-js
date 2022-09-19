import { defineConfig } from "vitepress";

const themeConfig = {
	logo: "/logo/favicon-16x16.png",
	siteTitle: "100 days of JavaScript",
	nav: [
		// { text: "Guide", link: "/guide" },
		{
			text: "Dropdown Menu",
			items: [
				{ text: "Item A", link: "/item-1" },
				{ text: "Item B", link: "/item-2" },
				{ text: "Item C", link: "/item-3" },
			],
		},
	],
	sidebar: [
		{
			text: "Guide",
			items: [
				{ text: "Introduction", link: "/introduction" },
				{ text: "Getting Started", link: "/getting-started" },
			],
		},
	],
	socialLinks: [{ icon: "github", link: "https://github.com/jonsam-ng" }],
	footer: {
		message: "Released under the MIT License.",
		copyright: "Copyright © 2022-present Jonsam NG",
	},
	editLink: {
		pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
		text: "Edit this page on GitHub",
	},
	themeConfig: {
		lastUpdatedText: "最近更新",
	},
	docFooter: {
		// prev: "Pagina prior",
		// next: "Proxima pagina",
	},
};

export default defineConfig({
	lang: "zh-CN",
	title: "100 days of JavaScript",
	titleTemplate: false,
	description: "100 days to enhance your skills on JavaScript.",
	appearance: true,
	base: "/100-day-of-js-enhance/",
	lastUpdated: true,
	head: [
		["link", { rel: "shortcut icon", href: "/logo/favicon.ico", sizes: "any" }],
	],
	cleanUrls: "with-subfolders",
	markdown: {
		theme: "material-palenight",
		lineNumbers: true,
	},
	themeConfig,
});
