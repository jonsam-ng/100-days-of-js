<script>
import "gitalk/dist/gitalk.css";

export default {
	name: "Comment",
	mounted() {},
};
</script>

<style>
#comment-container {
	border-top: 1px solid var(--vp-c-divider-light-2);
	margin-top: 20px;
	max-width: 100%;
}

#comment-container .gt-container,
#comment-container .gt-comment-body {
	font-size: 13px !important;
}
</style>
