function ExternalLinkPlugin(md) {
	let shouldRenderExternalIcon = false;

	const rawLinkOpenRule = md.renderer.rules.link_open;
	md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
		const result = rawLinkOpenRule
			? rawLinkOpenRule(tokens, idx, options, env, self)
			: "";
		if (
			env.frontmatter?.externalLinkIcon !== false &&
			tokens[idx].attrGet("target") === "_blank"
		) {
			shouldRenderExternalIcon = true;
		}
		return result;
	};

	// const rawLinkCloseRule = md.renderer.rules.link_close;
	// md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
	// const result = rawLinkCloseRule
	// 	? rawLinkCloseRule(tokens, idx, options, env, self)
	// 	: "";
	// add external link icon before ending tag
	// if (shouldRenderExternalIcon && tokens[idx].tag === "a") {
	// 	console.log("==>", { result, rawLinkCloseRule, tokens });
	// 	shouldRenderExternalIcon = false;
	// 	return `${result}<ExternalLinkIcon/>`;
	// }
	// return result;
	// };
}

export default ExternalLinkPlugin;
