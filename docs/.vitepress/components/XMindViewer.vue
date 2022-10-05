<template>
	<div ref="xmind" class="mindWrapper"><Spin :loading="loading" /></div>
</template>

<script>
export default {
	name: "XMindViewer",
};
</script>

<script setup>
import { onMounted, ref } from "vue";
import Spin from "../components/spin.vue";

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
const loading = ref(true);

onMounted(() => {
	import("xmind-embed-viewer").then((m) => {
		const XMindEmbedViewer = m.XMindEmbedViewer;
		const viewer = new XMindEmbedViewer({
			el: xmind.value,
		});
		viewer.addEventListener("sheets-load", () => {
			loading.value = false;
			console.log("==>", 11);
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

<style scoped>
.mindWrapper {
	max-width: 100%;
}
</style>
