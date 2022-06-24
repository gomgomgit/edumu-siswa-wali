<script setup>
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb'
import ServerSideTable from '@/components/ServerSideTable.vue'
import { onMounted, reactive, ref } from 'vue';
import { request } from '@/util';
import FormModal from './FormModal';
import { useToast } from 'vue-toast-notification';
import { deleteConfirmation } from '@/core/helpers/deleteconfirmation';


onMounted(() => {
	setCurrentPageBreadcrumbs('Waktu Absensi', ['Absensi'])
})

const tableRef = ref()
const formMode = ref('')
const activeData = ref({})

const tableData = reactive({
	columns: [
		{ label: 'Nama', field: 'name', sortable: false },
		{ label: 'Jam Masuk', field: 'start', sortable: false },
		{ label: 'Jam Pulang', field: 'end', sortable: false },
		{ label: 'Action', field: 'action', sortable: false, width: '200px' }
	],
	rows: [],
	totalRows: 0
})

function getTableData(payload) {
	request.post('shift', null, {
		params: {
			page: payload?.page ?? 1
		}
	}).then(res => {
		console.log(res)
		tableData.rows = res.data.data.data
		tableData.totalRows = res.data.data.total
	})
}

function handleEdit (row) {
	activeData.value = row
	formMode.value = 'Edit Data'
	console.log(activeData.value)
}

function handleFormClose (row) {
	activeData.value = {}
	formMode.value = ''
}

function deleteData(id) {
	deleteConfirmation(function() {
		request.get('shift/delete/' + id)
		.then(res => {
			useToast().success('Data Berhasil Dihapus!')
			getTableData()
		})
	})
}
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
						<a @click="formMode = 'Tambah Data'" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
							<i class="bi bi-plus fs-1"></i>
							<span>Tambah Waktu Absensi</span>
						</a>
					</div>
				</div>
				<div class="separator border-black-50 border-2 my-3"></div>
			</div>
		</div>
		<div class="mb-5 mb-xxl-8 px-12">
			<ServerSideTable
				ref="tableRef"
				:totalRows="tableData.totalRows || 0"
				:columns="tableData.columns"
				:rows="tableData.rows"
				@loadItems="getTableData"
			>
				<template #table-row="{column, row}">
					<div v-if="column.field == 'action'">
						<button
							@click="handleEdit(row)"
							class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
							<span class="svg-icon svg-icon-3">
								<inline-svg src="media/icons/duotune/art/art005.svg" />
							</span>
						</button>
						<button @click="deleteData(row.id)" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
							<span class="svg-icon svg-icon-3">
								<inline-svg src="media/icons/duotune/general/gen027.svg" />
							</span>
						</button>
					</div>
				</template>
			</ServerSideTable>
		</div>
		
		<FormModal
			:mode="formMode"
			:activeData="activeData"
			@close="handleFormClose"
			@submit="tableRef.loadItems()" />
	</div>
</template>