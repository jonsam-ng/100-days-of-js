import { defineConfig } from "vitepress";
import AutoNavPlugin from "vitepress-auto-nav-sidebar";

const { sidebar, nav } = AutoNavPlugin({
	ignoreFolders: ["node_modules", "assets", "public", ".vitepress", "utils"],
	ignoreFiles: ["index"],
	showSideIcon: true,
	dirPrefix: "📂 ",
	filePrefix: "📃 ",
	isCollapse: true,
	collapsed: false,
});

const themeConfig = {
	logo: "/logo/favicon-16x16.png",
	siteTitle: "100 days of JavaScript",
	nav: [
		...nav,
		{
			text: "更多",
			items: [
				{ text: "源码阅读", link: "https://source.jonsam.site" },
				{ text: "Fancy-DSA", link: "https://dsa.jonsam.site" },
				{
					text: "深入学习设计模式",
					link: "http://docs.jonsam.site/project-5/",
				},
				{ text: "导航", link: "https://source.jonsam.site/nav" },
			],
		},
		{ text: "Blog", link: "https://www.jonsam.site" },
	],
	sidebar,
	socialLinks: [
		{
			icon: "github",
			link: "https://github.com/jonsam-ng/100-day-of-js-enhance",
		},
	],
	footer: {
		message: "Released under the MIT License.",
		copyright: "Copyright © 2022-present, made by Jonsam NG with 💖",
	},
	editLink: {
		pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
		text: "Edit this page on GitHub",
	},
	themeConfig: {
		lastUpdatedText: "最近更新",
	},
	docFooter: {},
};

export default defineConfig({
	lang: "zh-CN",
	title: "100 days of JavaScript",
	titleTemplate: false,
	description: "100 days to enhance your skills on JavaScript.",
	appearance: true,
	base: "/",
	lastUpdated: true,
	head: [
		["link", { rel: "shortcut icon", href: "/logo/favicon.ico", sizes: "any" }],
	],
	cleanUrls: "without-subfolders",
	markdown: {
		theme: "material-palenight",
		lineNumbers: true,
		headers: {
			level: [0, 0],
		},
	},
	themeConfig,
});
