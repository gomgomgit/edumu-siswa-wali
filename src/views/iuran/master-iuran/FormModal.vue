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

const emits = defineEmits(['close', 'submit'])

const initialForm = { created_by: null, tipe_id: null, group_id: null, master_nominal: null, master_tgl_jatuh_tempo: null }

const formData = reactive({...initialForm})

const grupIuran = ref([])
const jenisIuran = ref([])

function handleClose () {
	Object.assign(formData, {...initialForm})
	emits('close')
}

function handleSubmit () {
	const endpoint = isEmpty(props.activeData) ? 'iuran/master/add' : 'iuran/master/update'
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
function getJenisIuran (payload) {
	request.get('iuran/tipe', null, {
	}).then(res => {
		jenisIuran.value = res.data.data
	})
}

watch(
	() => props.activeData,
	activeData => !isEmpty(activeData) && Object.assign(formData, { ...activeData }),
	{ deep: true }
)

onMounted(()=>{
	getGrupIuran()
	getJenisIuran()
})
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
			
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Grup Iuran</div>
			<div class="col-8">
				<el-select filterable v-model="formData.group_id" class="w-100">
					<template v-for="grup in grupIuran">
						<el-option :value="grup.group_id" :label="grup.group_nama"></el-option>
					</template>
				</el-select>
			</div>
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Jenis Iuran</div>
			<div class="col-8">
				<el-select filterable v-model="formData.tipe_id" class="w-100">
					<template v-for="jenis in jenisIuran">
						<el-option :value="jenis.tipe_id" :label="jenis.tipe_nama"></el-option>
					</template>
				</el-select>
			</div>
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Nominal</div>
			<div class="col-8">
				<el-input
					v-model="formData.master_nominal"
					type="number"
					placeholder="Masukkan Nominal" />
			</div>
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Tgl Jatuh Tempo</div>
			<div class="col-8">
				<el-date-picker
					format="YYYY-MM-DD"
					value-format="YYYY-MM-DD"
					v-model="formData.master_tgl_jatuh_tempo"
					type="date"
					placeholder="Pilih Tanggal"
					size="large"
				/>
			</div>
		</div>
	</Modal>
</template>