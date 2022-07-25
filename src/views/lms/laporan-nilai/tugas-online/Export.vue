<script setup>
import { onMounted, reactive, ref } from 'vue'
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { request } from '@/util';
import QueryString from 'qs';
import { useToast } from 'vue-toast-notification';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Loading from 'vue3-loading-overlay'

import * as XLSX from 'xlsx';

onMounted(() => {
  setCurrentPageBreadcrumbs("Export", ['LMS', 'Laporan Nilai', 'Tugas Online']);
  getNilai()
})

const store = useStore()

const router = useRouter()
const route = useRoute()

const ujianId = route.params.id
const kelasId = route.params.kelas

const kelasOption = ref()

const loading = ref(false)

const resReport = ref([])

const form = reactive({
  status_import: '',
  kelas_id: '',
  file: null,
})

function getNilai() {
  loading.value = true
  request.post('ujian/siswanilai', null, {
    params: {
      exam_id: ujianId,
      participant_id: kelasId,
    }
  }).then(res => {
    loading.value = false

    resReport.value = res.data.data[0]
  })
}

function generate() {
    var items = resReport.value.nilai.map((report, index) => {
      var newItems = {}
      newItems['No'] = index+1
      newItems['NAMA'] = report.user_nama
      newItems['KELAS'] = resReport.value.kelas.kelas_nama
      newItems['Nilai'] = report.en_nilai
      newItems['Jawab'] = report.detJwb
      newItems['TidakJawab'] = report.notJwb.length
      newItems['JawabanBenar'] = report.cBenar
      newItems['JawabanSalah'] = report.cSalah
      newItems['NilaiAkhir'] = report.en_tot_nilai
      newItems['Keterangan'] = report.en_desc

      return newItems
    })

    // return console.log(items)

    // var items = resReport.value; 
    var name = `Rekap Nilai-${resReport.value.kelas.kelas_nama}-${resReport.value.exam_title}`

    const data = XLSX.utils.json_to_sheet(items)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, data, 'nilai')
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
        <div class="bg-light-primary rounded p-6">
            <div v-if="loading" class="d-flex flex-column align-items-center">
              <Loading 
                :active="loading" 
                color="#41B883"
                :is-full-page="false">
              </Loading>
              <p class="m-0 m-auto fs-5 text-black-50 fw-bold">Harap Tuggu, Data sedang diproses</p>
            </div>

            <div v-if="!loading" class="d-flex flex-column align-items-center">
              <p class="m-0 m-auto fs-5 text-black-50">Report Excel siap di Unduh, Klik tombol bawah untuk unduh</p>
              <div class="my-3">
                <a @click="getNilai()" class="btn btn-danger d-flex gap-3 align-items-center w-auto">
                  <span>
                    Generate ulang
                  </span>
                  <i class="bi bi-arrow-repeat fs-1"></i>
                </a>
              </div>
              <div class="my-3">
                <a @click="generate()" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
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
  </div>
</template>