<template>
	<iframe
		:height="height"
		width="100%"
		frameborder="0"
		scrolling="no"
		sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups"
		:src="src"
	></iframe>
</template>

<script>
import { defineProps } from "vue";

export default {
	name: "IFrame",
	props: {
		src: { type: String, required: true },
		height: { type: String, default: "400px" },
	},
	setup() {},
};
</script>
