import { useRoute } from "vitepress";
import { watch, createApp } from "vue";
import nprogress from "nprogress";

let isMounted = false;

export default ({ app, router }) => ({
	updated() {
		if (isMounted) return;
	},

	mounted() {
		if (isMounted) return;
		isMounted = true;
		// configure progress bar
		nprogress.configure({ showSpinner: false });

		const route = useRoute();
		watch(
			() => route.path,
			() => {
				nprogress.start();
				// Does not use vue-router because the need of VitePress is very simple and specific - a simple custom router (under 200 LOC) is used instead.
				// see https://vitepress.vuejs.org/guide/what-is-vitepress#lighter-page-weight
				setTimeout(() => {
					nprogress.done();
				}, 1000);
			}
		);
	},
});
