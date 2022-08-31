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
import moment from "moment";
import { useStore } from "vuex";
  
  onMounted(() => {
    setCurrentPageBreadcrumbs("Materi Video", ['LMS', 'Materi']);
    getData()
  })

  const store = useStore()
  const currentUser = store.getters.currentUser;
  const storageUrl = process.env.VUE_APP_STORAGE_URL;

  function getMateriData (payload) {
    request.post('materi/all', QueryString.stringify({
      kelas_id: currentUser.kelas_id,
      user_id: guruFilter.value == '' ? '0' : guruFilter.value,
      mapel_id: mapelFilter.value == '' ? '0' : mapelFilter.value,
      page: payload?.page ?? 1
    })).then(res => {
      
      materiData.rows = res.data.data.materi.data
      materiData.totalRows = res.data.data.materi.total
    }).catch(err => {
      materiData.rows = []
    })
  }
  function getData () {
    request.post('materi/guru')
    .then(res => {
      guruOption.value = res.data.data.filterguru
    })
    request.post('materi/mapel',  QueryString.stringify({
      kelas_id: currentUser.kelas_id
    }))
    .then(res => {
      mapelOption.value = res.data.data.filtermapel
    })
  }

  const guruFilter = ref()
  const mapelFilter = ref()

  const guruOption = ref([])
  const mapelOption = ref([])
  
  const tableRef = ref()
  const formMode = ref()
  const activeData = ref()

  const materiData = reactive({
    columns: [
      { label: 'Mapel', field: 'mapel.mapel_nama', sortable: false },
      { label: 'Judul', field: 'materi_judul', sortable: false },
      { label: 'Guru', field: 'user.user_nama', sortable: false },
      { label: 'File/Link', field: 'materi_file', sortable: false },
      { label: 'Ukuran File', field: 'materi_filesize', sortable: false },
      { label: 'Action', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })

  function dateFormating(date) {
    return moment(date).format('DD/MM/Y')
  }

  function deleteData(id) {
    deleteConfirmation(function() {
      request.post('materi/delete', QueryString.stringify({materi_id: id}))
      .then(res => {
        useToast().success('Data Berhasil Dihapus!')
        getMateriData()
      })
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
</script>

<template>
<div>
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="d-flex flex-wrap justify-content-between align-items-center">
          <div class="d-flex gap-4">
            <h2 class="fs-1 fw-bold py-6">Data Materi Video</h2>
          </div>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div class="d-flex gap-4">
            <div>
              <FilterSelect v-model:filterValue="mapelFilter" placeholder="Pilih Mapel" @changeFilter="getMateriData()">
                <el-option
                  v-for="mapel in mapelOption"
                  :key="mapel.mapel_id"
                  :label="mapel.mapel_nama"
                  :value="mapel.mapel_id"
                />
              </FilterSelect>
            </div>
            <div>
              <FilterSelect searchable v-model:filterValue="guruFilter" placeholder="Pilih Guru" @changeFilter="getMateriData()">
                <el-option
                  v-for="guru in guruOption"
                  :key="guru.user_id"
                  :label="guru.user_nama"
                  :value="guru.user_id"
                />
              </FilterSelect>
            </div>
          </div>
        </div>
        <div class="mb-5 mb-xxl-8">
          <ServerSideTable
            ref="tableRef"
            :totalRows="materiData.totalRows || 0"
            :columns="materiData.columns"
            :rows="materiData.rows"
            :sort-options="{
              enabled: true,
              initialSortBy: {field: 'materi_id', type: 'desc'}
            }"
            @loadItems="getMateriData"
          >
            <template #table-row="{column, row}">
              <div v-if="column.field == 'materi_file'">
                <i :class="`text-primary bi ${row.materi_tipe == 'video' ? 'bi-play-circle-fill' : 'bi-file-earmark-font-fill' }`"></i>
                {{row.materi_tipe == 'video' ? 'https://www.youtube.com/watch?v=' + row.materi_file : row.materi_file}}
              </div>
              <div v-if="column.field == 'materi_filesize'">
                {{row.materi_tipe == 'video' ? '-' : row.materi_filesize}}
              </div>
              <div v-if="column.field == 'materi_create_date'">
                {{dateFormating(row.materi_create_date)}}
              </div>
              <div v-if="column.field == 'action'">
                <a :href="row.materi_tipe == 'video' ? 'https://www.youtube.com/watch?v=' + row.materi_file : `${storageUrl}/${currentUser.sekolah_kode}/apischool/public` + '/files/' + row.materi_file" target="_blank" class="btn btn-bg-light btn-active-color-primary btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <i :class="`bi ${row.materi_tipe == 'video' ? 'bi-play-fill' : 'bi-cloud-arrow-down'} fs-2`"></i>{{row.materi_tipe == 'video' ? 'Youtube' : 'Download'}} 
                  </span>
                </a>
              </div>
            </template>
          </ServerSideTable>
        </div>
      </div>
    </div>
  </div>
  
</div>
</template>