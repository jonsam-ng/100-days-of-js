import { useRoute } from "vitepress";
import { watch } from "vue";
import ZoomingPlugin from "./ZoomingPlugin";
let zoomingInit = false;

export default {
	mounted() {
		if (zoomingInit) return;
		if (!this.$vitepress) this.$vitepress = {};
		const route = useRoute();
		this.$vitepress.zooming = new ZoomingPlugin();
		this.$vitepress.zooming.updateDelay();

		watch(
			() => route.path,
			() => {
				if (this.$vitepress.zooming === "undefined") return;
				this.$vitepress.zooming.updateDelay();
			}
		);

		zoomingInit = true;
	},
};
