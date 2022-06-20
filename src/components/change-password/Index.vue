<script setup>
import { onMounted, reactive, ref, watch } from "vue"
import qs from 'qs'
import { useToast } from "vue-toast-notification"
import { isEmpty } from "validate.js"

import Modal from "@/components/modals/CustomModal.vue"
import { request } from "@/util";
import QueryString from "qs"

  watch(
    () => props.passwordData,
    passwordData => !isEmpty(passwordData) && Object.assign(formData, { ...passwordData }),
    { deep: true }
  )

	const props = defineProps({
		passwordModal: { type: Boolean, required: true },
		passwordData: { type: Object, required: true },
	})

	const emits = defineEmits(['close', 'submit'])

  const passwordModal = ref(false)

	function handleClose () {
		Object.assign(formData, {...initialFormData})
		emits('close')
	}

  const initialFormData = {user_id: '', user_nama: '', user_username: '', user_passw: ''}

  const formData = reactive({...initialFormData})

  function closepasswordModal() {
    passwordModal.value = '',
    Object.assign(formData, initialFormData)
  }

  function handleSubmit() {
    request.post('/user/edit/pass', QueryString.stringify(formData))
      .then(res => {
        Object.assign(formData, initialFormData)
        passwordModal.value = null
        useToast().success('Password Berhasil diganti!')
				emits('submit')
				emits('close')
      })
  }
</script>

<template>
	<Modal
		title="Ganti Password"
		:show="props.passwordModal"
		@closeModal="handleClose"
		@confirm="handleSubmit"
		@dismiss="handleClose">
			<div class="">
				<div class="row gy-6">
					<div class="col-4 d-flex align-items-center fw-bold fs-4">Nama</div>
					<div class="col-8">
						<input type="text" disabled v-model="formData.user_nama" class="form-control" placeholder="Nama"/>
					</div>
					<div class="col-4 d-flex align-items-center fw-bold fs-4">Username</div>
					<div class="col-8">
						<input type="text" disabled v-model="formData.user_username" class="form-control" placeholder="Username"/>
					</div>
					<div class="col-4 d-flex align-items-center fw-bold fs-4">Password</div>
					<div class="col-8">
            <el-input type="password" show-password v-model="formData.user_passw" placeholder="Biarkan kosong jika tidak ingin mengganti" />
					</div>
				</div>
			</div>
	</Modal>
</template>