export function scrollTo(id, offset = 0) {
	const element = document.getElementById(id);
	const elementPosition = element.getBoundingClientRect().top;
	const offsetPosition = elementPosition + window.pageYOffset - offset;

	window.scrollTo({
		top: offsetPosition,
		behavior: "smooth",
	});
}

export const isFunction = (f) => typeof f === "function";
