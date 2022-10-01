<template>
	<div class="wrapper">
		<transition name="fade">
			<svg
				v-if="show"
				class="go-to-top"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 49.484 28.284"
				@click="scrollToTop"
				title="返回顶部"
			>
				<g transform="translate(-229 -126.358)">
					<rect
						fill="currentColor"
						width="35"
						height="5"
						rx="2"
						transform="translate(229 151.107) rotate(-45)"
					/>
					111
					<rect
						fill="currentColor"
						width="35"
						height="5"
						rx="2"
						transform="translate(274.949 154.642) rotate(-135)"
					/>
				</g>
			</svg>
		</transition>
		<transition name="fade">
			<svg
				v-if="showComment"
				@click="toComment"
				class="icon-comment"
				viewBox="0 0 1024 1024"
				xmlns="http://www.w3.org/2000/svg"
				width="200"
				height="200"
				title="评论"
			>
				<path
					d="M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334z m0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333z m-271.36 213.334v64h-176.64v-64h176.64z m122.026-128v64H362.667v-64h298.666z"
					fill="currentColor"
				></path>
			</svg>
		</transition>
	</div>
</template>

<script>
import debounce from "lodash.debounce";
import { watch, ref, watchEffect } from "vue";

const commentContainerId = "comment-container";

export default {
	name: "BackToTop",

	props: {
		threshold: {
			type: Number,
			default: 300,
		},
	},

	data() {
		return {
			scrollTop: null,
			router: this.$attrs.router,
			showComment: false,
		};
	},

	computed: {
		show() {
			return this.scrollTop > this.threshold;
		},
	},

	mounted() {
		this.scrollTop = this.getScrollTop();
		window.addEventListener(
			"scroll",
			debounce(() => {
				this.scrollTop = this.getScrollTop();
			}, 100)
		);
		const updateShowComment = () => {
			this.$nextTick(() => {
				this.showComment = this.shouldShowComment();
			});
		};
		updateShowComment();
		if (this.router)
			watch(
				() => this.router.route.path,
				() => {
					updateShowComment();
				}
			);
	},

	methods: {
		getScrollTop() {
			return (
				window.pageYOffset ||
				document.documentElement.scrollTop ||
				document.body.scrollTop ||
				0
			);
		},

		scrollToTop() {
			window.scrollTo({ top: 0, behavior: "smooth" });
			this.scrollTop = 0;
		},

		shouldShowComment() {
			return !!document.getElementById(commentContainerId);
		},

		toComment() {
			const container = document.getElementById(commentContainerId);
			if (container) {
				container.scrollIntoView();
				window.location.hash = commentContainerId;
			}
		},
	},
};
</script>

<style lang="stylus" scoped>
.wrapper {
  position: fixed;
  bottom: 2rem;
  right: 1.8rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
}
.go-to-top, .icon-comment {
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  color: var(--accent-color);
  fill: var(--accent-color);
}
.go-to-top {
  padding: 0.15rem;
}

.go-to-top:hover, .icon-comment:hover {
  color: var(--vp-c-brand);
}

@media (max-width: 959px) {
  .wrapper {
    display: none;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
