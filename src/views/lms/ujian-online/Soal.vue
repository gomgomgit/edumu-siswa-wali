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
import QueryString from "qs";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useToast } from 'vue-toast-notification';

onMounted(() => {
  getData()
  setCurrentPageBreadcrumbs('Soal', ['LMS', 'Ujian Online'])
})

const store = useStore()
const currentUser = store.getters.currentUser

const route = useRoute()
const router = useRouter()

const examId = route.params.id
const antrian = ref([])
const scoreUjian = ref([])

const examData = ref([])
const examSingle = ref([])
const examEssay = ref([])


function getData() {
  axios.post(`https://apiujian.edumu.id/${currentUser.sekolah_kode}/apischool/siswawali/exam/start`, QueryString.stringify({
    examId: examId,
    siswa_id: currentUser.siswa_id,
  })).then(res => {
    if (res.data.status) {
      antrian.value = res.data.data
  
      getQuestion()
      getScore()
    } else {
      Swal.fire({
        icon: 'error',
        title: res.data.text,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Lihat Hasil',
        showConfirmButton: examData.value.exam_show_score == '1',
        cancelButtonText: 'Kembali'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/lms/ujian-online/result/${examId}`)
        }
        if (result.isDismissed) {
          router.push(`/lms/ujian-online`)
        }
      })
    }
  })
}

function getQuestion() {
  axios.post(`https://apiujian.edumu.id/${currentUser.sekolah_kode}/apischool/siswawali/exam/detail-question`, QueryString.stringify({
    page: "0",
    siswa_id: currentUser.siswa_id,
    examId: examId,
    entryId: antrian.value.exam_entries.entry_id,
  })).then(res => {
    examData.value = res.data.data.exams
    var singleQs = []
    var essayQs = []
    
    res.data.data.exams.exam_questions.forEach(exam => {
      if (exam.question_type == 'single') {
        singleQs.push(exam)
      }
      if (exam.question_type == 'essay') {
        essayQs.push({...exam, answering: '', answered: null})
      }
      
      examSingle.value = examData.exam_random == '1' ? randomArray(singleQs) : singleQs
      examEssay.value = examData.exam_random == '1' ? randomArray(essayQs) : essayQs
    });
  })
}

function getScore() {
  axios.post(`https://apiujian.edumu.id/${currentUser.sekolah_kode}/apischool/siswawali/exam/exam-score`, QueryString.stringify({
    examId: examId,
    siswa_id: currentUser.siswa_id,
  })).then(res => {
    scoreUjian.value = res.data.data
  })
}
function answerSingle(question, option) {
  axios.post(`https://apiujian.edumu.id/${currentUser.sekolah_kode}/apischool/siswawali/exam/answer-question-single`, QueryString.stringify({
    examId: examId,
    entryId: antrian.value.exam_entries.entry_id,
    questionId: question,
    optionId: option
  })).then(res => {
    useToast().success('dijawab')
  })
}
function answerEssay(question, no, answer) {
  axios.post(`https://apiujian.edumu.id/${currentUser.sekolah_kode}/apischool/siswawali/exam/answer-question-essay`, QueryString.stringify({    
    examId: examId,
    entryId: antrian.value.exam_entries.entry_id,
    questionId: question,
    answerText: answer
  })).then(res => {
    useToast().success('dijawab')
    examEssay.value[no].answered = answer
  })
}
function finish() {
  axios.post(`https://apiujian.edumu.id/${currentUser.sekolah_kode}/apischool/siswawali/exam/exam-finish`, QueryString.stringify({
    examId: examId,
    entryId: antrian.value.exam_entries.entry_id
  })).then(res => {
    if (examData.value.exam_show_score == '1') {
      router.push(`/lms/ujian-online/result/${examId}`)
    } else {
      router.push(`/lms/ujian-online`)
    }
  })
}

function randomArray(items) {
      return items
          .map((item) => ({ sort: Math.random(), value: item }))
          .sort((a, b) => a.sort - b.sort)
          .map((item) => item.value);
}

</script>
<template>
<div>
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="mb-4">
          <div class="d-flex justify-content-between">
            <h2 class="fs-1 fw-bold py-4 text-gray-800" :v-text="examData.exam_title">Ujian/Tugas</h2>
            <div>
              <a @click="finish()" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                <i class="bi bi-clipboard2-check-fill fs-1"></i>
                <span>
                  Selesai Ujian
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="separator border-black-50 border-2 mb-6"></div>
        <div>
          <div>
            <div class="row py-3">
              <div class="col-2"><h4 class="text-black-50">Nama Siswa</h4></div>
              <div class="col-9"><h4 class="fw-bold">: {{antrian.data_siswa ? antrian.data_siswa[0].user_nama : ''}}</h4></div>
            </div>
            <div class="row py-3">
              <div class="col-2"><h4 class="text-black-50">Kelas</h4></div>
              <div class="col-9"><h4 class="fw-bold">: {{antrian.data_siswa ? antrian.data_siswa[0].kelas_nama : ''}}</h4></div>
            </div>
          </div>
          <div class="separator border-black-50 border-2 mb-6"></div>
          <div>
            <div v-if="examSingle.length > 0">
              <div>
                <h2 class="text-center mb-4 fw-bold fs-1">Pilihan Ganda</h2>
              </div>
              <template v-for="(quest, no) in examSingle" :key="quest.question_id">
                <div class="d-flex fs-3 gap-4 mb-5">
                  <div class="fw-bold">{{no + 1}}.</div>
                  <div class="flex-grow-1">
                    <div class="mb-3" v-html="quest.question_text"></div>
                    <div class="row">
                      <template v-for="option in quest.exam_question_option" :key="option.option_id">
                        <div class="col-6 form-check gap-6 d-flex align-items-center">
                          <input @change="answerSingle(option.question_id, option.option_id)" class="form-check-input" type="radio" :name="`answer-${option.question_id}`" :id="`option${option.option_id}`">
                          <label class="form-check-label" :for="`option${option.option_id}`">
                            {{option.option_text}}
                          </label>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
              <div class="separator border-black-50 border-2 mb-6"></div>
            </div>
            <div v-if="examEssay.length > 0">
              <div>
                <h2 class="text-center mb-4 fw-bold fs-1">Essay</h2>
              </div>
              <template v-for="(quest, no) in examEssay" :key="quest.question_id">
                <div class="d-flex fs-3 gap-4 mb-5">
                  <div class="fw-bold">{{no + 1}}.</div>
                  <div class="flex-grow-1">
                    <div class="mb-3" v-html="quest.question_text"></div>
                    <div class="row">
                      <p>Jawaban : {{quest.answered ?? quest.answer_text}}</p>
                      <el-input
                        v-model="quest.answering"
                        :rows="3"
                        type="textarea"
                        placeholder="Silahkan diisi"
                      />
                      <div class="d-flex justify-content-end mt-3">
                        <a @click="answerEssay(quest.question_id, no, quest.answering)" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                          <span>
                            Simpan Jawaban
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div class="separator border-black-50 border-2 mb-6"></div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <a @click="finish()" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
              <i class="bi bi-clipboard2-check-fill fs-1"></i>
              <span>
                Selesai Ujian
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>