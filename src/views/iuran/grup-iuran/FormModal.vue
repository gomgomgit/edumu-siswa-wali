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

const userId = 255

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
		:breadcrumb="Array('Iuran', 'Grup Iuran', props.mode)"
		@closeModal="handleClose"
		@confirm="handleSubmit"
		@dismiss="handleClose">
		<div class="row gy-6">
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Nama Grup Iuran</div>
			<div class="col-8">
				<input
					v-model="formData.group_nama"
					type="text"
					class="form-control" />
			</div>
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Deskripsi</div>
			<div class="col-8">
				<input
					v-model="formData.group_desc"
					type="text"
					class="form-control" />
			</div>
		</div>
	</Modal>
</template>