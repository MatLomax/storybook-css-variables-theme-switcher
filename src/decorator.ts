import { makeDecorator } from "@storybook/preview-api";
import { PARAM_KEY } from "./constants";

const styleTagIdentifier = "storybook-css-variables-theme-switcher";

export const switchStyle = (css: string) => {
	const rootElement = document.getElementById("storybook-preview-iframe") as HTMLIFrameElement;
	if (!rootElement) return;

	const documentNode = rootElement.contentDocument || rootElement.contentWindow.document;
	if (!documentNode) return;

	const htmlNode = documentNode.children[0];
	if (!htmlNode) return;

	const headTag = htmlNode.children[0];
	if (!headTag) return;

	const styleTag = headTag.querySelector("#" + styleTagIdentifier);
	console.log("StyleTag", styleTag);

	if (!styleTag) {
		const styleTag = document.createElement("style");
		styleTag.setAttribute("id", styleTagIdentifier);
		styleTag.innerHTML = css;

		headTag.appendChild(styleTag);
	} else {
		styleTag.innerHTML = css;
	}
};

export default makeDecorator({
	name: "CSS Variables Theme",
	parameterName: PARAM_KEY,
	wrapper: (getStory, context) => {
		return getStory(context);
	},
});
