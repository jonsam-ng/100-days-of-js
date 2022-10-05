<template>
	<div v-if="loading" class="wrapper">
		<div class="spinner"></div>
		<spin v-if="message">{{ message }}</spin>
	</div>

	<slot v-else></slot>
</template>

<script>
export default {
	name: "Spin",
	props: {
		loading: { type: Boolean },
		message: { type: String, default: "loading..." },
	},
};
</script>

<style scoped>
.wrapper {
	text-align: center;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.spinner {
	display: inline-block; /* Setting display to inline-block prevents the custom event from being fired multiple times at once */
	margin: 5px auto;
	height: 2rem;
	width: 2rem;
	border-radius: 50%;
	border: 2px dashed black;
	position: relative;
	animation: spin 2s ease infinite;
}
.spinner::before {
	position: absolute;
	content: "";
	top: 0;
	left: -7px;
	width: 40%;
	height: 70%;
	background: white;
}
@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
