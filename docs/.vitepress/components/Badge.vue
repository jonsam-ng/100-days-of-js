<template>
	<span :class="['badge', type]" :style="styles">{{ text }}</span>
</template>
<script>
export default {
	name: "Badge",
	functional: true,
	props: {
		type: {
			type: String,
			default: "tip",
		},
		text: String,
		vertical: {
			type: String,
			default: "top",
		},
	},
	computed: {
		styles() {
			return {
				verticalAlign: this.vertical,
			};
		},
	},
};
</script>

<style lang="stylus" scoped>
.badge
  display inline-block
  font-size 12px
  height 18px
  line-height 18px
  border-radius 3px
  padding 0 6px
  color white
  background-color #42b983
  &.tip, &.green
    background-color $badgeTipColor
  &.error
    background-color $badgeErrorColor
  &.warning, &.warn, &.yellow
    background-color $badgeWarningColor
  & + &
    margin-left 5px
</style>
