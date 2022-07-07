<script setup>
import { onMounted, reactive, ref } from 'vue'
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { request } from '@/util';
import QueryString from 'qs';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';
import FileDrop from '@/components/file-dropzone/Index.vue';
import { useStore } from 'vuex';

onMounted(() => {
  setCurrentPageBreadcrumbs("Import Data Guru", ['Sekolah', 'Profil Pengguna', 'Guru']);
})

const store = useStore()
const userId = store.getters.currentUser.user_id 

const router = useRouter()

const form = reactive({
  status_import_guru: '',
  file: null
})

function postData() {
  const formData = new FormData()
  formData.append('status_import_guru', form.status_import)
  formData.append('user_id', userId)
  formData.append('file', form.file)

  request.post('data/import_guru', formData, {
    headers: {
      'Content-Type' : 'multipart/form-data'
    }
  }).then(res => {
    router.push('/sekolah/profil-pengguna/guru')
  })
}
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <h2 class="fs-1 fw-bold py-6 m-0">Import Data</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-column gap-4">
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Import</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-select class="w-100" v-model="form.status_import" placeholder="Jenis Import">
                <el-option label="Import Data Guru" value="import_data" />
                <el-option label="Import RFID Guru" value="import_rfid" />
              </el-select>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <div>
            <a class="btn btn-primary d-flex gap-3 align-items-center w-auto">
              <span>
                Generate Excel Format
              </span>
            </a>
          </div>
        </div>
        
        <div class="mt-4">

          <div class="mt-4" v-if="form.status_import">
            <p class="mb-2 fs-4 fw-bold">File Import</p>
            <div v-if="form.status_import == 'import_data'">
              <p class="mb-2">*Tentukan data kelas apa yg anda ingin import, Lalu generate excel format</p>
            </div>
            <div v-if="form.status_import == 'import_rfid'">
              <p class="mb-2">*Generate excel format untuk import RFID</p>
              <p class="mb-2">*Isi Data RFID guru di kolom RFID</p>
            </div>
            <p class="mb-2">*Pastikan file sesuai formatnya seperti yg anda generate</p>
            <FileDrop v-model:fileInputData="form.file"></FileDrop>
          </div>
          <div class="d-flex justify-content-end gap-4">
            <a @click.prevent="router.push('/sekolah/profil-pengguna/guru')" href="#" class="btn btn-light">Batal</a>
            <a @click.prevent="postData" class="btn btn-primary">Simpan</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>