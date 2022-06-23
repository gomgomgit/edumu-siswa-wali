<script setup>
import { reactive, onMounted, ref } from 'vue'
import { request } from '@/util'
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';

import ServerSideTable from '@/components/ServerSideTable.vue'
// import FilterSelect from '@/components/filter-select/index.vue'
import FormModal from './FormModal.vue'
import { deleteConfirmation } from '@/core/helpers/deleteconfirmation';
import { useToast } from 'vue-toast-notification';

const tableRef = ref()
const formMode = ref('')
const activeData = ref({})

const jenisIuranData = reactive({
	columns: [
		{ label: 'Jenis Iuran', field: 'tipe_nama', sortable: false },
		{ label: 'Deskripsi', field: 'tipe_desc', sortable: false },
		{ label: 'ACTION', field: 'action', sortable: false, width: '200px' },
	],
	rows: [],
	totalRows: 0,
})

function getJenisIuran (payload) {
	request.get('iuran/tipe', null, {
		params: {
			page: payload?.page ?? 1,
			sortby: payload?.sort?.type
		}
	}).then(res => {
		jenisIuranData.rows = res.data.data
		jenisIuranData.totalRows = res.data.total
	})
}

function handleEdit (row) {
	activeData.value = row
	formMode.value = 'Edit Data'
}

function handleFormClose (row) {
	activeData.value = {}
	formMode.value = ''
}

function deleteData(id) {
	deleteConfirmation(function() {
		request.get('iuran/tipe/delete/' + id)
		.then(res => {
			useToast().success('Data Berhasil Dihapus!')
			getJenisIuran()
		})
	})
}

onMounted(() => {
	setCurrentPageBreadcrumbs("Jenis Iuran", ['Iuran']);
})
</script>

<template>
	<div>
		<div class="card mb-5 mb-xxl-8">
			<div class="card-body">
        <div class="page-content">
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="d-flex gap-4">
              <h2 class="fs-1 fw-bold py-6 m-0">Data Jenis Iuran</h2>

              <!-- <div>
                <FilterSelect v-model:filterValue="semesterFilter" :options="semesterOption" @changeFilter="changeFilter('semester')" placeholder="Pilih Semester" />
              </div>
              <div>
                <FilterSelect v-model:filterValue="statusFilter" :options="statusOption" @changeFilter="changeFilter('status')" placeholder="Pilih Status" />
              </div> -->
            </div>

            <div class="position-relative d-flex ">
              <a @click="formMode = 'Tambah Data'" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                <i class="bi bi-plus fs-1"></i>
                <span>
                  Tambah Jenis Iuran
                </span>
              </a>
            </div>
          </div>
          <div class="separator border-black-50 border-2 my-3"></div>
        </div>
				<ServerSideTable
					ref="tableRef"
					:totalRows="jenisIuranData.totalRows || 0"
					:columns="jenisIuranData.columns"
					:rows="jenisIuranData.rows"
					@loadItems="getJenisIuran">
					<template #table-row="{column, row}">
						<div v-if="column.field == 'mapel_status'">
							<span :class="'badge badge-light-' + (row.mapel_status == 1 ? 'success' : 'danger')">
								{{row.mapel_status == 1 ? 'Aktif' : 'Non Aktif'}}
							</span>
						</div>
						<div v-if="column.field == 'action'">
							<button
								class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2"
								@click="handleEdit(row)">
								<span class="svg-icon svg-icon-3">
									<inline-svg src="media/icons/duotune/art/art005.svg" />
								</span>
							</button>
							<button @click="deleteData(row.tipe_id)" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
								<span class="svg-icon svg-icon-3">
									<inline-svg src="media/icons/duotune/general/gen027.svg"/>
								</span>
							</button>
						</div>
					</template>
				</ServerSideTable>
			</div>
		</div>

		<FormModal
			:mode="formMode"
			:activeData="activeData"
			@close="handleFormClose"
			@submit="tableRef.loadItems()" />
	</div>
</template>