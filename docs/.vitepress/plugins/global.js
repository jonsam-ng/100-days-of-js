import { useRoute } from "vitepress";
import { watch, createApp } from "vue";
import { scrollTo } from "../util";

const globalUIComponents = [];

let isMounted = false;

export default ({ app, router }) => ({
	methods: {
		getComponentContainerId(con) {
			const [first, ...rest] = con;
			return `${first.toLowerCase() + rest.join("")}-container`;
		},
		unmountComponent(con) {
			this.$nextTick(() => {
				const container = document.getElementById(
					this.getComponentContainerId(con)
				);
				if (!container) return;
				container.remove();
			});
		},
		mountComponent(con) {
			const gComponent = app._context.components[con];
			if (!gComponent) {
				this.unmountComponent(con);
				return;
			}
			this.$nextTick(() => {
				const containerId = this.getComponentContainerId(con);
				const container = document.getElementById(containerId);
				if (container) {
					container.innerHTML = "";
				}
				const block = container ?? document.createElement("DIV");
				block.id = containerId;
				document.body.appendChild(block);
				createApp(gComponent).mount(block);
			});
		},
		mountComponents() {
			// auto just to hash location
			const hash = decodeURIComponent(window.location.hash.slice(1));
			if (hash) {
				this.$nextTick(() => {
					const pos = document.getElementById(hash);
					if (pos) scrollTo(hash, 73);
					console.info(`navigate to anchor ${hash}.`);
				});
			}
			globalUIComponents.forEach((con) => this.mountComponent(con));
		},
	},
	updated() {
		if (isMounted) return;
	},
	mounted() {
		if (isMounted) return;
		isMounted = true;
		this.mountComponents();
		const route = useRoute();
		watch(
			() => route.path,
			() => {
				this.mountComponents();
			}
		);
	},
});
