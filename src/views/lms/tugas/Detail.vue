<script setup>
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';
import { request } from '@/util';
import moment from 'moment';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import FilterSelect from '@/components/filter-select/index.vue';
import { Search } from '@element-plus/icons-vue'
import ServerSideTable from '@/components/ServerSideTable.vue';
import { computed } from '@vue/reactivity';
import QueryString from "qs";
import { useStore } from 'vuex';
import axios from 'axios';
import FileDrop from "@/components/file-dropzone/Index.vue"
import { useToast } from 'vue-toast-notification';


onMounted(() => {
  setCurrentPageBreadcrumbs('Detail Tugas', ['LMS', 'Tugas Offline'])
  getData()
})

const store = useStore()
const currentUser = store.getters.currentUser

const route = useRoute()
const tugasId = route.params.id
const detailData = ref([])
const hint = ref([])

const fileUpload = ref('')
const linkUpload = ref('')

const dataFile = reactive({
  columns: [
    { label: 'Nama Item', field: 'tugas_file_nama', sortable: false },
    { label: 'Format', field: 'tugas_file_ext', sortable: false },
    { label: 'Download', field: 'download', sortable: false },
  ],
  rows: [],
})

const dataHasil = reactive({
  columns: [
    { label: 'Nama', field: 'ta_file_nama', sortable: false },
    { label: 'Format', field: 'ta_file_ext', sortable: false },
    { label: 'Action', field: 'action', sortable: false },
  ],
  rows: [],
})

function getData() {
  request.post(`tugas/detail`, QueryString.stringify({
      tugas_id: tugasId,
      siswa_id: currentUser.siswa_id,
      userId: currentUser.user_id,
  })).then(res => {
    detailData.value = res.data.data.tugas[0]

    dataFile.rows = res.data.data.tugas[0].tugas_file

    if (res.data.data.tugas[0].tugas_answer) {
      dataHasil.rows = res.data.data.tugas[0].tugas_answer.answerFiles
    } else {
      dataHasil.rows = []
    }
  })
  
  axios.post('https://apisekolah.edumu.id/v3prod/content/content/petunjuk-penggunaan-tugas')
  .then(res => {
    hint.value = res.data.data
  })
}

function formatingDate(date) {
  return {
    date: moment(date).format('DD/MM/Y'),
    time: moment(date).format('LT')
  }
}

function postLink() {
  request.post(`tugas/upload-url`, QueryString.stringify({
      tugas_id: tugasId,
      siswa_id: currentUser.siswa_id,
      ta_url: linkUpload.value,
  })).then(res => {
    linkUpload.value = ''
    useToast().success('Link Dikirim!')

    getData()
  })
}

function postFile() {
  var formData = new FormData()
  formData.append('tugas_id', tugasId)
  formData.append('siswa_id', currentUser.siswa_id)
  formData.append('answer_file', fileUpload.value)

  request.post(`tugas/upload-answer`, formData
  ).then(res => {
    linkUpload.value = ''
    useToast().success('File Dikirim!')

    getData()
  })
}

function deleteAnswer(id) {
  request.post(`tugas/answer-del`,  QueryString.stringify({
      ta_file_id: id
  })).then(res => {
    getData()
    useToast().success('Berhasil dihapus!')
  })

}

watch(() => fileUpload.value, () => {
    postFile()
  }
)
</script>
<template>
<div>

  <div class="row">
    <div class="col-6">
      <div class="card mb-5 mb-xxl-8">
        <div class="card-body pt-5 pb-5">
          <div class="page-content">
            <div class="mb-4">
              <h2 class="fs-1 fw-bold py-6">Informasi Tugas</h2>
            </div>
            <div class="separator border-black-50 border-2 my-6"></div>
            <div class="d-flex flex-column gap-8 py-4">
              <div class="row">
                <div class="col-5"><h4 class="text-black-50">Judul</h4></div>
                <div class="col-7"><h4 class="fw-bold">: {{detailData.tugas_judul}}</h4></div>
              </div>
              <div class="row">
                <div class="col-5"><h4 class="text-black-50">Tanggal Pembuatan</h4></div>
                <div class="col-7"><h4 class="fw-bold">: 
                  <span class="badge badge-primary fs-5 p-3 me-4">{{formatingDate(detailData.tugas_create_date).date}} <i class="ms-3 bi bi-calendar2 text-white"></i></span>
                  <span class="badge badge-primary fs-5 p-3 me-4">{{formatingDate(detailData.tugas_create_date).time}} <i class="ms-3 bi bi-clock text-white"></i></span>
                </h4></div>
              </div>
              <div class="row">
                <div class="col-5"><h4 class="text-black-50">Batas Pengumpulan</h4></div>
                <div class="col-7"><h4 class="fw-bold">: 
                  <span class="badge badge-primary fs-5 p-3 me-4">{{formatingDate(detailData.tugas_due_date).date}} <i class="ms-3 bi bi-calendar2 text-white"></i></span>
                  <span class="badge badge-primary fs-5 p-3 me-4">{{formatingDate(detailData.tugas_due_date).time}} <i class="ms-3 bi bi-clock text-white"></i></span>
                </h4></div>
              </div>
              <div class="row">
                <div class="col-5"><h4 class="text-black-50">Mata Pelajaran</h4></div>
                <div class="col-7"><h4 class="fw-bold">: {{detailData.mapel?.mapel_nama}}</h4></div>
              </div>
              <div class="row">
                <div class="col-5"><h4 class="text-black-50">Guru</h4></div>
                <div class="col-7"><h4 class="fw-bold">: {{detailData.user?.user_nama}}</h4></div>
              </div>
              <div class="row">
                <div class="col-5"><h4 class="text-black-50">Progress</h4></div>
                <div class="col-7 d-flex align-items-center gap-3">
                  <h4 class="fw-bold">: </h4>
                  <span :class="`badge badge-${detailData.tugas_progress == 'answer' ? 'success' : 'danger'} fs-4 p-2`">{{detailData.tugas_progress_text}}</span>
                </div>
              </div>

              <div>
                <div class="fw-bold mb-3">
                  <p class="mb-0 fs-4">{{hint.content_name}}</p>
                  <div v-html="hint.content_desc">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
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
                :totalRows="dataFile.totalRows || 0"
                :columns="dataFile.columns"
                :rows="dataFile.rows"
                :pagination-options="{
                  enabled: false
                }"
                @loadItems="getData"
              >
                <template #table-row="{column, row}">
                  <div v-if="column.field == 'download'">
                    <a target="_blank" :href="row.tugas_file_url" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                      <span class="svg-icon svg-icon-3">
                        <i class="bi bi-cloud-arrow-down-fill fs-3"></i>
                      </span>
                    </a>
                  </div>
                </template>
              </ServerSideTable>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentUser.user_level == 'siswa'" class="card mb-5 mb-xxl-8">
        <div class="card-body pt-5 pb-5">
          <div class="page-content">
            <div class="mb-4">
              <div class="d-flex justify-content-between">
                <h2 class="fs-1 fw-bold py-6">Upload File</h2>
              </div>

            </div>
            <div class="separator border-black-50 border-2 my-6"></div>
            <div>
              <FileDrop :showFile="false" v-model:fileInputData="fileUpload"></FileDrop>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentUser.user_level == 'siswa'" class="card mb-5 mb-xxl-8">
        <div class="card-body pt-5 pb-5">
          <div class="page-content">
            <div class="mb-4">
              <div class="d-flex justify-content-between">
                <h2 class="fs-1 fw-bold py-6">Upload Link</h2>
              </div>

            </div>
            <div class="separator border-black-50 border-2 my-6"></div>
            <div>
              <div class="row">
                <div class="col-3 align-items-center d-flex">
                  <p class="m-0 fs-4 fw-bold">Link</p>
                </div>
                <div class="col-9 align-items-center d-flex gap-4">
                  <el-input v-model="linkUpload" placeholder="Masukkan Link" />
                </div>
              </div>
              <div class="d-flex justify-content-end gap-4 mt-4">
                <a @click.prevent="postLink" class="btn btn-primary">Kirim</a>
              </div>
            </div>
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
            <h2 class="fs-1 fw-bold py-6">Jawaban</h2>
          </div>

        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div>
          <div v-if="dataHasil.rows.length > 0" class="d-flex gap-4">
            <div
              class="bg-light-primary d-flex align-items-center rounded p-5 mb-7"
            >
              <span class="bg-light-primary symbol-label">
                <span class="svg-icon-primary svg-icon me-5 svg-icon-3x">
                    <inline-svg src="media/icons/duotune/general/gen055.svg" />
                </span>
              </span>
              <div class="flex-grow-1 me-6">
                <span
                  class="fw-bolder text-gray-800 fs-3">Nilai</span>
                <span class="text-primary fw-bolder d-block py-1 fs-1">{{detailData.tugas_answer.ta_nilai ?? 0}}</span>
              </div>
            </div>
            <div
              class="bg-light-primary d-flex align-items-center rounded p-5 mb-7"
            >
              <span class="bg-light-primary symbol-label">
                <span class="svg-icon-primary svg-icon me-5 svg-icon-3x">
                    <inline-svg src="media/icons/duotune/graphs/gra010.svg" />
                </span>
              </span>
              <div class="flex-grow-1 me-6">
                <span
                  class="fw-bolder text-gray-800 fs-3">Status</span>
                <span class="fw-bolder d-block py-1 fs-1">
                  <span :class="`badge badge-${detailData.tugas_answer.ta_status == 'answer' ? 'success' : 'danger'} fs-4 p-2`">{{detailData.tugas_answer.ta_status}}</span>
                </span>

              </div>
            </div>
          </div>
          <ServerSideTable
            :totalRows="dataHasil.totalRows || 0"
            :columns="dataHasil.columns"
            :rows="dataHasil.rows"
            @loadItems="getHasil"
          >
            <template #table-row="{column, row}">
              <div v-if="column.field == 'action'">
                <div class="d-flex gap-3">
                  <div>
                    <a target="_blank" :href="row.ta_file_url" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                      <span class="svg-icon svg-icon-3">
                        <i class="bi bi-cloud-arrow-down-fill fs-3"></i>
                      </span>
                    </a>
                  </div>
                  <div>
                    <a @click="deleteAnswer(row.ta_file_id)" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-2">
                      <span class="svg-icon svg-icon-3">
                        <inline-svg src="media/icons/duotune/general/gen027.svg"/>
                      </span>
                    </a>
                  </div>
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