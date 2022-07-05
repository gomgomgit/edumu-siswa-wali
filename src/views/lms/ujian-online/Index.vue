<script setup>
import PageTabs from '@/components/page-tabs/index.vue'

const tabs = [
	{
		to: '/lms/ujian-online/utama',
		title: 'Utama'
	},
	{
		to: '/lms/ujian-online/pantau-ujian',
		title: 'Pantau Ujian'
	},
	{
		to: '/lms/ujian-online/kategori',
		title: 'Kategori'
	},
]
</script>

<template>
	<div>
		<PageTabs :tabs="tabs"></PageTabs>

		<router-view v-slot="{ Component, route }">
			<transition :name="route.meta.transition || 'slide-fade'">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>