import { useRoute } from "vitepress";
import { watch, createApp } from "vue";
import commentConfig from "../config/comment.config";

let isMounted = false;
let gitalk = null;
const containerId = "comment-container";

export default ({ app, router }) => ({
	methods: {
		unmountComment() {
			this.$nextTick(() => {
				const footer = document.querySelector(".VPDoc .VPDocFooter");
				if (!footer) return;
				const container = document.getElementById(containerId);
				if (!container) return;
				container.remove();
			});
		},
		mountComment() {
			const commentComponent = app._context.components.Comment;
			const frontmatter = router.route.data.frontmatter || {};
			const { layout = "doc", comment = true } = frontmatter;
			const enable = layout === "doc" && comment;
			if (!commentComponent || !enable) {
				this.unmountComment();
				return;
			}

			// mount comment component
			this.$nextTick(() => {
				const footer = document.querySelector(".VPDoc .VPDocFooter");
				if (!footer) return;
				const commentBlock = document.createElement("DIV");
				footer.appendChild(commentBlock);
				createApp(commentComponent).mount(commentBlock);
				if (gitalk) {
					gitalk.render(containerId);
					return;
				}
				import("gitalk").then((m) => {
					const Gitalk = m.default;
					const gk = new Gitalk(commentConfig);
					gk.render(containerId);
					gitalk = gk;
				});
			});
		},
	},
	updated() {
		if (isMounted) return;
	},

	mounted() {
		if (isMounted) return;
		isMounted = true;
		this.mountComment();
		const route = useRoute();
		watch(
			() => route.path,
			() => {
				this.mountComment();
			}
		);
	},
});
