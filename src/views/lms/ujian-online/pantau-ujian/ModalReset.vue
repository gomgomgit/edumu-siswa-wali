<script setup>
import { reactive, watch } from "vue"
import qs from 'qs'
import { useToast } from "vue-toast-notification"
import { isEmpty } from "validate.js"

import Modal from "@/components/modals/CustomModal.vue"
import { request } from "@/util";
import { useStore } from "vuex"

const props = defineProps({
	mode: { type: String, required: true },
	activeData: { type: Object, required: true },
})

const store = useStore()

const userId = store.getters.currentUser.user_id 

const emits = defineEmits(['close', 'submit'])

const initialForm = { created_by: null, group_nama: null, group_desc: null }

const formData = reactive({...initialForm})

function handleClose () {
	Object.assign(formData, {...initialForm})
	emits('close')
}

function handleSubmit () {
	const endpoint = isEmpty(props.activeData) ? 'iuran/group/add' : 'iuran/group/update'
	const message = isEmpty(props.activeData) ? 'Ditambahkan!' : 'Diubah!'
	isEmpty(props.activeData) ? formData.created_by = userId : formData.modified_by = userId

	request.post(endpoint, qs.stringify(formData)).then(() => {
		Object.assign(formData, initialForm)
		useToast().success('Data Berhasil ' + message)
		emits('submit')
		emits('close')
	})
}

watch(
	() => props.activeData,
	activeData => !isEmpty(activeData) && Object.assign(formData, { ...activeData }),
	{ deep: true }
)
</script>

<template>
	<Modal
		:title="props.mode"
		:show="props.mode"
		:breadcrumb="Array('LMS', 'Tugas Online', 'Pantau Ujian', 'Detail', props.mode)"
		@closeModal="handleClose"
		@confirm="handleSubmit"
		@dismiss="handleClose">
		<div class="row gy-6">
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Pilih Tipe Reset</div>
			<div class="col-8">
        <el-select
          v-model="formData.tipe"
          placeholder="Pilih Tipe"
          class="w-100"
        >
          <el-option label="Soft Reset" value="soft"/>
          <el-option label="Hard Reset" value="hard"/>
        </el-select>
			</div>
      <div class="fs-5 text-black-50">
        <p class=""><span class="fw-bold">*SOFT RESET</span> berarti siswa masih bisa meneruskan pengerjaan ujian sesuai ujian, mohon perhatikan DURASI UJIAN</p>
        <p class=""><span class="fw-bold">*HARD RESET</span> berarti seluruh pegerjaan siswa ini akan hilang dan siswa melakukan pengerjaan dari awal, mohon perhatikan DURASI UJIAN</p>
      </div>
		</div>
	</Modal>
</template>