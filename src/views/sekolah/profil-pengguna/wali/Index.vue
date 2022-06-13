<script setup>
import { ref, onMounted, reactive } from "vue";
import { request } from '@/util'
import Modal from "@/components/modals/CustomModal.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import ServerSideTable from '@/components/ServerSideTable.vue'
import FilterSelect from '@/components/filter-select'
import { Search } from '@element-plus/icons-vue'

onMounted(() => {
  setCurrentPageBreadcrumbs("Wali", ['Sekolah', "Profil Pengguna"]);
})

function getWali(payload) {
  request.post('user', null, {
    params: {
      level: 'wali',
      cari: searchWali.value,
      page: payload.page ?? 1,
      sortby: payload.sort?.type ?? 'ASC'
    }
  }).then(res => {
    wali.rows = res.data.data.data
    wali.totalRows = res.data.data.total
  })
}

const loadingTahunAjar = ref(false)

const wali = reactive({
  columns: [
    { label: 'Nama Lengkap', field: 'user_nama' },
    { label: 'Username', field: 'user_username' },
    { label: 'Level', field: 'user_level' },
    { label: 'Status', field: 'user_status' },
    // { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
  ],
  rows: [],
  totalRows: 0,
})

const searchWali = ref('')

const modalData = ref(false)

const statusOption = [
  {
    value: 1,
    label: 'Aktif',
  },
  {
    value: 0,
    label: 'Non Aktif',
  },
]


function changeFilter(changed) {
  console.log(changed)
}
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <h2 class="fs-1 fw-bold py-6">Data Wali</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div>
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-4">
            <div class="d-flex w-25 gap-4">
              <el-input v-model="searchWali" clearable class="m-2" placeholder="Cari Wali">
                <template #append>
                  <el-button aria-disabled="true" class="pe-none" :icon="Search" />
                </template>
              </el-input>
            </div>

            <div class="position-relative d-flex gap-4">
              <div class="d-flex align-items-center">
                <router-link to="/sekolah/profil-pengguna/wali/tambah-data" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                  <i class="bi bi-plus fs-1"></i>
                  <span>
                    Tambah Wali
                  </span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="my-5 mb-xxl-8">
          <ServerSideTable :key="searchWali" :totalRows="wali.totalRows || 0" :columns="wali.columns"
            :rows="wali.rows" @loadItems="getWali">
            <template #table-row="{ column, row }">
              <div v-if="column.field == 'user_status'">
                <span
                  :class="'badge badge-light-' + (row.user_status == '1' ? 'success' : 'danger')"
                >
                  {{row.user_status == '1' ? 'Aktif' : 'Non Aktif'}}
                </span>
              </div>
              <div v-if="column.field == 'action'">
                <button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/files/fil001.svg" />
                  </span>
                </button>
                <button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/art/art005.svg" />
                  </span>
                </button>
                <button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
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
  </div>
</template>