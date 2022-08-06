<script setup>
import { reactive, watch } from "vue"
import qs from 'qs'
import { useToast } from "vue-toast-notification"
import { isEmpty } from "validate.js"

import Modal from "@/components/modals/CustomModal.vue"
import { request } from "@/util";
import FileDrop from '@/components/file-dropzone/Index.vue';
import { useStore } from "vuex"

const props = defineProps({
	mode: { type: String, required: true },
	activeData: { type: Object, required: true },
	dataOption: Object
})
const emits = defineEmits(['close', 'submit'])

const store = useStore()
const currentUser = store.getters.currentUser;

const initialForm = { 
  title: '',
  desc: '',
  date: '',
}

const form = reactive({...initialForm})

function handleClose () {
	Object.assign(form, {...initialForm})
	emits('close')
}

function handleSubmit () {
  const formData = new FormData()
  formData.append('user_id', currentUser.user_id)
  formData.append('date', form.date)
  formData.append('title', form.title)
  formData.append('desc', form.desc)

  const endpoint = props.activeData ? 'materi/edit' : 'calendar/todo-add'
  const message = props.activeData ? 'Data Berhasil Diedit!' : 'Data Berhasil Ditambahkan!'
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
	activeData => !isEmpty(activeData) && Object.assign(form, { ...activeData, kelas_id: activeData.multikelas.split(",").map( Number ) }),
	{ deep: true }
)
</script>

<template>
	<Modal
		:title="props.mode"
		:show="props.mode"
		:breadcrumb="Array('Sekolah', 'Todo', props.mode)"
		@closeModal="handleClose"
		@confirm="handleSubmit"
		@dismiss="handleClose">
    <div class="d-flex flex-column gap-4">
      <div class="row">
        <div class="col-3 align-items-center d-flex">
          <p class="m-0 fs-4 fw-bold">Nama</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <el-input v-model="form.title" placeholder="Nama" />
        </div>
      </div>
      <div class="row">
        <div class="col-3 align-items-center d-flex">
          <p class="m-0 fs-4 fw-bold">Deskripsi</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <el-input v-model="form.desc" type="textarea" />
        </div>
      </div>
      <div class="row">
        <div class="col-3 align-items-center d-flex">
          <p class="m-0 fs-4 fw-bold">Tanggal</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <el-date-picker
            v-model="form.date"
            type="datetime"
            placeholder="Pilih Tanggal"
          />
        </div>
      </div>
    </div>
	</Modal>
</template>