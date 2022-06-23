<script setup>
import { reactive, onMounted, ref } from 'vue'
import { request } from '@/util'
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';

import ServerSideTable from '@/components/ServerSideTable.vue'
// import FilterSelect from '@/components/filter-select/index.vue'
import FormModal from './FormModal.vue'
import { deleteConfirmation } from '@/core/helpers/deleteconfirmation';
import { useToast } from 'vue-toast-notification';
import FilterSelect from '@/components/filter-select/index.vue';

const tableRef = ref()
const formMode = ref('')
const activeData = ref({})

const grupIuran = ref({})
const filterGrup = ref('')

const masterIuranData = reactive({
	columns: [
		{ label: 'Grup Iuran', field: 'group_nama', sortable: false },
		{ label: 'Jenis Iuran', field: 'tipe_nama', sortable: false },
		{ label: 'Nominal', field: 'master_nominal', sortable: false },
		{ label: 'Jatuh Tempo', field: 'master_tgl_jatuh_tempo', sortable: false },
		{ label: 'ACTION', field: 'action', sortable: false, width: '200px' },
	],
	rows: [],
	totalRows: 0,
})

function getMasterIuran (payload) {
	request.get('iuran/master', {
		params: {
			group_id: filterGrup.value,
			page: payload?.page ?? 1,
			sortby: payload?.sort?.type
		}
	}).then(res => {
		masterIuranData.rows = res.data.data.data
		masterIuranData.totalRows = res.data.data.total
	})
}
function getGrupIuran (payload) {
	request.get('iuran/group', null, {
	}).then(res => {
		grupIuran.value = res.data.data
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
		request.get('iuran/master/delete/' + id)
		.then(res => {
			useToast().success('Data Berhasil Dihapus!')
			getMasterIuran()
		})
	})
}
function changeGroup() {
	tableRef.value.loadItems()
	console.log(filterGrup.value)
}

onMounted(() => {
	setCurrentPageBreadcrumbs("Master Iuran", ['Iuran']);
	getGrupIuran()
})
</script>

<template>
	<div>
		<div class="card mb-5 mb-xxl-8">
			<div class="card-body">
        <div class="page-content">
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="d-flex gap-4">
              <h2 class="fs-1 fw-bold py-6 m-0">Data Master Iuran</h2>

              <!-- <div>
                <FilterSelect v-model:filterValue="semesterFilter" :options="semesterOption" @changeFilter="changeFilter('semester')" placeholder="Pilih Semester" />
              </div>
              <div>
                <FilterSelect v-model:filterValue="statusFilter" :options="statusOption" @changeFilter="changeFilter('status')" placeholder="Pilih Status" />
              </div> -->
            </div>

            <!-- <div class="position-relative d-flex ">
              <a @click="formMode = 'Tambah Data'" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                <i class="bi bi-plus fs-1"></i>
                <span>
                  Tambah Master Iuran
                </span>
              </a>
            </div> -->
          </div>
          <div class="separator border-black-50 border-2 my-3"></div>
					
					<div class="mb-4">
						<div class="d-flex flex-wrap justify-content-between align-items-center">
								<div>
									<FilterSelect 
										v-model:filterValue="filterGrup"
										@changeFilter="changeGroup"
										placeholder="Pilih Grup">
										<template v-for="grup in grupIuran">
											<el-option :value="grup.group_id" :label="grup.group_nama"></el-option>
										</template>
									</FilterSelect>
								</div>
								<div class="position-relative d-flex ">
									<a @click="formMode = 'Tambah Data'" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
										<i class="bi bi-plus fs-1"></i>
										<span>
											Tambah Master Iuran
										</span>
									</a>
								</div>
						</div>
					</div>
        </div>
				<ServerSideTable
					ref="tableRef"
					:totalRows="masterIuranData.totalRows || 0"
					:columns="masterIuranData.columns"
					:rows="masterIuranData.rows"
					@loadItems="getMasterIuran">
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
							<button @click="deleteData(row.master_id)" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-2">
								<span class="svg-icon svg-icon-3">
									<inline-svg src="media/icons/duotune/general/gen027.svg"/>
								</span>
							</button>
							<router-link :to="`/iuran/master-iuran/penetapan/${row.master_id}/${row.group_nama}`" class="btn btn-icon btn-bg-light btn-active-color-success btn-sm">
								<span class="svg-icon svg-icon-3">
									<i class="bi bi-three-dots-vertical fs-3"></i>
								</span>
							</router-link>
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