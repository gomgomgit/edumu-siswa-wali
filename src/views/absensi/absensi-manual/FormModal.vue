<script setup>
import { reactive, watch } from "vue"
import qs from 'qs'
import { useToast } from "vue-toast-notification"
import { isEmpty } from "validate.js"

import Modal from "@/components/modals/CustomModal.vue"
import { request } from "@/util";
import FileDrop from '@/components/file-dropzone/Index.vue';

const props = defineProps({
	mode: { type: String, required: true },
	activeData: { type: Object, required: true },
	dataOption: Object
})

const emits = defineEmits(['close', 'submit'])

const baseUrl = process.env.VUE_APP_API_URL

const initialForm = { 
  siswa_id: '',
  guru_id: '',
  status: '',
  status_izin: '',
  event_mulai: '',
  type: '',
  izin_file: '',
  keterangan: '',
}

const form = reactive({...initialForm})

function handleClose () {
	Object.assign(form, {...initialForm})
	emits('close')
}

function handleSubmit () {
  const formData = new FormData()
  if (form.siswa_id) {
    formData.append('siswa_id', form.siswa_id)
  }
  if (form.guru_id) {
    formData.append('guru_id', form.guru_id)
  }
  formData.append('status', form.status)
  formData.append('status_izin', form.status_izin)
  formData.append('event_mulai', form.date)
  formData.append('type', form.type)
  formData.append('izin_file', form.izin_file)
  formData.append('keterangan', form.keterangan)

  var endpoint = ''
  if (form.siswa_id) {
    endpoint = 'tambah_presensi_siswa'
  }
  if (form.guru_id) {
    endpoint = 'tambah_presensi_guru'
  }
  const message = 'Data Berhasil Ditambahkan!'
  request.post(endpoint, formData, {
    headers: {
      'Content-Type' : 'multipart/form-data'
    }
  }).then(res => {
      useToast().success(message)
      Object.assign(form, initialForm)
      emits('submit')
      emits('close')
  })
}

watch(
	() => props.activeData,
	activeData => !isEmpty(activeData) && Object.assign(form, { ...activeData}),
	{ deep: true }
)
</script>

<template>
	<Modal
		:title="props.mode"
		:show="props.mode"
		:breadcrumb="Array('LMS', 'Materi Belajar', 'Materi File', props.mode)"
		@closeModal="handleClose"
		@confirm="handleSubmit"
		@dismiss="handleClose">
    <div class="d-flex flex-column gap-4">
      <div class="row" v-if="form.kelas_id">
        <div class="col-3 d-flex">
          <p class="m-0 fs-4 fw-bold">Kelas</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <el-input disabled v-model="form.kelas" placeholder="Nama Kelas" />
        </div>
      </div>
      <div class="row">
        <div class="col-3 align-items-center d-flex">
          <p class="m-0 fs-4 fw-bold">Nama Siswa</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <el-input disabled v-model="form.name" placeholder="Nama Siswa" />
        </div>
      </div>
      <div class="row">
        <div class="col-3 align-items-center d-flex">
          <p class="m-0 fs-4 fw-bold">Tipe Absen</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <el-input disabled v-model="form.type" placeholder="Tipe Absen" />
        </div>
      </div>
      <div class="row">
        <div class="col-3 align-items-center d-flex">
          <p class="m-0 fs-4 fw-bold">Tanggal</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <el-input disabled v-model="form.date" placeholder="Tanggal" />
        </div>
      </div>
      <div class="row">
        <div class="col-3 align-items-center d-flex">
          <p class="m-0 fs-4 fw-bold">Status</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <el-select class="w-100" v-model="form.status" placeholder="Pilih Status">
            <el-option label="Izin" value="absent" />
            <el-option label="Alpha" value="not_taken" />
            <el-option label="Hadir" value="present" />
            <el-option label="Telat" value="late" />
          </el-select>
        </div>
      </div>
      <div class="row" v-if="form.status == 'absent'">
        <div class="col-3 align-items-center d-flex">
          <p class="m-0 fs-4 fw-bold">Status Izin</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <el-select class="w-100" v-model="form.status_izin" placeholder="Pilih Status Izin">
            <el-option label="1/2hari" value="1/2 Hari" />
            <el-option label="acara_keluarga" value="Acara Keluarga" />
            <el-option label="sakit" value="Sakit" />
            <el-option label="acara_sekolah" value="Acara Sekolah" />
            <el-option label="lain_lain" value="Lain-Lain" />
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="col-3 align-items-center d-flex">
          <p class="m-0 fs-4 fw-bold">Keterangan</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <el-input type="textarea" v-model="form.keterangan" placeholder="" />
        </div>
      </div>
      <div class="row">
        <div class="col-3 pt-3">
          <p class="m-0 fs-4 fw-bold">File Bukti</p>
          <div class="mt-3">
            <p class="m-0 fs-4 fw-bold text-black-50">Note :</p>
            <p class="m-0 fs-4 fw-medium text-black-50">*Format yang di dukung : .doc .docx .xls .xlsx .ppt .pptx .pdf .jpg .jpeg .png</p>
          </div>
        </div>
        <div class="col-9 align-items-center">
          <FileDrop v-model:fileInputData="form.izin_file"></FileDrop>
        </div>
      </div>
    </div>
	</Modal>
</template>