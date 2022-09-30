import DefaultTheme from "vitepress/theme";
import Badge from "../components/Badge.vue";
import Badges from "../components/Badges.vue";
import Pdf from "../components/Pdf.vue";
import Qrcode from "../components/QrCode.vue";
import VideoPlayer from "../components/VideoPlayer.vue";
import zoomMixin from "../plugins/zoomMixin";
import createQrcodeMixin from "../plugins/qrcode";
import RunCode from "../components/run-code/RunCode.vue";
import XMindViewer from "../components/XMindViewer.vue";
import BackToTop from "../components/BackToTop.vue";
import Comment from "../components/Comment.vue";
import createCommentMixin from "../plugins/comment";
import createBack2topMixin from "../plugins/back2top";
import createProgressMixin from "../plugins/nprogress";
import createGlobalMixin from "../plugins/global";
import "@cloudgeek/vue3-video-player/dist/vue3-video-player.css";
import "./custom.css";
import "./nprogress.styl";

export default {
	...DefaultTheme,
	enhanceApp: async ({ app, router, siteData }) => {
		app.component(Badge.name, Badge);
		app.component(Badges.name, Badges);
		app.component(Pdf.name, Pdf);
		app.component(VideoPlayer.name, VideoPlayer);
		app.component(Qrcode.name, Qrcode);
		app.component("RunCode", RunCode);
		app.component("XMindViewer", XMindViewer);
		app.component(BackToTop.name, BackToTop);
		app.component(Comment.name, Comment);
		app.mixin(zoomMixin);
		app.mixin(createQrcodeMixin({ app }));
		app.mixin(createCommentMixin({ app, router }));
		app.mixin(createBack2topMixin({ app, router }));
		app.mixin(createProgressMixin({ app, router }));
		app.mixin(createGlobalMixin({ app, router }));
	},
	setup() {},
};
