<script setup>
  import { ref, reactive, onMounted } from "vue";
  import { request } from '@/util'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import FilterSelect from '@/components/filter-select'
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import QueryString from "qs";
  import { Search } from '@element-plus/icons-vue'
  import { useToast } from "vue-toast-notification"
  import { deleteConfirmation } from "@/core/helpers/deleteconfirmation";
import moment from "moment";
import { useStore } from "vuex";
  
  onMounted(() => {
    setCurrentPageBreadcrumbs("Tugas", ['LMS']);
    getData()
  })
  
  const store = useStore()
  const currentUser = store.getters.currentUser;

  function getTugasData (payload) {
    request.post('tugas/all', QueryString.stringify({
      kelas_id: currentUser.kelas_id,
      page: payload?.page ?? 1,
      mapel_id: mapelFilter.value,
      sortby: sortFilter.value,
      judul_tugas: searchTugas.value,
      siswa_id: currentUser.siswa_id,
    })).then(res => {
      tugasData.rows = res.data.data.tugas.data 
      tugasData.totalRows = res.data.data.tugas.total
    }).catch(err => {
      tugasData.rows = []
    })
  }
  function getData () {
    request.post('tugas/mapel', QueryString.stringify({
      kelas_id: currentUser.kelas_id
    }))
    .then(res => {
      mapelOption.value = res.data.data.filtermapel
    })
  }

  const sortFilter = ref()
  const mapelFilter = ref()
  const searchTugas = ref()

  const sortOption = ref([
    {value: 'pengumpulanASC',label: 'Batas Pengumpulan ASC'},
    {value: 'pengumpulanDESC',label: 'Batas Pengumpulan DESC'},
    {value: 'pembuatanASC',label: 'Tanggal Pembuatan ASC'},
    {value: 'pembuatanDESC',label: 'Tanggal Pembuatan DESC'},
  ])
  const mapelOption = ref([])

  const tugasData = reactive({
    columns: [
      { label: 'Mapel', field: 'mapel.mapel_nama', sortable: false },
      { label: 'Guru', field: 'user.user_nama', sortable: false },
      { label: 'Judul', field: 'tugas_judul', sortable: false },
      { label: 'Tgl Pembuatan', field: 'tugas_create_date' },
      { label: 'Status', field: 'tugas_status' },
      { label: 'Action', field: 'action', sortable: false, width: '100px' },
    ],
    rows: [],
    totalRows: 0,
  })

  function dateFormating(date) {
    return moment(date).format('DD/MM/Y')
  }

  function deleteData(id) {
    deleteConfirmation(function() {
      request.post('tugas/delete', QueryString.stringify({tugas_id: id}))
      .then(res => {
        useToast().success('Data Berhasil Dihapus!')
        getTugasData()
      })
    })
  }
</script>

<template>
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="d-flex flex-wrap justify-content-between align-items-center">
          <div class="d-flex gap-4">
            <h2 class="fs-1 fw-bold py-6">Data Tugas</h2>
          </div>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div class="d-flex gap-4">
            <div>
              <FilterSelect v-model:filterValue="mapelFilter" placeholder="Pilih Mapel" @changeFilter="getTugasData()">
                <el-option
                  v-for="mapel, index in mapelOption"
                  :key="mapel.mapel_id"
                  :label="mapel.mapel_nama"
                  :value="mapel.mapel_id"
                />
              </FilterSelect>
            </div>
            <div>
              <FilterSelect searchable v-model:filterValue="sortFilter" placeholder="Pilih Sortir" @changeFilter="getTugasData()">
                <el-option
                  v-for="sort in sortOption"
                  :key="sort.value"
                  :label="sort.label"
                  :value="sort.value"
                />
              </FilterSelect>
            </div>
          </div>
          
          <div class="d-flex w-100 w-lg-50 w-xl-25 gap-4">
              <el-input
                v-model="searchTugas"
                clearable
                class="m-2"
                placeholder="Cari Judul"
                @input="getTugasData"
              >
                <template #append>
                  <el-button aria-disabled="true" class="pe-none" :icon="Search" />
                </template>
              </el-input>
          </div>
        </div>
        <div class="mb-5 mb-xxl-8">
          <ServerSideTable
            :totalRows="tugasData.totalRows || 0"
            :columns="tugasData.columns"
            :rows="tugasData.rows"
            @loadItems="getTugasData"
          >
            <template #table-row="{column, row}">
              <div v-if="column.field == 'tugas_status'">
                <span :class="'badge badge-light-' + (row.tugas_status == 1 ? 'success' : 'danger')">{{row.tugas_status == 1 ? 'Aktif' : 'Non Aktif'}}</span>
              </div>
              <div v-if="column.field == 'tugas_create_date'">
                {{dateFormating(row.tugas_create_date)}}
              </div>
              <div v-if="column.field == 'action'">
                <router-link :to="`/lms/tugas/detail/${row.tugas_id}`" class="btn btn-icon btn-bg-light btn-active-color-success btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/files/fil001.svg" />
                  </span>
                </router-link>
              </div>
            </template>
          </ServerSideTable>
        </div>
      </div>
    </div>
  </div>
</template>