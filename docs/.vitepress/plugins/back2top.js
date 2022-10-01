import { useRoute } from "vitepress";
import { watch, createApp } from "vue";

let isMounted = false;
const containerId = "b2t-container";
let back2Top = null;

export default ({ app, router }) => ({
	methods: {
		unmountBack2Top() {
			this.$nextTick(() => {
				const container = document.getElementById(containerId);
				if (!container) return;
				container.remove();
			});
		},
		mountBack2Top() {
			const b2tComponent = app._context.components.BackToTop;
			const docData = router.route.data || {};
			const { frontmatter } = docData || {};
			const { layout = "doc", back2top = true } = frontmatter;
			const enable = layout === "doc" && back2top;
			if (!b2tComponent || !enable) {
				this.unmountBack2Top();
				return;
			}

			// mount comment component
			this.$nextTick(() => {
				const container = document.getElementById(containerId);
				if (container) {
					container.innerHTML = "";
				}
				const block = container ?? document.createElement("DIV");
				block.id = containerId;
				document.body.appendChild(block);
				back2Top = createApp(b2tComponent, { router });
				back2Top.mount(block);
			});
		},
	},
	updated() {
		if (isMounted) return;
	},

	mounted() {
		if (isMounted) return;
		isMounted = true;
		this.mountBack2Top();
		const route = useRoute();
		watch(
			() => route.path,
			() => {
				this.mountBack2Top();
			}
		);
	},
});
