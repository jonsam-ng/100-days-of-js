<template>
	<div class="biliPlayer">
		<iframe
			ref="sbplayer"
			:style="{ width }"
			:src="src"
			:allowfullscreen="afs"
			scrolling="no"
			frameborder="0"
			:sandbox="sandbox"
			class="player"
		></iframe>
	</div>
</template>

<script>
export default {
	name: "Bilibili",
	data() {
		return {
			afs: [true, "true", "allowfullscreen"].includes(this.allowfullscreen)
				? true
				: false,
			src: `//player.bilibili.com/player.html?bvid=${this.bvid}&page=${this.page}&danmaku=${this.danmaku}`,
		};
	},
	props: {
		bvid: {
			type: String,
			required: true,
		},
		danmaku: {
			type: Boolean,
			required: false,
		},
		page: {
			type: Number,
			required: false,
		},
		sandbox: {
			type: String,
			default: "allow-same-origin allow-popups allow-forms allow-scripts",
			required: true,
		},
		allowfullscreen: {
			type: [String, Boolean],
			required: false,
		},
		width: {
			type: String,
			required: false,
		},
		height: {
			type: Array,
			required: false,
		},
	},
	mounted() {
		this.$nextTick(() => {
			let sbplayer = this.$refs.sbplayer;
			sbplayer.style.height = `${
				sbplayer.scrollWidth * this.height[0] + this.height[1]
			}px`;
		});
	},
};
</script>

<style scoped>
.biliPlayer {
	width: 100%;
}
.biliPlayer .player {
	width: 100%;
	height: 521.688px;
}
</style>
