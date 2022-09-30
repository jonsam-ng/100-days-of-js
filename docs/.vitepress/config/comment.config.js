export default ({ window, frontmatter, title, relativePath }) => ({
	enable: true,
	clientID: "e2da18380ff0aeee4675",
	clientSecret: "674dca54ce4045bc3c48232ad7583b410bbfbc51",
	repo: "100-day-of-js-enhance",
	owner: "jonsam-ng",
	admin: ["jonsam-ng"],
	githubID: "jonsam-ng",
	language: "zh-CN",
	distractionFreeMode: true,
	pagerDirection: "last",
	id: decodeURI(window.location.pathname),
	// id: "<%- (title || relativePath).slice(-16) %>", //  页面的唯一标识,长度不能超过50
	// title: "「评论」<%- title %>", // GitHub issue 的标题
	// labels: ["Gitalk", "Comment"],
	// body: "页面：<%- window.location.origin + (relativePath || window.location.pathname) %>", // GitHub issue 的内容
});
