<script setup>
import { reactive, onMounted, watch } from 'vue'
import { request } from '@/util'
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';

import ServerSideTable from '@/components/ServerSideTable.vue'
import FilterSelect from '@/components/filter-select/index.vue'

const daysMap = {
	1: 'Senin',
	2: 'Selasa',
	3: 'Rabu',
	4: 'Kamis',
	5: 'Jum\'at',
	6: 'Sabtu',
	7: 'Minggu',
}

const filterData = reactive({
	options: {
		kelas: [], mapel: [], user: []
	},
	selected: {
		kelas: null, mapel: null, user: null, hari: null
	}
})

function getFilterOptions () {
	Promise.all([
		request.post('kelas'),
		request.post('mapel'),
		request.post('user?level=guru'),
	]).then(responses => {
		filterData.options = {
			kelas: responses[0].data.data,
			mapel: responses[1].data.data,
			user: responses[2].data.data
		}
	})
}

const tableData = reactive({
	columns: [
		{ label: 'KELAS', field: 'kelas_nama' },
		{ label: 'NAMA MAPEL', field: 'mapel_nama' },
		{ label: 'GURU', field: 'user_nama' },
		{ label: 'HARI', field: 'jadwal_hari', formatFn: val => daysMap[val] },
		{ label: 'ACTION', field: 'action', sortable: false, width: '200px' },
	],
	rows: [],
	totalRows: 0,
})

function getTableData (payload) {
	request.post('jadwal', null, {
		params: {
			page: payload.page ?? 1,
			...filterData.selected
		}
	}).then(res => {
		tableData.rows = res.data.data.data
		tableData.totalRows = res.data.data.total
	})
}

watch(
	filterData.selected,
	getTableData,
	{ deep: true }
)

onMounted(() => {
	setCurrentPageBreadcrumbs("Jadwal Pelajaran", ['Sekolah', "Mata Pelajaran"]);
	getFilterOptions()
})
</script>

<template>
	<div class="card mb-5 mb-xxl-8">
		<div class="card-body">

			<section class="d-flex flex-wrap justify-content-between align-items-center mb-5">
				<section class="d-flex flex-wrap gap-4">
					<FilterSelect v-model:filterValue="filterData.selected.kelas" placeholder="Pilih Kelas" class="w-150px">
						<el-option
							v-for="kelas in filterData.options.kelas"
							:key="kelas.kelas_id"
							:value="kelas.kelas_id"
							:label="kelas.kelas_nama"
						/>
					</FilterSelect>
					<FilterSelect v-model:filterValue="filterData.selected.mapel" placeholder="Pilih Mapel" class="w-150px">
						<el-option
							v-for="mapel in filterData.options.mapel"
							:key="mapel.mapel_id"
							:value="mapel.mapel_id"
							:label="mapel.mapel_nama"
						/>
					</FilterSelect>
					<FilterSelect v-model:filterValue="filterData.selected.user" placeholder="Pilih Guru" class="w-150px">
						<el-option
							v-for="user in filterData.options.user"
							:key="user.user_id"
							:value="user.user_id"
							:label="user.user_nama"
						/>
					</FilterSelect>
					<FilterSelect v-model:filterValue="filterData.selected.hari" placeholder="Pilih Hari" class="w-150px">
						<el-option
							v-for="(day, dayId) in daysMap"
							:key="dayId"
							:value="dayId"
							:label="day"
						/>
					</FilterSelect>
				</section>

				<section class="d-flex flex-wrap gap-4">
					<button class="btn btn-primary d-flex gap-1 align-items-center">
						<i class="bi bi-plus fs-1"></i>
						Import
					</button>
					<button class="btn btn-primary d-flex gap-1 align-items-center">
						<i class="bi bi-plus fs-1"></i>
						Tambah Jadwal
					</button>
				</section>
			</section>

			<ServerSideTable
				:totalRows="tableData.totalRows || 0"
				:columns="tableData.columns"
				:rows="tableData.rows"
				@loadItems="getTableData"
			>
				<template #table-row="{column, row}">
					<div v-if="column.field == 'action'">
						<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
							<span class="svg-icon svg-icon-3">
								<inline-svg src="media/icons/duotune/art/art005.svg" />
							</span>
						</button>
						<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
							<span class="svg-icon svg-icon-3">
								<inline-svg src="media/icons/duotune/general/gen027.svg"/>
							</span>
						</button>
					</div>
				</template>
			</ServerSideTable>

		</div>
	</div>
</template>