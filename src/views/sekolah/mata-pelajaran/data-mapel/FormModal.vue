<script setup>
import { reactive } from "vue"
import qs from 'qs'
import Modal from "@/components/modals/CustomModal.vue"
import { request } from "@/util";
import { useToast } from "vue-toast-notification";

const props = defineProps({
	mode: { type: String, required: true },
})

const emits = defineEmits(['close', 'submit'])

const initialForm = { mapel_nama: null, mapel_status: null }

const formData = reactive({...initialForm})

function submit () {
	request.post('mapel/add', qs.stringify(formData), {
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	}).then(() => {
		Object.assign(formData, initialForm)
		useToast().success('Data Berhasil Ditambahkan!')
		emits('submit')
		emits('close')
	})
}
</script>

<template>
	<Modal
		:title="props.mode"
		:show="props.mode"
		:breadcrumb="Array('Sekolah', 'Mata Pelajaran', 'Data Mapel', props.mode)"
		@closeModal="emits('close')"
		@confirm="submit"
		@dismiss="emits('close')">
		<div class="row gy-6">
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Nama Mapel</div>
			<div class="col-8">
				<input
					v-model="formData.mapel_nama"
					type="text"
					class="form-control" />
			</div>

			<div class="col-4 d-flex align-items-center fw-bold fs-4">Status Mapel</div>
			<div class="col-8">
				<div class="form-check form-check-inline">
					<input
						v-model="formData.mapel_status"
						class="form-check-input"
						type="radio"
						id="mapel-status-1"
						:value="1">
					<label class="form-check-label" for="mapel-status-1">Aktif</label>
				</div>
				<div class="form-check form-check-inline">
					<input
						v-model="formData.mapel_status"
						class="form-check-input"
						type="radio"
						id="mapel-status-0"
						:value="0">
					<label class="form-check-label" for="mapel-status-0">Non Aktif</label>
				</div>
			</div>
		</div>
	</Modal>
</template>