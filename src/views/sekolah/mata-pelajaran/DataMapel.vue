<script setup>
import { reactive, onMounted } from 'vue'
import { request } from '@/util'
import ServerSideTable from '@/components/ServerSideTable.vue'
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';

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

onMounted(() => {
	setCurrentPageBreadcrumbs("Data Mapel", ['Sekolah', "Mata Pelajaran"]);
})
</script>

<template>
	<div>
		<div class="card mb-5 mb-xxl-8">
			<div class="card-body pt-5 pb-5">

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