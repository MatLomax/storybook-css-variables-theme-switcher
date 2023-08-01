import { IconButton, Icons, TooltipLinkList, WithTooltip } from "@storybook/components";
import { useParameter } from "@storybook/manager-api";
import { styled } from "@storybook/theming";
import React, { useEffect, useState } from "react";
import { PARAM_KEY } from "./constants";
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
	lineHeight: "16px",
	height: 40,
	border: "none",
	borderTop: "3px solid transparent",
	borderBottom: "3px solid transparent",
	background: "transparent",
}));

export const ThemeSwitcher = () => {
	const { files, defaultTheme } = useParameter<Parameters>(PARAM_KEY, { files: {}, defaultTheme: null });
	const [activeTheme, setActiveTheme] = useState(sessionStorage.getItem("activeTheme"));

	useEffect(() => {
		setActiveTheme((activeTheme) => !activeTheme ? defaultTheme : activeTheme);
	}, [defaultTheme]);
	
	useEffect(() => {
		sessionStorage.setItem("activeTheme", activeTheme);

		if (activeTheme === "No theme") {
			switchStyle("");
			return;
		}

		if (!!files?.[activeTheme]) {
			if (files[activeTheme].endsWith(".css")) {
				import(files[activeTheme] + "?inline").then(({ default: css }) => switchStyle(css));
			} else {
				switchStyle(files[activeTheme]);
			}
		}
	}, [activeTheme, files]);

	function onChange(onHide: () => void, value: string | null) {
		setActiveTheme(value);
		onHide();
	}

	function createMenuItem(value: string, active: boolean, onHide: () => void) {
		return {
			id: value,
			title: value,
			onClick: () => onChange(onHide, value),
			active,
		};
	}

	function createMenuItems(items: Files, defaultTheme: string, onHide: () => void) {
		const links = Object.keys(items).map((value) => createMenuItem(value, value === activeTheme, onHide));

		if (!defaultTheme) {
			links.unshift(createMenuItem("No theme", activeTheme === "No theme", onHide));
		}

		return links;
	}

	return (
		<WithTooltip
			placement="top"
			trigger="click"
			tooltip={({ onHide }) => <TooltipLinkList links={createMenuItems(files, defaultTheme, onHide)} />}
			closeOnOutsideClick
		>
			<IconButtonWithLabel
				key="theme"
				title="Theme Switcher"
				active={Object.hasOwnProperty.call(files, activeTheme)}
			>
				<Icons icon="paintbrush" />
				<ActiveViewportLabel title="Theme">{activeTheme || "No theme"}</ActiveViewportLabel>
			</IconButtonWithLabel>
		</WithTooltip>
	);
};
