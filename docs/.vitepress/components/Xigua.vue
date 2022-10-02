<template>
	<div class="smplayer">
		<iframe
			ref="sbplayer"
			:style="{ width }"
			:src="src"
			:allowfullscreen="allowfullscreen"
			scrolling="no"
			frameborder="0"
			:sandbox="sandbox"
		></iframe>
	</div>
</template>

<script>
export default {
	name: "Xigua",
};
</script>

<script setup>
import { defineProps, computed, onMounted, nextTick, ref } from "vue";
const props = defineProps({
	xid: {
		type: String,
		default: null,
		required: true,
	},
	id: {
		type: String,
		default: null,
		required: false,
	},
	autoplay: {
		type: Boolean,
		default: false,
		required: false,
	},
	startTime: {
		type: Number,
		default: 0,
		required: false,
	},
	sandbox: {
		type: String,
		default:
			"allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups",
		required: false,
	},
	allowfullscreen: {
		type: [String, Boolean],
		default: "allowfullscreen",
		required: false,
	},
	width: {
		type: String,
		default: "100%",
		required: false,
	},
	height: {
		type: Array,
		default: [9 / 16, 70],
		required: false,
	},
});

const src = computed(
	() =>
		`//www.ixigua.com/iframe/${props.xid}?${
			props.id ? "id=" + props.id + "&" : ""
		}autoplay=${props.autoplay ? 1 : 0}&startTime=${props.startTime}`
);
const allowfullscreen = computed(() =>
	[true, "true", "allowfullscreen"].includes(props.allowfullscreen)
);
const sbplayer = ref(null);

onMounted(() => {
	nextTick(() => {
		const player = sbplayer.value;
		console.log("==>", { player, h: props.height[0] });
		player.style.height = `${
			player.scrollWidth * props.height[0] + props.height[1]
		}px`;
	});
});
</script>

<style>
.smplayer {
	width: 100%;
}
</style>
