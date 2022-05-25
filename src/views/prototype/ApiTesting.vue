<script setup>
	import { ref, onMounted } from 'vue'
	import axios from 'axios'

	const data = ref({})

	onMounted(() => {
		axios.post('/v2dev/summary', { id: 1 }, {
			baseURL: 'http://localhost/Laravel/sismart-api-school/devel/apischool',
		})
			.then(res => data.value = res.data)
			.catch(err => console.log(err.request))
	})
</script>

<template>
	<div>
		<h1>{{ JSON.stringify(data) }}</h1>
	</div>
</template>