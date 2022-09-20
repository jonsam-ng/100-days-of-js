import { nextTick, defineComponent, createApp } from "vue";

// 判断是否绑定时间是否绑定成功
let isMounted = false;

export default ({ app }) => ({
	updated() {
		const qrcode = app._context.components.Qrcode;
		if (isMounted || !qrcode) return;
		isMounted = true;
		// Execute after waiting for dom to load
		const navLink = document.querySelector(".VPNavBar .content");
		const qrcodeBtn = document.querySelector(".qrcodeBtn");
		if (navLink != null && qrcodeBtn == null) {
			this.$nextTick(() => {
				const navItem = document.createElement("DIV");
				navItem.className += "nav-item";
				createApp(qrcode).mount(navItem);
				navLink.appendChild(navItem);
			});
		}
	},
});
