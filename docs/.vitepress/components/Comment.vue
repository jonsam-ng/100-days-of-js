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

#comment-container :deep(.gt-container) {
	font-size: 13px !important;
}
</style>
