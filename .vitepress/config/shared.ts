import { defineConfig } from 'vitepress'
import { search as zhSearch } from './zh'

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
	title: 'Beszel',
	appearance: 'dark',
	lastUpdated: true,
	cleanUrls: true,
	rewrites: {
		'en/:rest*': ':rest*',
	},
	head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }]],
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		// logo: '/logo.svg',
		search: {
			provider: 'local',
			options: {
				locales: {
					...zhSearch,
				},
			},
		},

		editLink: {
			pattern: 'https://github.com/henrygd/beszel-docs/edit/main/:path',
		},

		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Guide', link: '/guide/what-is-beszel' },
		],

		sidebar: [
			{
				text: 'Introduction',
				items: [
					{ text: 'What is Beszel?', link: '/guide/what-is-beszel' },
					{ text: 'Getting Started', link: '/guide/getting-started' },
				],
			},
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/henrygd/beszel' }],

		footer: {
			message: 'Released under the MIT License',
		},
	},
})
