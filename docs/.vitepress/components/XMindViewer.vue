<template>
	<div ref="xmind"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
	src: {
		type: String,
		default: "",
	},
	title: {
		type: String,
		default: "",
	},
	id: {
		type: String,
		default: String(Date.now()),
	},
});

const xmind = ref(null);

onMounted(() => {
	import("xmind-embed-viewer").then((m) => {
		const XMindEmbedViewer = m.XMindEmbedViewer;
		const viewer = new XMindEmbedViewer({
			el: xmind.value,
		});
		fetch(props.src)
			.then((res) => {
				return res.arrayBuffer();
			})
			.then((file) => {
				return viewer.load(file);
			});

		viewer.addEventListener("map-ready", () => {
			viewer.setZoomScale(60);
			viewer.setStyles({
				width: "100%",
			});
		});
	});
});
</script>

<style scoped></style>
