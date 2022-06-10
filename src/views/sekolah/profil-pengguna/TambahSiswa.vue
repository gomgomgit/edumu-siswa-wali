<script setup>
import { onMounted, ref } from 'vue'
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { request } from '@/util'  
import FileInput from '@/components/file-input'


onMounted(() => {
  setCurrentPageBreadcrumbs("Tambah Siswa", ['Sekolah', "Profil Pengguna", "Siswa"]);
  getDataKelas()
  getDataWali()
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

const kelasData = ref([])
const waliData = ref([])

const fileInput = ref([])

function getDataKelas() {
  request.post('kelas', null).then(res => {
    kelasData.value = res.data.data
  })
}
function getDataWali() {
  request.post('get_wali', null).then(res => {
    waliData.value = res.data.data
  })
}

function post() {
  console.log(dialogImageUrl.value)
  console.log(dialogVisible.value)
}

function checkTest() {
  console.log(fileInput.value)
}

</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <h2 class="fs-1 fw-bold py-6">Tambah Data Siswa</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-column gap-4">
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Kelas</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <div class="flex-grow-1">
                <el-select class="w-100" v-model="kelas" filterable placeholder="Select">
                  <el-option v-for="kls in kelasData" :key="kls.kelas_id" :label="kls.kelas_nama"
                    :value="kls.kelas_id" />
                </el-select>
              </div>
              <div>
                <button to="/sekolah/profil-pengguna/siswa/tambah-data"
                  class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                  <i class="bi bi-plus fs-1"></i>
                  <span>
                    Tambah Kelas
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Wali</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <div class="flex-grow-1">
                <el-select class="w-100" v-model="wali" filterable placeholder="Select">
                  <el-option v-for="wali in waliData" :key="wali.wali_id" :label="wali.user_nama"
                    :value="wali.wali_id" />
                </el-select>
              </div>
              <div>
                <button to="/sekolah/profil-pengguna/siswa/tambah-data"
                  class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                  <i class="bi bi-plus fs-1"></i>
                  <span>
                    Tambah Wali
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Nama Lengkap</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="namaLengkap" placeholder="Nama Lengkap" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">NISN</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="nisn" placeholder="NISN" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">No.Induk Siswa</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="nis" placeholder="Nomor Induk Siswa" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Tahun Angkatan</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="tahunAngkatan" placeholder="Tahun Angkatan" />
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
              <p class="m-0 fs-4 fw-bold">No Handphone</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="noHp" placeholder="No Handphone" />
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
              <p class="m-0 fs-4 fw-bold">Status Aktif</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-select class="w-100" v-model="statusAktif" placeholder="Pilih Status Aktif">
                <el-option label="Aktif" value="1" />
                <el-option label="Non Aktif" value="0" />
              </el-select>
            </div>
          </div>
          <div>
            <p class="m-0 fs-4 fw-bold mb-4">Foto Siswa</p>
            <FileInput v-model:fileInputData="fileInput"></FileInput>
          </div>
          <div class="d-flex justify-content-end gap-4">
            <a href="#" class="btn btn-light">Discard</a>
            <a href="#" @click.prevent="checkTest" class="btn btn-primary">Save Changes</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>