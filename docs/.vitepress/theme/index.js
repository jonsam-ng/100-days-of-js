import DefaultTheme from "vitepress/theme";
import Badge from "../components/Badge.vue";
import Badges from "../components/Badges.vue";
import Pdf from "../components/Pdf.vue";
import Qrcode from "../components/QrCode.vue";
import VideoPlayer from "../components/VideoPlayer.vue";
import zoomMixin from "../plugins/zoomMixin";
import qrcodeMixin from "../plugins/qrcode";
import RunCode from "../components/run-code/RunCode.vue";
import XMindViewer from "../components/XMindViewer.vue";
import BackToTop from "../components/BackToTop.vue";
import Comment from "../components/Comment.vue";
import Bilibili from "../components/Bilibili.vue";
import Xigua from "../components/Xigua.vue";

import commentMixin from "../plugins/comment";
import back2topMixin from "../plugins/back2top";
import progressMixin from "../plugins/nprogress";
import globalMixin from "../plugins/global";
import { isFunction } from "../util";
import "@cloudgeek/vue3-video-player/dist/vue3-video-player.css";
import "./custom.css";
import "./nprogress.styl";

/**
 * register global components
 * @note must provide Component's name
 */
const components = [
	Badge,
	Badges,
	Pdf,
	VideoPlayer,
	Qrcode,
	BackToTop,
	Comment,
	RunCode,
	XMindViewer,
	Bilibili,
	Xigua,
];

// register global mixins
const mixins = [
	zoomMixin,
	qrcodeMixin,
	commentMixin,
	back2topMixin,
	progressMixin,
	globalMixin,
];

export default {
	...DefaultTheme,
	enhanceApp: async ({ app, router, siteData }) => {
		// install components
		components.forEach((component) => app.component(component.name, component));
		// install mixins
		mixins.forEach((mixin) =>
			app.mixin(isFunction(mixin) ? mixin({ app, router, siteData }) : mixin)
		);
	},
	setup() {},
};
