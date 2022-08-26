<script setup>
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';
import { request } from '@/util';
import moment from 'moment';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FilterSelect from '@/components/filter-select/index.vue';
import { Search } from '@element-plus/icons-vue'
import ServerSideTable from '@/components/ServerSideTable.vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';

onMounted(() => {
  getData()
  setCurrentPageBreadcrumbs('Detail', ['LMS', 'Ujian Online'])
})

const store = useStore()
const currentUser = store.getters.currentUser

const route = useRoute()
const router = useRouter()

const examId = route.params.id
const detailData = ref('')
const hint = ref([])

const notPermitted = ref(false)

function startExam() {
  console.log(detailData.value.entry_status)
  if (detailData.value.entry_status == 'finish') {
    Swal.fire({
        icon: 'error',
        title: 'Ujian Sudah Selesai',
        showCancelButton: true,
        showConfirmButton: detailData.value.exam_show_score == '1',
        reverseButtons: true,
        confirmButtonText: 'Lihat Hasil',
        cancelButtonText: 'Kembali'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/lms/ujian-online/result/${examId}`)
        }
        if (result.isDismissed) {
          router.push(`/lms/ujian-online`)
        }
      })
  } else {
    router.push(`/lms/ujian-online/soal/${examId}`)
  }
}

function getData() {
  axios.post(`https://apiujian.edumu.id/${currentUser.sekolah_kode}/apischool/siswawali/exam/detail`, null, {
    params: {
      examId: examId,
      siswa_id: currentUser.siswa_id,
    }
  }).then(res => {
    detailData.value = res.data.data.exams
  }).catch(err => {
    notPermitted.value = true
  })
  
  axios.post('https://apisekolah.edumu.id/v3prod/content/content/petunjuk-pengerjaan-ujian', null)
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
</script>
<template>
<div>

  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="mb-4">
          <h2 class="fs-1 fw-bold py-3">Detail</h2>
        </div>
        <div class="separator border-black-50 border-2 my-3"></div>
        <div class="row py-4">
          <div class="col-2"><h4 class="text-black-50">Nama Guru</h4></div>
          <div class="col-9"><h4 class="fw-bold">: {{detailData.user_username}}</h4></div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="row py-4">
              <div class="col-4"><h4 class="text-black-50">Nama Mapel</h4></div>
              <div class="col-8"><h4 class="fw-bold">: {{detailData.mapel_nama}}</h4></div>
            </div>
            <div class="row py-4">
              <div class="col-4"><h4 class="text-black-50">Judul</h4></div>
              <div class="col-8"><h4 class="fw-bold">: {{detailData.exam_title}}</h4></div>
            </div>
            <div class="row py-4">
              <div class="col-4"><h4 class="text-black-50">Tanggal Mulai</h4></div>
              <div class="col-8"><h4 class="fw-bold mb-0">: 
                <span class="badge badge-primary fs-5 p-3 me-4">{{formatingDate(detailData.exam_start_date).date}} <i class="ms-3 bi bi-calendar2 text-white"></i></span>
                <span class="badge badge-primary fs-5 p-3 me-4">{{formatingDate(detailData.exam_start_date).time}} <i class="ms-3 bi bi-clock text-white"></i></span>
              </h4></div>
            </div>
            <div class="row py-4">
              <div class="col-4"><h4 class="text-black-50">Waktu</h4></div>
              <div class="col-8"><h4 class="fw-bold">: {{detailData.exam_time_limit}} Menit</h4></div>
            </div>
          </div>
          <div class="col-6">
            <div class="row py-4">
              <div class="col-4"><h4 class="text-black-50">Jumlah Soal</h4></div>
              <div class="col-8"><h4 class="fw-bold">: {{detailData.count_exam}}</h4></div>
            </div>
            <div class="row py-4">
              <div class="col-4"><h4 class="text-black-50">Deskripsi</h4></div>
              <div class="col-8"><h4 class="fw-bold">: {{detailData.exam_desc}}</h4></div>
            </div>
            <div class="row py-4">
              <div class="col-4"><h4 class="text-black-50">Tanggal Selesai</h4></div>
              <div class="col-8"><h4 class="fw-bold mb-0">: 
                <span class="badge badge-primary fs-5 p-3 me-4">{{formatingDate(detailData.exam_end_date).date}} <i class="ms-3 bi bi-calendar2 text-white"></i></span>
                <span class="badge badge-primary fs-5 p-3 me-4">{{formatingDate(detailData.exam_end_date).time}} <i class="ms-3 bi bi-clock text-white"></i></span>
              </h4></div>
            </div>
            <div class="row py-4">
              <div class="col-4"><h4 class="text-black-50">Status</h4></div>
              <div class="col-8"><h4 class="fw-bold">: {{detailData.exam_status ? 'Aktif' : 'Non Aktif'}}</h4></div>
            </div>
          </div>
        </div>
        <div class="separator border-black-50 border-2 my-3"></div>
        <div v-if="notPermitted || !detailData.can_start">
          <div class="alert alert-dismissible bg-danger d-flex flex-column align-items-center gap-4 flex-sm-row p-5">
            <span class="svg-icon svg-icon-2hx svg-icon-light me-4 mb-sm-0">
              <i class="bi bi-exclamation-triangle-fill text-white fs-1"></i>
            </span>
            <div class="d-flex flex-column text-white pe-0 pe-sm-10">
                <h4 class="mb-0 text-white">Anda tidak diperbolehkan mengerjakan ujian, mohon hubungi admin untuk meminta akses.</h4>
            </div>
          </div>
        </div>
        <div v-if="detailData && detailData.can_start" class="d-flex justify-content-end">
          <a @click="startExam()" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
            <i class="bi bi-play-fill fs-1"></i>
            <span>
              Mulai
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="mb-4">
          <div class="d-flex justify-content-between">
            <h2 class="fs-1 fw-bold py-4">{{hint.content_name}}</h2>
          </div>
        </div>
        <div class="separator border-black-50 border-2 mb-6"></div>
        <div>
          <div v-html="hint.content_desc"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>