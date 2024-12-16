<!-- docs/.vitepress/theme/Layout.vue -->
<script setup lang="ts">
import './style.css'
import DefaultTheme from 'vitepress/theme'
import { useData, inBrowser } from 'vitepress'
import { watchEffect } from 'vue'
import BuyMeACoffee from './components/buy-me-a-coffee.vue'
import HomeImages from './components/home-images.vue'

const { lang } = useData()
watchEffect(() => {
	if (inBrowser) {
		// if cookie is not set and language starts with 'zh', check if path starts with '/zh/'
		// if not, redirect to '/zh/' while maintaining the path
		if (!document.cookie.includes('nf_lang') && lang.value.startsWith('zh')) {
			if (!window.location.pathname.startsWith('/zh/')) {
				window.location.pathname = '/zh/' + window.location.pathname.replace(/^\//, '')
			}
		}
		document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2030 00:00:00 UTC; path=/`
	}
})
</script>

<template>
	<DefaultTheme.Layout>
		<template #home-hero-image>
			<HomeImages />
		</template>
		<template #sidebar-nav-after>
			<BuyMeACoffee />
		</template>
	</DefaultTheme.Layout>
</template>
