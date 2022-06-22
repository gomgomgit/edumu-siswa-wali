<script setup>
import { reactive, watch } from "vue"
import qs from 'qs'
import { useToast } from "vue-toast-notification"
import { isEmpty } from "validate.js"

import Modal from "@/components/modals/CustomModal.vue"
import { request } from "@/util";

const props = defineProps({
	mode: { type: String, required: true },
	activeData: { type: Object, required: true },
})

const emits = defineEmits(['close', 'submit'])

const initialForm = { mapel_nama: null, mapel_status: null }

const formData = reactive({...initialForm})

function handleClose () {
	Object.assign(formData, {...initialForm})
	emits('close')
}

function handleSubmit () {
	const endpoint = isEmpty(props.activeData) ? 'iuran/tipe/add' : 'iuran/tipe/edit'
	const message = isEmpty(props.activeData) ? 'Ditambahkan!' : 'Diubah!'

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
		:breadcrumb="Array('Sekolah', 'Mata Pelajaran', 'Data Mapel', props.mode)"
		@closeModal="handleClose"
		@confirm="handleSubmit"
		@dismiss="handleClose">
		<div class="row gy-6">
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Jenis Iuran</div>
			<div class="col-8">
				<input
					v-model="formData.tipe_nama"
					type="text"
					class="form-control" />
			</div>
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Deskripsi</div>
			<div class="col-8">
				<input
					v-model="formData.tipe_desc"
					type="text"
					class="form-control" />
			</div>
		</div>
	</Modal>
</template>