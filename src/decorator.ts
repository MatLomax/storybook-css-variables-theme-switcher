import { makeDecorator } from "@storybook/preview-api";
import { PARAM_KEY } from "./constants";

const styleTagIdentifier = "storybook-css-variables-theme-switcher";

export const switchStyle = (css?: string) => {
	const storybookIFrame = document.getElementById("storybook-preview-iframe") as HTMLIFrameElement;
	const headTag = (storybookIFrame?.contentDocument || storybookIFrame?.contentWindow.document)?.children?.[0]?.children?.[0];
	if (!headTag) return;

	const styleTag = headTag.querySelector("#" + styleTagIdentifier);

	if (!styleTag && !!css) {
		const styleTag = document.createElement("style");
		styleTag.setAttribute("id", styleTagIdentifier);
		styleTag.innerHTML = css;

		headTag.appendChild(styleTag);
	} else {
		if (!!css) {
			styleTag.innerHTML = css;
		} else {
			styleTag.remove();
		}
	}
};

export default makeDecorator({
	name: "Theme Switcher",
	parameterName: PARAM_KEY,
	wrapper: (getStory, context) => {
		return getStory(context);
	},
});
