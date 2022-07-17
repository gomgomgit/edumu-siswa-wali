<script setup>
import { reactive, onMounted, ref, watch } from 'vue'
import { request } from '@/util'

import ServerSideTable from '@/components/ServerSideTable.vue'
import FilterSelect from '@/components/filter-select/index.vue'
// import FormModal from './FormModal.vue'


const tableRef = ref()
const summaryData = ref({})
const formMode = ref('')
const activeData = ref({})

const filterData = reactive({
	options: {
		mapel: [], user: []
	},
	selected: {
		mapel: null, user: null, date: null
	}
})

const tableData = reactive({
	columns: [
		{ label: 'TUGAS/UJIAN', field: 'type' },
		{ label: 'GURU', field: 'user_nama' },
		{ label: 'NAMA UJIAN/TUGAS', field: 'exam_title' },
		{ label: 'MATA PELAJARAN', field: 'mapel_nama' },
		{ label: 'MAX TIME', field: 'max_time', width: '200px' },
		{ label: 'STATUS UJIAN', field: 'exam_status' },
		{ label: 'ACTION', field: 'action', width: '200px' },
	],
	rows: [],
	totalRows: 0,
})


function getTableData(payload) {
	request.post('ujian', null, {
		params: {
			page: payload?.page ?? 1,
			mapel: filterData.selected.mapel ?? '',
			user: filterData.selected.user ?? '',
			tglMulai: filterData.selected.date ? filterData.selected.date[0] : '',
			tglEnd: filterData.selected.date ? filterData.selected.date[1] : '',
		}
	}).then(res => {
		tableData.rows = res.data.data.data
		tableData.totalRows = res.data.data.total
	})
}

function getSummaryData() {
	request.post('dashboard').then(res => {
		summaryData.value = res.data.data
	})
}

function getFilterOptions() {
	Promise.all([
		request.post('mapel'),
		request.post('user?level=guru'),
	]).then(responses => {
		filterData.options = {
			mapel: responses[0].data.data,
			user: responses[1].data.data
		}
	})
}

function handleEdit(row) {
	activeData.value = row
	formMode.value = 'Edit Data'
}

function handleFormClose(row) {
	activeData.value = {}
	formMode.value = ''
}


watch(
	filterData.selected,
	() => tableRef.value.loadItems(),
	{ deep: true }
)

onMounted(() => {
	getSummaryData()
	getFilterOptions()
})
</script>

<template>
	<div>
		<div class="card mb-4">
			<div class="card-body">
				<div class="row px-5 gy-5">
					<div class="col-md-3">
						<section class="border-dashed p-4 rounded-2 w-75 mx-auto">
							<p class="display-6">96</p>
							<div class="h5">Ujian</div>
							<div class="text-muted small">Online</div>
						</section>
					</div>
					<div class="col-md-3">
						<section class="border-dashed p-4 rounded-2 w-75 mx-auto">
							<p class="display-6">96</p>
							<div class="h5">Tugas</div>
							<div class="text-muted small">Online</div>
						</section>
					</div>
					<div class="col-md-3">
						<section class="border-dashed p-4 rounded-2 w-75 mx-auto">
							<p class="display-6">96</p>
							<div class="h5">Soal Ujian</div>
							<div class="text-muted small">Online</div>
						</section>
					</div>
					<div class="col-md-3">
						<section class="border-dashed p-4 rounded-2 w-75 mx-auto">
							<p class="display-6">96</p>
							<div class="h5">Guru Pembuat Ujian</div>
							<div class="text-muted small">Online</div>
						</section>
					</div>
				</div>
			</div>
		</div>

		<div class="card mb-5 mb-xxl-8">
			<div class="card-body">
				<section class="d-flex flex-wrap justify-content-between align-items-center mb-5">
					<section class="d-flex flex-wrap gap-4 align-items-center">
						<FilterSelect v-model:filterValue="filterData.selected.mapel" placeholder="Pilih Mapel" class="w-150px">
							<el-option
								v-for="mapel in filterData.options.mapel"
								:key="mapel.mapel_id"
								:value="mapel.mapel_id"
								:label="mapel.mapel_nama" />
						</FilterSelect>
						<FilterSelect v-model:filterValue="filterData.selected.user" placeholder="Pilih Guru" class="w-150px">
							<el-option
								v-for="user in filterData.options.user"
								:key="user.user_id"
								:value="user.user_id"
								:label="user.user_nama" />
						</FilterSelect>
						<el-date-picker
							v-model="filterData.selected.date"
							type="daterange"
							range-separator="-"
							start-placeholder="Tanggal Mulai"
							end-placeholder="Tanggal Selesai"
							size="large" />
					</section>
					<router-link
						to="utama/form"
						class="btn btn-primary d-flex gap-1 align-items-center">
						<i class="bi bi-plus fs-1"></i>
						Tambah Ujian
					</router-link>
				</section>
				<ServerSideTable
					ref="tableRef"
					:totalRows="tableData.totalRows || 0"
					:columns="tableData.columns"
					:rows="tableData.rows"
					:sort-options="{ enabled: false }"
					@loadItems="getTableData">
					<template #table-row="{ column, row }">
						<div v-if="column.field == 'type'">
							{{ row.exam_cat_type?.toUpperCase() }}<br />
							<!-- {{ row.exam_id }}<br /> -->
							<span v-if="row.exam_parent" class="badge badge-light-success">
								Remedial
							</span>
						</div>
						<div v-if="column.field == 'max_time'">
							{{ row.exam_start_date }}<br />
							{{ row.exam_end_date }}
						</div>
						<div v-if="column.field == 'exam_status'">
							<span :class="'badge badge-light-' + (row.exam_status == 1 ? 'success' : 'danger')">
								{{ row.exam_status == 1 ? 'Aktif' : 'Non Aktif' }}
							</span>
						</div>
						<div v-if="column.field == 'action'" class="d-flex justify-content-end">
							<button v-if="!row.exam_parent" title="Remedial" class="btn btn-icon btn-bg-light btn-active-color-warning btn-sm me-2">
								<span class="svg-icon svg-icon-3">
									<inline-svg src="media/icons/duotune/arrows/arr029.svg" />
								</span>
							</button>
							<button title="Atur Ulang Waktu" class="btn btn-icon btn-bg-light btn-active-color-success btn-sm me-2">
								<span class="svg-icon svg-icon-3">
									<inline-svg src="media/icons/duotune/general/gen012.svg" />
								</span>
							</button>
							<router-link :to="'utama/form/pengaturan/' + row.exam_id" title="Edit" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
								<span class="svg-icon svg-icon-3">
									<inline-svg src="media/icons/duotune/art/art005.svg" />
								</span>
							</router-link>
							<button title="Hapus" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
								<span class="svg-icon svg-icon-3">
									<inline-svg src="media/icons/duotune/general/gen027.svg" />
								</span>
							</button>
						</div>
					</template>
				</ServerSideTable>
			</div>
		</div>
	</div>
</template>

<style scoped>
.border-dashed {
	border: 2px dashed #000;
}
</style>