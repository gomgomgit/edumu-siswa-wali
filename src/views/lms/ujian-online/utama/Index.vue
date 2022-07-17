<script setup>
import { onMounted } from 'vue'
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';

onMounted(() => {
	setCurrentPageBreadcrumbs("Utama", ['LMS', "Ujian Online"])
})
</script>
<template>
	<router-view v-slot="{ Component, route }">
		<transition :name="route.meta.transition || 'slide-fade'">
			<component :is="Component" />
		</transition>
	</router-view>
</template>