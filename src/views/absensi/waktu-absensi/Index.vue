<script setup>
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb'
import { ServerSideTable } from '@/components/ServerSideTable.vue'
import { reactive } from 'vue';

setCurrentPageBreadcrumbs('Waktu Absensi', ['Absensi', 'Waktu Absensi'])

const tableData = reactive({
	columns: [
		{ label: 'Nama', field: 'name' },
		{ label: 'Jam Masuk', field: 'start' },
		{ label: 'Jam Pulang', field: 'end' }
	],
	rows: [],
	totalRows: 0
})

</script>

<template>
	<div class="card mb-5 mb-xxl-8">
		<div class="card-body pt-5 pb-5">

			<!-- Page Content -->
			<div class="page-content">
				<div class="d-flex flex-wrap justify-content-between align-items-center">
					<div class="d-flex gap-4">
						<h2 class="fs-1 fw-bold py-6 m-0">Waktu Absensi</h2>
					</div>

					<div class="position-relative d-flex ">
						<a class="btn btn-primary d-flex gap-3 align-items-center w-auto">
							<i class="bi bi-plus fs-1"></i>
							<span>Tambah Waktu Absensi</span>
						</a>
					</div>
				</div>
				<div class="separator border-black-50 border-2 my-3"></div>
			</div>
		</div>
		<div class="mb-5 mb-xxl-8 px-12">
			{{ tableData.nama }} <br>
			{{ tableData.umur }}
		</div>
	</div>
</template>