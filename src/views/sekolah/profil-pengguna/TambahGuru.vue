<script setup>
import { onMounted, ref } from 'vue'
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { request } from '@/util';
import { Plus } from '@element-plus/icons-vue'
import { UploadProps, UploadUserFile } from 'element-plus'


onMounted(() => {
  setCurrentPageBreadcrumbs("Tambah Guru", ['Sekolah', "Profil Pengguna", "Guru"]);
})

const namaGuru = ref('')
const nip = ref('')
const refIdKartu = ref('')
const username = ref('')
const password = ref('')
const status = ref('')
const foto = ref('')


const dialogImageUrl = ref('')
const dialogVisible = ref(false)

function post() {
  console.log(dialogImageUrl.value)
  console.log(dialogVisible.value)
}

function handleRemove (uploadFile, uploadFiles) {
  console.log(uploadFile, uploadFiles)
}

function handlePictureCardPreview (uploadFile) {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <h2 class="fs-1 fw-bold py-6">Tambah Data Guru</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-column gap-4">
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Nama Guru</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="namaGuru" placeholder="Nama Guru" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">NIP Guru</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="nip" placeholder="NIP Guru" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">REF ID KARTU</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="refIdKartu" placeholder="Masukkan REF ID KARTU valid" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Username</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="username" placeholder="Username" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Password</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input type="password" show-password v-model="password" placeholder="Masukkan Password" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Status</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-select class="w-100" v-model="statu" placeholder="Pilih Status">
                <el-option label="Aktif" value="1" />
                <el-option label="Non Aktif" value="0" />
              </el-select>
            </div>
          </div>

          <div class="">
            <p class="m-0 fs-4 fw-bold mb-6">File Foto</p>
            <div>
              <el-upload list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                :file-list="fileList" :auto-upload="false">
                <el-icon>
                  <Plus />
                </el-icon>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </div>
          </div>
          <div class="d-flex justify-content-end gap-4">
            <a href="#" class="btn btn-light">Discard</a>
            <a href="#" class="btn btn-primary">Save Changes</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>