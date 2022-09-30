import { useRoute } from "vitepress";
import { watch, createApp } from "vue";

let isMounted = false;

export default ({ app, router }) => ({
	methods: {
		mountComment() {
			const commentComponent = app._context.components.Comment;
			const frontmatter = router.route.data.frontmatter || {};
			const { layout = "doc", comment = true } = frontmatter;
			const enable = layout === "doc" && comment;
			if (!commentComponent || !enable) return;

			// mount comment component
			this.$nextTick(() => {
				const footer = document.querySelector(".VPDoc .VPDocFooter");
				if (!footer) return;
				const commentBlock = document.createElement("DIV");
				footer.appendChild(commentBlock);
				createApp(commentComponent).mount(commentBlock);
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
