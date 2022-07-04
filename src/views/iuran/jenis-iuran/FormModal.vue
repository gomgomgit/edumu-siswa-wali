<script setup>
import { onMounted, reactive, ref, watch } from "vue"
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
const grupIuran = ref([])

const emits = defineEmits(['close', 'submit'])

const initialForm = { created_by: null, group_id: null, tipe_nama: null, tipe_desc: null }

const formData = reactive({...initialForm})

function handleClose () {
	Object.assign(formData, {...initialForm})
	emits('close')
}

function handleSubmit () {
	const endpoint = isEmpty(props.activeData) ? 'iuran/tipe/add' : 'iuran/tipe/update'
	const message = isEmpty(props.activeData) ? 'Ditambahkan!' : 'Diubah!'
	isEmpty(props.activeData) ? formData.created_by = userId : formData.modified_by = userId

	request.post(endpoint, qs.stringify(formData)).then(() => {
		Object.assign(formData, initialForm)
		useToast().success('Data Berhasil ' + message)
		emits('submit')
		emits('close')
	})
}

function getGrupIuran (payload) {
	request.get('iuran/group', null, {
	}).then(res => {
		grupIuran.value = res.data.data
	})
}

watch(
	() => props.activeData,
	activeData => !isEmpty(activeData) && Object.assign(formData, { ...activeData }),
	{ deep: true }
)
onMounted(() => {
	getGrupIuran()
})
</script>

<template>
	<Modal
		:title="props.mode"
		:show="props.mode"
		:breadcrumb="Array('Iuran', 'Jenis Iuran', props.mode)"
		@closeModal="handleClose"
		@confirm="handleSubmit"
		@dismiss="handleClose">
		<div class="row gy-6">
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Grup Iuran</div>
			<div class="col-8">
				<el-select filterable v-model="formData.group_id" class="w-100">
					<template v-for="grup in grupIuran">
						<el-option :value="grup.group_id" :label="grup.group_nama"></el-option>
					</template>
				</el-select>
			</div>
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Nama Jenis Iuran</div>
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