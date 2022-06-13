<script setup>
import { onMounted, reactive, ref, watch } from "vue"
import qs from 'qs'
import { useToast } from "vue-toast-notification"
import { isEmpty } from "validate.js"

import Modal from "@/components/modals/CustomModal.vue"
import { request } from "@/util";
import QueryString from "qs"

	onMounted(() => {
		getShiftData()
	})

	const props = defineProps({
		mode: { type: String, required: true },
		activeData: { type: Object, required: true },
	})

	const emits = defineEmits(['close', 'submit'])

  function getShiftData () {
    request.post('shift', null).then(res => {
      shiftData.value = res.data.data
    })
  }
  const shiftData = ref([])

  const tingkatKelas = ref('')
  const status = ref('')

  const modalData = ref(false)

  const waliKelas = ref([
    {
      name: 'Guru 1'
    },
    {
      name: 'Guru 1'
    },
    {
      name: 'Guru 1'
    },
    {
      name: 'Guru 1'
    },
    {
      name: 'Guru 1'
    },
  ])

  const dataTingkatKelas = ref([
    {
      value: 1,
      name: '1'
    },
    {
      value: 2,
      name: '2'
    },
    {
      value: 3,
      name: '3'
    },
    {
      value: 4,
      name: '4'
    },
    {
      value: 5,
      name: '5'
    },
    {
      value: 6,
      name: '6'
    },
    {
      value: 7,
      name: '7'
    },
    {
      value: 8,
      name: '8'
    },
    {
      value: 9,
      name: '9'
    },
    {
      value: 10,
      name: '10'
    },
    {
      value: 11,
      name: '11'
    },
    {
      value: 12,
      name: '12'
    },
  ])

	function handleClose () {
		Object.assign(formData, {...initialFormData})
		emits('close')
	}

  const initialFormData = {kelas_nama: '', wali: '', kelas_level: '', shift_id: '', kelas_status: ''}

  const formData = reactive({...initialFormData})

  function closeModalData() {
    modalData.value = '',
    Object.assign(formData, initialFormData)
  }

  function handleSubmit() {
    request.post('/kelas/add', QueryString.stringify(formData))
      .then(res => {
        Object.assign(formData, initialFormData)
        modalData.value = null
				emits('submit')
				emits('close')
      })
  }
</script>

<template>
	<Modal
		title="Tambah Kelas"
		:show="props.mode"
		@closeModal="handleClose"
		@confirm="handleSubmit"
		@dismiss="handleClose">
			<div class="">
				<div class="row gy-6">
					<div class="col-4 d-flex align-items-center fw-bold fs-4">Nama Kelas</div>
					<div class="col-8">
						<input type="text" v-model="formData.kelas_nama" class="form-control" placeholder="X IPA , IX IPS , DST"/>
					</div>
					<div class="col-4 d-flex align-items-center fw-bold fs-4">Wali Kelas</div>
					<div class="col-8">
						<select  v-model="formData.guru" class="form-select form-select-solid" aria-label="Select example">
							<option>Pilih Guru</option>
							<template v-for="(guru, guruIndex) in waliKelas" :key="guruIndex">
								<option value="1">{{guru.name}}</option>
							</template>
						</select>
					</div>
					<div class="col-4 d-flex align-items-center fw-bold fs-4">Tingkat Kelas</div>
					<div class="col-8">
						<select  v-model="formData.kelas_level" class="form-select form-select-solid" aria-label="Select example">
							<option>Pilih Tingkat Kelas</option>
							<template v-for="(kelas, kelasIndex) in dataTingkatKelas" :key="kelasIndex">
								<option :value="kelas.value">{{kelas.name}}</option>
							</template>
						</select>
					</div>
					<div class="col-4 d-flex align-items-center fw-bold fs-4">Jam Masuk</div>
					<div class="col-8">
						<select  v-model="formData.shift_id" class="form-select form-select-solid" aria-label="Pilih Jam Masuk">
							<option>Pilih Jam Masuk</option>
							<template v-for="(shift, shiftIndex) in shiftData" :key="shift.id">
								<option :value="shift.id">{{shift.name}} ({{shift.start}}-{{shift.end}})</option>
							</template>
						</select>
					</div>
					<div class="col-4 d-flex align-items-center fw-bold fs-4">Status Aktif</div>
					<div class="col-8">
						<select  v-model="formData.kelas_status" class="form-select form-select-solid" aria-label="Status Aktif">
							<option>Pilih Status</option>
							<option value="1">Aktif</option>
							<option value="0">Non Aktif</option>
						</select>
					</div>
				</div>
			</div>
	</Modal>
</template>