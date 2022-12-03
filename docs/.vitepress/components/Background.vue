<template>
	<div :class="containerClass">
		<Bulb></Bulb>
	</div>
</template>

<script>
export default {
	name: "Background",
};
</script>

<script setup>
// inspirations from https://github.com/Merlin-Chest/Blog/blob/master/docs/.vitepress/theme/components/Background.vue
import Bulb from "./Bulb.vue";
import { useRoute } from "vitepress";
import { ref, watch } from "vue";
const router = useRoute();
const containerClass = ref(
	!router.path || router.path === "/" ? "container" : "container blur"
);
watch(
	() => router.path,
	() => {
		if (router.path === "/" || !router.path) {
			containerClass.value = "container";
		} else {
			containerClass.value = "container blur";
		}
	}
);
</script>

<style scoped>
.container {
	position: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
	z-index: -1;
}
.blur {
	filter: blur(40px);
	opacity: 80%;
}
</style>
