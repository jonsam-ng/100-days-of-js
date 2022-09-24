import { html_encode } from "../components/run-code/utils/html-transform";

function CodeRunPlugin(md) {
	const fence = md.renderer.rules.fence;
	md.renderer.rules.fence = (tokens, idx, options, env, self) => {
		let { content, info } = tokens[idx];
		const shouldRun = info.indexOf("run") > -1;
		if (shouldRun) info = info.replace("run", "").trim();
		if (shouldRun) {
			if (info === "js" || info.toLocaleLowerCase() === "javascript") {
				return (
					"<RunCode type=" +
					info +
					"><pre>" +
					html_encode(content) +
					"</pre></RunCode>"
				);
			} else if (info === "html") {
				return (
					"<RunCode type=" +
					info +
					"><pre>" +
					html_encode(content) +
					"</pre></RunCode>"
				);
			}
		}
		return fence(tokens, idx, options, env, self);
	};
}

export default CodeRunPlugin;
