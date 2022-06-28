<script setup>
import { reactive, watch } from "vue"
import qs from 'qs'
import { useToast } from "vue-toast-notification"
import { isEmpty } from "validate.js"

import Modal from "@/components/modals/CustomModal.vue"
import { request } from "@/util";

const props = defineProps({
	activeData: { type: Object, required: true },
})

const emits = defineEmits(['close'])

const initialForm = { payment_nominal: null, payment_remark: null, payment_status: 'Berhasil', channel_id: 1 }

const formData = reactive({...initialForm})

watch(
	() => props.activeData,
	activeData => !isEmpty(activeData) && Object.assign(formData, {siswa_id: activeData.siswa_id, finance_id: activeData.id, finance_name: activeData.tipe_nama, nominal_balance: activeData.master_nominal}),
	{ deep: true }
)

function handleClose () {
	Object.assign(formData, {...initialForm})
	emits('close')
}

function handleSubmit () {
  // return console.log(formData)
	const endpoint = 'siswa/iuran/bayar'
	request.post(endpoint, qs.stringify(formData)).then(() => {
		Object.assign(formData, initialForm)
		useToast().success('Pembayaran Berhasil!')
		emits('close')
	})
}
</script>

<template>
	<Modal
		title="Pembayaran"
		:show="props.activeData"
		:breadcrumb="Array('Iuran', 'Iuran Siswa', 'Pembayaran')"
		@closeModal="handleClose"
		@confirm="handleSubmit"
		@dismiss="handleClose">
		<div class="row gy-6">
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Nama Tagihan</div>
			<div class="col-8">
				<input
					v-model="formData.finance_name"
					type="text"
          readonly
					class="form-control" />
			</div>
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Nominal Tagihan</div>
			<div class="col-8">
				<input
					v-model="formData.nominal_balance"
					type="number"
          readonly
					class="form-control" />
			</div>
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Nominal Bayar</div>
			<div class="col-8">
				<input
					v-model="formData.payment_nominal"
					type="number"
					class="form-control" />
			</div>
			<div class="col-4 d-flex align-items-center fw-bold fs-4">Deskripsi</div>
			<div class="col-8">
        <el-input
          v-model="formData.payment_remark"
          maxlength=""
          placeholder=""
          type="textarea"
        />
      </div>
		</div>
	</Modal>
</template>