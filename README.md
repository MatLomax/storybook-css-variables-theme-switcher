# Storybook Addon storybook-css-variables-theme-switcher

A theme switcher that uses multiple css files containing variables.

## Config

`.storybook/preview.ts:`

```json
{
	"parameters": {
		"themes": {
			"files": {
				"Red": "/.storybook/themes/red.css",
				"Green": "/.storybook/themes/green.css"
			}
		}
	}
}
```

To specify a default theme:

```json
{
	"parameters": {
		"themes": {
			"files": {
				"Red": "/.storybook/themes/red.css",
				"Green": "/.storybook/themes/green.css"
			},
			"defaultTheme": "Red"
		}
	}
}
```
