<script setup>
import { reactive, watch } from "vue"
import qs from 'qs'
import { useToast } from "vue-toast-notification"
import { isEmpty } from "validate.js"

import Modal from "@/components/modals/CustomModal.vue"
import { request } from "@/util";
import FileDrop from '@/components/file-dropzone/Index.vue';
import moment from "moment"

const props = defineProps({
	activeData: { type: Object, required: true },
})

const emits = defineEmits(['close'])

const baseUrl = process.env.VUE_APP_API_URL

function handleClose () {
	emits('close')
}
</script>

<template>
	<Modal
		title="Detail"
		:show="props.activeData"
		:breadcrumb="Array('Absensi', 'Kehadiran', 'Detail')"
		@closeModal="handleClose"
		@dismiss="handleClose">
    <div class="d-flex flex-column gap-4">
      <div class="row">
        <div class="col-3 align-items-center d-flex">
          <p class="m-0 fs-4 fw-bold">Tipe</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <p class="m-0 fs-4 fw-bold">: {{activeData.presensi_tipe}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-3 align-items-center d-flex">
          <p class="m-0 fs-4 fw-bold">Status</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <p class="m-0 fs-4 fw-bold">: {{activeData.presensi_status}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-3 align-items-center d-flex">
          <p class="m-0 fs-4 fw-bold">Tanggal</p>
        </div>
        <div class="col-9 align-items-center d-flex gap-4">
          <p class="m-0 fs-4 fw-bold">: {{activeData.presensi_create_date}} - {{activeData.presensi_create_time}}</p>
        </div>
      </div>
      <div>
        <div class="row mb-3">
          <div class="col-3 align-items-center d-flex">
            <p class="m-0 fs-4 fw-bold">Foto</p>
          </div>
          <div class="col-9 align-items-center d-flex gap-4">
            <p class="m-0 fs-4 fw-bold">:</p>
          </div>
        </div>
        <div class="bg-secondary p-2">
          <img :src="activeData.presensi_foto" class="w-100" alt="">
        </div>
      </div>
    </div>
	</Modal>
</template>