<script setup>
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';
import { request } from '@/util';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import QueryString from "qs";
import axios from 'axios';

onMounted(() => {
  getScore()
  setCurrentPageBreadcrumbs('Hasil', ['LMS', 'Ujian Online'])
})

const store = useStore()
const currentUser = store.getters.currentUser

const route = useRoute()

const examId = route.params.id
const scoreUjian = ref([])

function getScore() {
  axios.post(`https://apiujian.edumu.id/${currentUser.sekolah_kode}/apischool/siswawali/exam/exam-score`, QueryString.stringify({
    examId: examId,
    siswa_id: currentUser.siswa_id,
  })).then(res => {
    scoreUjian.value = res.data.data
  })
}
</script>
<template>
<div>

  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="mb-4 d-flex justify-content-between">
          <h2 class="fs-1 fw-bold py-3">Hasil Nilai</h2>
          <div>
            <router-link :to="'/siswa/ujian-online'" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
              <i class="bi bi-arrow-left-circle fs-1"></i>
              <span>
                Kembali
              </span>
            </router-link>
          </div>
        </div>
        <div class="separator border-black-50 border-2 my-3"></div>
        <div>
          <div class="row py-3">
            <div class="col-2"><h4 class="text-black-50">Nama Siswa</h4></div>
            <div class="col-9"><h4 class="fw-bold">: {{scoreUjian?.exam_summary_score?.user_nama}}</h4></div>
          </div>
          <div class="row py-3">
            <div class="col-2"><h4 class="text-black-50">NIS</h4></div>
            <div class="col-9"><h4 class="fw-bold">: {{scoreUjian?.exam_summary_score?.siswa_nis}}</h4></div>
          </div>
        </div>
        <div class="separator border-black-50 border-2 my-3"></div>
        <div>
          <div class="table-responsive">
          <table class="table table-striped gy-7 gs-7 fs-4">
            <thead>
            <tr class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200">
              <th class="fs-4 fw-bold">Kategori Nilai</th>
              <th class="fs-4 fw-bold">Nilai</th>
              <th class="fs-4 fw-bold">Nilai Max</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="type in scoreUjian?.exam_summary_score?.exam_score_statistic" :key="type.question_type">
              <tr>
                <td>{{type.question_type}}</td>
                <td>{{type.score}}</td>
                <td>{{type.score_max}}</td>
              </tr>
            </template>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>