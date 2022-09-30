import CodeRunPlugin from "../plugins/run-code";
import PanguPlugin from "markdown-it-pangu";
import TaskListsPlugin from "markdown-it-task-lists";
import IMSizePlugin from "markdown-it-imsize";
import { html5Media as MediaPlugin } from "markdown-it-html5-media";
import SectionPlugin from "markdown-it-header-sections";
import AttrPlugin from "markdown-it-attrs";
import MarkPlugin from "markdown-it-mark";
import DecoratePlugin from "markdown-it-decorate";

export default {
	theme: "material-palenight",
	lineNumbers: true,
	headers: {
		level: [0, 0],
	},
	config: (md) => {
		md.use(CodeRunPlugin);
		md.use(PanguPlugin);
		md.use(TaskListsPlugin);
		md.use(function (md) {
			const handleImage = md.renderer.rules.image;
			md.renderer.rules.image = (tokens, idx, options, env, self) => {
				const url = tokens[idx].attrs[0][1];
				if (/.xmind$/.test(url)) {
					const title = tokens[idx].children[0].content;
					const url = tokens[idx].attrs[0][1];
					return `<XMindViewer src="${url}" title="${title}"></XMindViewer>`;
				} else {
					const PUBLIC_PREFIX = "/docs/.vitepress/public";
					const token = tokens[idx];
					const srcIndex = token.attrIndex("src");
					const url = token.attrs[srcIndex][1].replace(PUBLIC_PREFIX, "");
					const caption = md.utils.escapeHtml(token.content);
					return `<img data-zooming src="${url}" alt="${caption}" data-src="${url}" />`;
				}
				return handleImage(tokens, idx, options, env, self);
			};
		});
		md.use(AttrPlugin, {
			leftDelimiter: "{",
			rightDelimiter: "}",
			allowedAttributes: [],
		});
		md.use(IMSizePlugin);
		md.use(MediaPlugin, {
			videoAttrs: "class=h5-video data-media controls",
			audioAttrs: "class=h5-audio data-media controls",
		});
		// md.use(SectionPlugin);
		md.use(MarkPlugin);
		md.use(DecoratePlugin);
	},
};
