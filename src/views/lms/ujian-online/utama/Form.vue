<template>
	<div class="card">
		<div class="card-body">

			<div class="py-5 d-flex justify-content-between align-items-center">
				<h2 class="fs-1 fw-bold">Tambah Data</h2>
			</div>

			<div class="separator border-black-50 border-2 my-3"></div>

			<router-view v-slot="{ Component, route }">
				<transition :name="route.meta.transition || 'slide-fade'">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</div>
</template>