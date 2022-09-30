<template>
	<div id="comment-container"></div>
</template>

<script>
import commentConfig from "../config/comment.config";
import "gitalk/dist/gitalk.css";

export default {
	name: "Comment",
	mounted() {
		import("gitalk").then((m) => {
			const Gitalk = m.default;
			const gitalk = new Gitalk(commentConfig);
			gitalk.render("comment-container");
		});
	},
};
</script>

<style>
#comment-container {
	border: 1px solid #ccc;
}
</style>
