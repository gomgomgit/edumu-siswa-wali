<script setup>
import { onMounted, reactive, ref } from 'vue'
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { request } from '@/util';
import QueryString from 'qs';
import { useToast } from 'vue-toast-notification';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import * as XLSX from 'xlsx';

onMounted(() => {
  setCurrentPageBreadcrumbs("Export Presensi", ['Absensi', 'Rekapitulasi', 'Siswa']);
  getQueue()
})

const store = useStore()
const userId = store.getters.currentUser.user_id 

const router = useRouter()
const route = useRoute()

const kelasOption = ref()

const reportQueue = ref()

const exportData = ref([])
const exportDate = ref()

const form = reactive({
  status_import: '',
  kelas_id: '',
  file: null,
})

function getQueue() {
  console.log(route.query)
  request.post('reportsiswanew', null, {
    params: {
      level: 'siswa',
      cari: route.query.cari,
      kelas: route.query.kelas,
      dateStart: route.query.dateStart,
      dateEnd: route.query.dateEnd
    }
  }).then(res => {
    const resReport = res.data
    if (resReport.success == true) {
      reportQueue.value = resReport.data
      checkQueue()
    }

  })
}

function checkQueue() {
  request.post('checkqueue', null, {
    params: {
      level: 'siswa',
      idqueue: reportQueue.value,
      dateStart: route.query.dateStart,
      dateEnd: route.query.dateEnd
    }
  }).then(res => {
    if (res.data.success == true) {
      getDownloadData()
    }
  })
}

function getDownloadData() {
  request.post('downloadreportsiswa', null, {
    params: {
      level: 'siswa',
      cari: route.query.cari,
      kelas: route.query.kelas,
      dateStart: route.query.dateStart,
      dateEnd: route.query.dateEnd
    }
  }).then(res => {
    if (res.data.success == true) {
      exportData.value = res.data.data.data
      exportDate.value = res.data.data.created_at
    }
  })
}

function postData() {
  const formData = new FormData()
  formData.append('status_import', form.status_import)
  formData.append('kelas_id', form.kelas_id)
  formData.append('user_id', userId)
  formData.append('file', form.file)

  request.post('data/import', formData, {
    headers: {
      'Content-Type' : 'multipart/form-data'
    }
  }).then(res => {
    router.push('/sekolah/profil-pengguna/siswa')
  })
}

function generate() {
    var namaKelas = kelasOption.value.find(kls => kls.kelas_id == form.kelas_id).kelas_nama
    var dataItems = [{siswa_nisn: '',	siswa_nama: '',	siswa_username: '',	siswa_password: '',	kelas_nama: namaKelas }]
    var rfidItems = [{No: '',	siswa_id: '',	user_nama: '',	siswa_nisn: '',	kelas_nama: namaKelas,	user_status: '',	siswa_rfid: ''}]

    if (form.status_import == 'import_rfid') var items = rfidItems; var name = 'Format Import RFID Siswa.xlsx'
    if (form.status_import == 'import_data') var items = dataItems; var name = 'Format Import Data Siswa.xlsx'

    const data = XLSX.utils.json_to_sheet(items)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, data, 'kelas')
    XLSX.writeFile(wb, name)
}
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <h2 class="fs-1 fw-bold py-6 m-0">Export Absensi Siswa</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-column bg-light-primary align-items-center rounded p-6">
            <p class="m-0 m-auto fs-5 text-black-50">Report Excel siap di Unduh, Klik tombol bawah untuk unduh laporan presensi</p>
            <p class="m-0 m-auto fs-5 text-black-50">File Dibuat pada July 15 2022 10:28:57.</p>
            <div class="my-3">
              <a @click="" class="btn btn-danger d-flex gap-3 align-items-center w-auto">
                <span>
                  Generate ulang
                </span>
                <i class="bi bi-arrow-repeat fs-1"></i>
              </a>
            </div>
            <div class="my-3">
              <a @click="" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                <span>
                  Download File
                </span>
                <i class="bi bi-cloud-arrow-down fs-1"></i>
              </a>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>