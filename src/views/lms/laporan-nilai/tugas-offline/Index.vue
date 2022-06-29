<script setup>
  import { ref, reactive, onMounted } from "vue";
  import { request } from '@/util'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import FilterSelect from '@/components/filter-select'
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import QueryString from "qs";
  import { useToast } from "vue-toast-notification"
  import { deleteConfirmation } from "@/core/helpers/deleteconfirmation";
import { computed } from "@vue/reactivity";
  
  onMounted(() => {
    setCurrentPageBreadcrumbs("Tugas Offline", ['LMS', "Laporan Nilai"]);
    getData()
  })

  function getUjianData (payload) {
    request.post('tugas/all', null, {
      params: {
        page: payload?.page ?? 1,
        sortby: payload?.sort?.type ?? 'ASC',
        mapel: mapelFilter.value,
        user: guruFilter.value,
        kelas: kelasFilter.value,
      }
    }).then(res => {
      ujianData.rows = res.data.data.tugas.data 
      ujianData.totalRows = res.data.data.tugas.total
    }).catch(err => {
      ujianData.rows = []
    })
  }
  function getData () {
    request.post('user', null, {
      params: {
        level: 'guru'
      }
    }).then(res => {
      guruOption.value = res.data.data
    })
    request.post('mapel', null)
    .then(res => {
      mapelOption.value = res.data.data
    })
    request.post('kelas', null)
    .then(res => {
      kelasOption.value = res.data.data
    })
  }

  const guruFilter = ref()
  const kelasFilter = ref()
  const mapelFilter = ref()

  const guruOption = ref([])
  const kelasOption = ref([])
  const mapelOption = ref([])

  const ujianData = reactive({
    columns: [
      { label: 'Kelas', field: 'kelas_nama', sortable: false },
      { label: 'Guru', field: 'user_nama', sortable: false },
      { label: 'Mata Pelajaran', field: 'mapel_nama', sortable: false },
      { label: 'Judul Tugas', field: 'tugas_judul', sortable: false },
      { label: 'Opsi', field: 'option', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })

function arrayKelas (arr) {
  return arr.split(',')
}

</script>

<template>
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="mb-4">
          <h2 class="fs-1 fw-bold py-6">Data Tugas Offline</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div class="d-flex gap-4">
            <div>
              <FilterSelect searchable v-model:filterValue="guruFilter" placeholder="Pilih Guru" @changeFilter="getUjianData()">
                <el-option
                  v-for="guru in guruOption"
                  :key="guru.user_id"
                  :label="guru.user_nama"
                  :value="guru.user_id"
                />
              </FilterSelect>
            </div>
            <div>
              <FilterSelect v-model:filterValue="kelasFilter" placeholder="Pilih Kelas" @changeFilter="getUjianData()">
                <el-option
                  v-for="kelas, index in kelasOption"
                  :key="kelas.kelas_id"
                  :label="kelas.kelas_nama"
                  :value="kelas.kelas_id"
                />
              </FilterSelect>
            </div>
            <div>
              <FilterSelect v-model:filterValue="mapelFilter" placeholder="Pilih Mapel" @changeFilter="getUjianData()">
                <el-option
                  v-for="mapel, index in mapelOption"
                  :key="mapel.mapel_id"
                  :label="mapel.mapel_nama"
                  :value="mapel.mapel_id"
                />
              </FilterSelect>
            </div>
          </div>
        </div>
        <div class="mb-5 mb-xxl-8">
          <ServerSideTable
            :totalRows="ujianData.totalRows || 0"
            :columns="ujianData.columns"
            :rows="ujianData.rows"
            @loadItems="getUjianData"
          >
            <template #table-row="{column, row}">
              <div v-if="column.field == 'kelas_nama'">
                <template v-for="kelas in arrayKelas(row.kelas_nama)">
                  <p class="d-block">{{kelas}}</p>
                </template>
              </div>
              <div v-if="column.field == 'exam_status'">
                <span :class="'badge badge-light-' + (row.exam_status == 1 ? 'success' : 'danger')">{{row.exam_status == 1 ? 'Aktif' : 'Non Aktif'}}</span>
              </div>
              <div v-if="column.field == 'option'">
                <router-link :to="`/lms/laporan-nilai/tugas-offline/detail/${row.tugas_id}`" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm px-2">
                  <i class="bi bi-ui-checks fs-3"></i>
                </router-link>
              </div>
            </template>
          </ServerSideTable>
        </div>
      </div>
    </div>
  </div>
</template>