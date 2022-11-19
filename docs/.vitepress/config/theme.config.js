import AutoNavPlugin from "vitepress-auto-nav-sidebar";

/** see https://www.npmjs.com/package/vitepress-auto-nav-sidebar */
const { sidebar, nav } = AutoNavPlugin({
	ignoreFolders: ["node_modules", "assets", "public", ".vitepress", "utils"],
	ignoreFiles: ["index", "示例", "关于"],
	showSideIcon: true,
	showNavIcon: true,
	dirPrefix: "📂 ",
	filePrefix: "📃 ",
	isCollapsible: true,
	collapsed: true,
});

export default {
	logo: "/logo/favicon-16x16.png",
	siteTitle: "100 days of JavaScript",
	outline: [2, 4],
	nav: [
		...nav,
		{
			text: "🗳️ More",
			items: [
				{ text: "示例", link: "/示例" },
				{ text: "关于", link: "/关于" },
			],
		},
		{
			text: "⛓️ Links",
			items: [
				{ text: "源码阅读", link: "https://source.jonsam.site" },
				{ text: "Fancy-DSA", link: "https://dsa.jonsam.site" },
				{ text: "Fancy-WebRTC", link: "https://webrtc.jonsam.site" },
				{
					text: "氧气空间",
					link: "https://ox.jonsam.site/tags/?tag=JavaScript",
				},
				{
					text: "深入学习设计模式",
					link: "http://docs.jonsam.site/project-5/",
				},
				{ text: "导航", link: "https://source.jonsam.site/nav" },
			],
		},
		{ text: "📮 Blog", link: "https://www.jonsam.site" },
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
	editLink: false,
	// {
	// 	pattern:
	// 		"https://github.com/jonsam-ng/100-day-of-js-enhance/edit/master/docs/:path",
	// 	text: "Edit this page on GitHub",
	// },
	lastUpdatedText: "最近更新",
	docFooter: {},
	outlineTitle: "🔗 内容纲要：",
};
