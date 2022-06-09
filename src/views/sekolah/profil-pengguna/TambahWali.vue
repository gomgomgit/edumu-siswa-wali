<script setup>
import { onMounted, ref } from 'vue'
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { request } from '@/util';
import { Plus } from '@element-plus/icons-vue'
import { UploadProps, UploadUserFile } from 'element-plus'


onMounted(() => {
  setCurrentPageBreadcrumbs("Tambah Wali", ['Sekolah', "Profil Pengguna", "Wali"]);
})

const kelas = ref('')
const wali = ref('')
const namaLengkap = ref('')
const nisn = ref('')
const nis = ref('')
const tahunAngkatan = ref('')
const alamat = ref('')
const provinsi = ref('')
const kota = ref('')
const noHp = ref('')
const jenisKelamin = ref('')
const tempatLahir = ref('')
const tanggalLahir = ref('')
const refIdKartu = ref('')
const username = ref('')
const password = ref('')
const statusAktif = ref('')
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
          <h2 class="fs-1 fw-bold py-6">Tambah Data Wali</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-column gap-4">
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Nama Wali</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="namaWali" placeholder="Nama Wali" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">No Handphone</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="noHp" placeholder="No Handphone" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Alamat</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input
                v-model="alamat"
                :rows="3"
                type="textarea"
                placeholder="Please input"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Provinsi</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="profinsi" placeholder="Provinsi" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Kota</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="kota" placeholder="Kota" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Jenis Kelamin</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-select class="w-100" v-model="jenisKelamin" placeholder="Pilih Jenis Kelamin">
                <el-option label="Laki-laki" value="l" />
                <el-option label="Perempuan" value="p" />
              </el-select>
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Tempat Lahir</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="tempatLahir" placeholder="Tempat Lahir" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Tanggal Lahir</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-date-picker
                v-model="tanggalLahir"
                class=""
                type="date"
                placeholder="Pilih Tanggal Lahir"
                size=""
              />
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
              <p class="m-0 fs-4 fw-bold">Status Aktif</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-select class="w-100" v-model="statusAktif" placeholder="Pilih Status Aktif">
                <el-option label="Aktif" value="1" />
                <el-option label="Non Aktif" value="0" />
              </el-select>
            </div>
          </div>

          <div class="">
            <p class="m-0 fs-4 fw-bold mb-6">File Foto</p>
            <div>
              <el-upload
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-icon><Plus /></el-icon>
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