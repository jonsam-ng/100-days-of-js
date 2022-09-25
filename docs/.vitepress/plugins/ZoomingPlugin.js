import Zooming from "zooming";

/* global ZOOMING_SELECTOR */
/* global ZOOMING_OPTIONS */
/* global ZOOMING_DELAY */
const zOptions = { bgColor: "rgba(0,0,0,0.6)", zIndex: 10000 };
const zSelector = "img[data-zooming]:not(.no-zooming,.VPImage)";
const zDelay = 1000;

export default class ZoomingPlugin {
	constructor() {
		this.instance = new Zooming(zOptions);
	}

	update(selector = zSelector) {
		if (typeof window === "undefined") return;
		this.instance.listen(selector);
	}

	updateDelay(selector, delay = zDelay) {
		setTimeout(() => this.update(selector), delay);
	}
}
