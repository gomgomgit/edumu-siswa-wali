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

const grupIuranData = reactive({
	columns: [
		{ label: 'Grup Iuran', field: 'group_nama', sortable: false },
		{ label: 'Deskripsi', field: 'group_desc', sortable: false },
		{ label: 'ACTION', field: 'action', sortable: false, width: '200px' },
	],
	rows: [],
	totalRows: 0,
})

function getGrupIuran (payload) {
	request.get('iuran/group', null, {
		params: {
			page: payload?.page ?? 1,
			sortby: payload?.sort?.type
		}
	}).then(res => {
		grupIuranData.rows = res.data.data
		grupIuranData.totalRows = res.data.total
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
		request.get('iuran/group/delete/' + id)
		.then(res => {
			useToast().success('Data Berhasil Dihapus!')
			getGrupIuran()
		})
	})
}

onMounted(() => {
	setCurrentPageBreadcrumbs("Grup Iuran", ['Iuran']);
})
</script>

<template>
	<div>
		<div class="card mb-5 mb-xxl-8">
			<div class="card-body">
        <div class="page-content">
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="d-flex gap-4">
              <h2 class="fs-1 fw-bold py-6 m-0">Data Grup Iuran</h2>

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
                  Tambah Grup Iuran
                </span>
              </a>
            </div>
          </div>
          <div class="separator border-black-50 border-2 my-3"></div>
        </div>
				<ServerSideTable
					ref="tableRef"
					:totalRows="grupIuranData.totalRows || 0"
					:columns="grupIuranData.columns"
					:rows="grupIuranData.rows"
					@loadItems="getGrupIuran">
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
							<button @click="deleteData(row.group_id)" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
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