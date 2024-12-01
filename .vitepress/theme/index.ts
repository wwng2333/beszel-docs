// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import BuyMeACoffee from './components/buy-me-a-coffee.vue'
import HomeImages from './components/home-images.vue'

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
			'home-hero-image': () => h(HomeImages),
			'sidebar-nav-after': () => h(BuyMeACoffee),
		})
	},
	enhanceApp({ app, router, siteData }) {
		// ...
	},
} satisfies Theme
