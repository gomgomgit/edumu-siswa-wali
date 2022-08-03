<script setup>
import { reactive, ref, watch } from "vue"
import qs from 'qs'
import { useToast } from "vue-toast-notification"
import { isEmpty } from "validate.js"

import { dayList } from '@/constant'
import { request } from "@/util";

import Modal from "@/components/modals/CustomModal.vue"

const props = defineProps({
	mode: { type: String, required: true },
	activeData: { type: Object, required: true },
})

const emits = defineEmits(['close', 'submit'])

const initialForm = {
	kelas_id: '',
	mapel_id: '',
	user_id: '',
	thn_ajar_id: '',
	jadwal_hari: '',
	jadwal_mulai: '',
	jadwal_selesai: '',
	jadwal_lokasi: '',
	jadwal_status: '',
}

const formData = reactive({ ...initialForm })

const formOptions = ref({
	kelas: [],
	mapel: [],
	thn_ajar: [],
	user: [],
})

function handleClose() {
	Object.assign(formData, { ...initialForm })
	emits('close')
}

function handleSubmit() {
	const endpoint = isEmpty(props.activeData) ? 'jadwal/add' : 'jadwal/edit'
	const message = isEmpty(props.activeData) ? 'Ditambahkan!' : 'Diubah!'

	request.post(endpoint, qs.stringify(formData)).then(() => {
		Object.assign(formData, initialForm)
		useToast().success('Data Berhasil ' + message)
		emits('submit')
		emits('close')
	})
}

function getOptions() {
	Promise.all([
		request.post('kelas'),
		request.post('mapel'),
		request.post('thn_ajar'),
		request.post('user?level=guru'),
	]).then(responses => {
		formOptions.value = {
			kelas: responses[0].data.data,
			mapel: responses[1].data.data,
			thn_ajar: responses[2].data.data,
			user: responses[3].data.data
		}
	})
}

watch(
	() => props.activeData,
	activeData => !isEmpty(activeData) && Object.assign(formData, { ...activeData }),
	{ deep: true }
)

watch(
	() => props.mode,
	mode => {
		if (isEmpty(mode)) return
		// if (Object.values(formOptions.value).some(arrValue => arrValue.length)) return
		getOptions()
	},
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
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Kelas</div>
			<div class="col-8">
				<select
					v-model="formData.kelas_id"
					type="text"
					class="form-control">
					<option value="">- Pilih Kelas -</option>
					<option
						v-for="kelas in formOptions.kelas"
						:key="kelas.kelas_id"
						:value="kelas.kelas_id">
						{{ kelas.kelas_nama }}
					</option>
				</select>
			</div>

			<div class="col-4 d-flex align-items-center fw-bold fs-4">Mapel</div>
			<div class="col-8">
				<select
					v-model="formData.mapel_id"
					type="text"
					class="form-control">
					<option value="">- Pilih Mapel -</option>
					<option
						v-for="mapel in formOptions.mapel"
						:key="mapel.mapel_id"
						:value="mapel.mapel_id">
						{{ mapel.mapel_nama }}
					</option>
				</select>
			</div>

			<div class="col-4 d-flex align-items-center fw-bold fs-4">Guru</div>
			<div class="col-8">
				<select
					v-model="formData.user_id"
					type="text"
					class="form-control">
					<option value="">- Pilih Guru -</option>
					<option
						v-for="user in formOptions.user"
						:key="user.user_id"
						:value="user.user_id">
						{{ user.user_nama }}
					</option>
				</select>
			</div>

			<div class="col-4 d-flex align-items-center fw-bold fs-4">Tahun Ajar</div>
			<div class="col-8">
				<select
					v-model="formData.thn_ajar_id"
					type="text"
					class="form-control">
					<option value="">- Pilih Tahun Ajar -</option>
					<option
						v-for="thn_ajar in formOptions.thn_ajar"
						:key="thn_ajar.thn_ajar_id"
						:value="thn_ajar.thn_ajar_id">
						{{ thn_ajar.thn_ajar_value }} {{ thn_ajar.thn_ajar_semester }}
					</option>
				</select>
			</div>

			<div class="col-4 d-flex align-items-center fw-bold fs-4">Hari</div>
			<div class="col-8">
				<select
					v-model="formData.jadwal_hari"
					type="text"
					class="form-control">
					<option value="">- Pilih Hari -</option>
					<option
						v-for="dayId in Object.keys(dayList)"
						:key="dayId"
						:value="dayId">
						{{ dayList[dayId] }}
					</option>
				</select>
			</div>

			<div class="col-4 d-flex align-items-center fw-bold fs-4">Jam Mulai</div>
			<div class="col-8">
				<input
					v-model="formData.jadwal_mulai"
					type="time"
					class="form-control"
					onfocus="this.showPicker()" />
			</div>

			<div class="col-4 d-flex align-items-center fw-bold fs-4">Jam Selesai</div>
			<div class="col-8">
				<input
					v-model="formData.jadwal_selesai"
					type="time"
					class="form-control"
					onfocus="this.showPicker()" />
			</div>

			<div class="col-4 d-flex align-items-center fw-bold fs-4">Lokasi</div>
			<div class="col-8">
				<input
					v-model="formData.jadwal_lokasi"
					type="text"
					class="form-control" />
			</div>

			<div class="col-4 d-flex align-items-center fw-bold fs-4">Status Jadwal</div>
			<div class="col-8">
				<div class="form-check form-check-inline">
					<input
						v-model="formData.jadwal_status"
						class="form-check-input"
						type="radio"
						id="jadwal-status-1"
						:value="1">
					<label class="form-check-label" for="jadwal-status-1">Aktif</label>
				</div>
				<div class="form-check form-check-inline">
					<input
						v-model="formData.jadwal_status"
						class="form-check-input"
						type="radio"
						id="jadwal-status-0"
						:value="0">
					<label class="form-check-label" for="jadwal-status-0">Non Aktif</label>
				</div>
			</div>
		</div>
	</Modal>
</template>