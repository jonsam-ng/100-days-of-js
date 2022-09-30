<template>
	<div id="comment-container"></div>
</template>

<script>
import "gitalk/dist/gitalk.css";

export default {
	name: "Comment",
	mounted() {},
};
</script>

<style scoped>
#comment-container {
	border-top: 1px solid var(--vp-c-divider-light-2);
	margin-top: 20px;
}

#comment-container :deep(.gt-container) {
	font-size: 13px !important;
}
</style>
