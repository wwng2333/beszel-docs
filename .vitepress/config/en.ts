import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('../../package.json')

export const en = defineConfig({
	lang: 'en-US',
	description: 'Lightweight server monitoring with historical data, docker stats, and alerts',
	themeConfig: {
		nav: nav(),

		sidebar: {
			'/guide/': { base: '/guide/', items: sidebarGuide() },
		},

		editLink: {
			pattern: 'https://github.com/henrygd/beszel-docs/edit/main/:path',
			text: 'Edit this page on GitHub',
		},

		footer: {
			message: 'Released under the MIT License',
		},
	},
})

function nav(): DefaultTheme.NavItem[] {
	return [
		{
			text: 'Guide',
			link: '/guide/what-is-beszel',
			activeMatch: '/guide/',
		},
		{
			text: pkg.version,
			items: [
				{
					text: 'Releases',
					link: 'https://github.com/henrygd/beszel/releases',
				},
				{
					text: 'New Issue',
					link: 'https://github.com/henrygd/beszel/issues/new',
				},
			],
		},
	]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: 'Introduction',
			collapsed: false,
			items: [
				{ text: 'What is Beszel?', link: 'what-is-beszel' },
				{ text: 'Getting Started', link: 'getting-started' },
			],
		},
		{
			text: 'Installation',
			collapsed: false,
			items: [
				{ text: 'Hub Installation', link: 'install-hub' },
				{ text: 'Agent Installation', link: 'install-agent' },
			],
		},
		{
			text: 'Configuration / Guides',
			collapsed: false,
			items: [
				{ text: 'Environment Variables', link: 'environment-variables' },
				{ text: 'OAuth / OIDC', link: 'oauth' },
				{ text: 'Additional Disks', link: 'additional-disks' },
				{ text: 'GPU Monitoring', link: 'gpu' },
				{ text: 'Podman Monitoring', link: 'podman' },
				{ text: 'Compiling', link: 'compiling' },
				{ text: 'REST API', link: 'rest-api' },
				{ text: 'User Roles', link: 'user-roles' },
			],
		},
		{
			text: 'Troubleshooting',
			collapsed: false,
			items: [{ text: 'Common Issues', link: 'faq' }],
		},
		{
			text: 'About',
			collapsed: false,
			items: [
				{ text: 'Security', link: 'security' },
				{ text: 'Contributing', link: 'contributing' },
				{ text: 'Multilingual and Localization', link: 'i18n' },
			],
		},
	]
}
