import React, { memo, useCallback, useEffect } from "react";

import {
	useGlobals,
	useParameter,
	useStorybookApi,
} from "@storybook/manager-api";
import { Icons, IconButton } from "@storybook/components";
import { ADDON_ID, PARAM_KEY, TOOL_ID } from "./constants";
import { WithTooltip, TooltipLinkList } from "@storybook/components";

import { styled } from "@storybook/theming";
import { useLocalStorage } from "usehooks-ts";
import { switchStyle } from "./decorator";

type Files = {
	[key: string]: string;
};

type Parameters = {
	files: Files;
	defaultTheme: string;
};

const IconButtonWithLabel = styled(IconButton)(() => ({
	display: "inline-flex",
	alignItems: "center",
}));

const ActiveViewportLabel = styled.div<{}>(({ theme }) => ({
	display: "inline-block",
	textDecoration: "none",
	padding: 10,
	fontWeight: theme.typography.weight.bold,
	fontSize: theme.typography.size.s2 - 1,
	lineHeight: "1",
	height: 40,
	border: "none",
	borderTop: "3px solid transparent",
	borderBottom: "3px solid transparent",
	background: "transparent",
}));

export const ThemeSwitcher = () => {
	const { files, defaultTheme } = useParameter<Parameters>(PARAM_KEY, {
		files: {},
		defaultTheme: null,
	});

	// console.log("Files", files);
	// console.log("DefaultTheme", defaultTheme);

	const [activeTheme, setActiveTheme] = useLocalStorage(
		"activeTheme",
		defaultTheme
	);

	function handleChange(onHide: () => void, value: string | null) {
		setActiveTheme(value);
		onHide();
	}

	useEffect(() => {
		console.log("ActiveTheme", activeTheme);
		console.log("ActiveCSS", files[activeTheme]);

		if (!!files?.[activeTheme]) {
			console.log("!! Switching style", activeTheme, files[activeTheme]);
			switchStyle(files[activeTheme]);
		}
	}, [activeTheme, files]);

	function toLink(value: string, active: boolean, onHide: () => void) {
		return {
			id: value,
			title: value,
			onClick: () => handleChange(onHide, value),
			active,
		};
	}

	function generateLinks(items: Files, onHide: () => void) {
		// eslint-disable-next-line max-len
		const result: any[] = Object.keys(items).map((value) =>
			toLink(value, value === activeTheme, onHide)
		);

		return result;
	}

	return (
		<WithTooltip
			placement="top"
			trigger="click"
			tooltip={({ onHide }) => (
				<TooltipLinkList links={generateLinks(files, onHide)} />
			)}
			closeOnOutsideClick
		>
			<IconButtonWithLabel
				key="css themes"
				title="CSS custom properties themes"
				active={Object.hasOwnProperty.call(files, activeTheme)}
			>
				<Icons icon="paintbrush" />
				<ActiveViewportLabel title="Theme">
					{activeTheme || "No theme"}
				</ActiveViewportLabel>
			</IconButtonWithLabel>
		</WithTooltip>
	);
};

