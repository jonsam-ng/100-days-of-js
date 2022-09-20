import DefaultTheme from "vitepress/theme";
import LastReadingPopup from "../components/LastReadingPopup.vue";
import Badge from "../components/Badge.vue";
import Badges from "../components/Badges.vue";
import Pdf from "../components/Pdf.vue";
import VideoPlayer from "../components/VideoPlayer.vue";
import zoomMixin from "../plugins/zoomMixin";
import "@cloudgeek/vue3-video-player/dist/vue3-video-player.css";

export default {
	...DefaultTheme,
	enhanceApp: async ({ app, router, siteData }) => {
		app.component(LastReadingPopup.name, LastReadingPopup);
		app.component(Badge.name, Badge);
		app.component(Badges.name, Badges);
		app.component(Pdf.name, Pdf);
		app.component(VideoPlayer.name, VideoPlayer);
		app.mixin(zoomMixin);
	},
	setup() {},
};
