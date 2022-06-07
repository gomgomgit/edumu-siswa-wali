<script setup>
import { reactive } from 'vue'
import { request } from '@/util'
import ServerSideTable from '@/components/ServerSideTable.vue'

const tableData = reactive({
	columns: [
		{ label: 'NAMA MATA PELAJARAN', field: 'mapel_nama' },
		{ label: 'STATUS', field: 'mapel_status' },
		{ label: 'ACTION', field: 'action', sortable: false, width: '200px' },
	],
	rows: [],
	totalRows: 0,
})

function getTableData (payload) {
	request.post('mapel', null, {
		params: {
			page: payload.page ?? 1,
			sortby: payload.sort?.type ?? 'ASC'
		}
	}).then(res => {
		tableData.rows = res.data.data.data
		tableData.totalRows = res.data.data.total
	})
}
</script>

<template>
	<div>
		<div class="card mb-5 mb-xxl-8">
			<div class="card-body pt-5 pb-5">
				<div class="page-header border-bottom border-black-50 mb-3">
					<div class="page-title px-3 py-7 mb-6 d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center">
						<h3 class="mb-0 fs-2x">Mata Pelajaran - Data Mapel</h3>
					</div>
					<div
						class="page-breadcrumb px-3 py-3 mb-6 d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center">
						<h3 class="mb-0 fs-4"><span class="text-black-50"> Sekolah / Mata Pelajaran / </span>Data Mapel</h3>
					</div>
				</div>

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

	</div>
</template>