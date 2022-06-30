<script setup>
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';
import { request } from '@/util';
import moment from 'moment';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import FilterSelect from '@/components/filter-select/index.vue';
import { Search } from '@element-plus/icons-vue'
import ServerSideTable from '@/components/ServerSideTable.vue';
import { computed } from '@vue/reactivity';

onMounted(() => {
  getData()
  setCurrentPageBreadcrumbs('Detail Tugas', ['LMS', 'Tugas Offline'])
})

const route = useRoute()
const answerId = route.params.id
const detailTugas = ref([])
const detailAnswer = ref([])

const answerFile = reactive({
  columns: [
    { label: 'Nama File', field: 'ta_file_nama', sortable: false },
    { label: 'Format', field: 'ta_file_ext', sortable: false },
    { label: 'Download', field: 'download', sortable: false },
  ],
  rows: [],
})

function getData() {
  request.post(`tugas/hasil-detail`, null, {
    params: {
      tugas_answer_id: answerId,
    }
  }).then(res => {
    const result = res.data.data
    detailTugas.value = result.tugas
    detailAnswer.value = result.tugas_answer

    answerFile.rows = result.tugasAnswerFile
  })
}

function formatingDate(date) {
  return {
    date: moment(date).format('DD/MM/Y'),
    time: moment(date).format('LT')
  }
}
</script>
<template>
<div>

  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="mb-4">
          <h2 class="fs-1 fw-bold py-6">Informasi Tugas</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-column gap-8 py-4">
          <div class="row">
            <div class="col-2"><h4 class="text-black-50">Judul Tugas</h4></div>
            <div class="col-10"><h4 class="fw-bold">: {{detailTugas.tugas_judul}}</h4></div>
          </div>
          <div class="row">
            <div class="col-2"><h4 class="text-black-50">Tanggal Pembuatan</h4></div>
            <div class="col-10"><h4 class="fw-bold">: 
              <span class="badge badge-primary fs-5 p-3 me-4">{{formatingDate(detailTugas.tugas_create_date).date}} <i class="ms-3 bi bi-calendar2 text-white"></i></span>
              <span class="badge badge-primary fs-5 p-3 me-4">{{formatingDate(detailTugas.tugas_create_date).time}} <i class="ms-3 bi bi-clock text-white"></i></span>
            </h4></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="mb-4">
          <h2 class="fs-1 fw-bold py-6">Informasi Jawaban Siswa</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-column gap-8 py-4">
          <div class="row">
            <div class="col-2"><h4 class="text-black-50">Nama Siswa</h4></div>
            <div class="col-10"><h4 class="fw-bold">: {{detailAnswer.user_nama}}</h4></div>
          </div>
          <div class="row">
            <div class="col-2"><h4 class="text-black-50">NIS</h4></div>
            <div class="col-10"><h4 class="fw-bold">: {{detailAnswer.siswa_nis}}</h4></div>
          </div>
          <div class="row">
            <div class="col-2"><h4 class="text-black-50">Kelas</h4></div>
            <div class="col-10"><h4 class="fw-bold">: {{detailAnswer.kelas_nama}}</h4></div>
          </div>
          <div class="row">
            <div class="col-2"><h4 class="text-black-50">Tanggal</h4></div>
            <div class="col-10"><h4 class="fw-bold">: {{detailAnswer.ta_create_date}}</h4></div>
          </div>
          <div class="row">
            <div class="col-2"><h4 class="text-black-50">File Koreksi</h4></div>
            <div class="col-10"><h4 class="fw-bold">: {{detailAnswer.ta_correction_file_name ?? 'Tidak ada data'}}</h4></div>
          </div>
          <div class="row">
            <div class="col-2"><h4 class="text-black-50">File Answer Link</h4></div>
            <div class="col-10"><h4 class="fw-bold">: {{detailAnswer.ta_correction_file_url ?? 'Link tidak ditemukan.'}}</h4></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="mb-4">
          <div class="d-flex justify-content-between">
            <h2 class="fs-1 fw-bold py-6">List File</h2>
          </div>

        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div>
          <ServerSideTable
            :totalRows="answerFile.totalRows || 0"
            :columns="answerFile.columns"
            :rows="answerFile.rows"
            @loadItems="getData"
          >
            <template #table-row="{column, row}">
              <div v-if="column.field == 'download'">
                <div>
                  <a target="_blank" :href="`https://storages.edumu.id/apiedumu/demo/apischool/public/files/${row.ta_file_nama}`" class="btn btn-primary gap-3">
                    <p class="d-flex align-items-center m-0">
                      <i class="bi bi-cloud-arrow-down fs-3"></i>
                      <span>
                        Download
                      </span>
                    </p>
                  </a>
                </div>
              </div>
            </template>
          </ServerSideTable>
        </div>
      </div>
    </div>
  </div>
</div>
</template>