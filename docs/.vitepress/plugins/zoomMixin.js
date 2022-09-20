import ZoomingPlugin from "./ZoomingPlugin";
let zoomingInit = false;

export default {
	watch: {
		"router.route.path"() {
			if (this.$vitepress.zooming === "undefined") return;
			this.$vitepress.zooming.updateDelay();
		},
	},
	mounted() {
		if (zoomingInit) return;
		if (!this.$vitepress) this.$vitepress = {};
		this.$vitepress.zooming = new ZoomingPlugin();
		this.$vitepress.zooming.updateDelay();
		zoomingInit = true;
		console.log("==>", 11);
	},
};
