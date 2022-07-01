<script setup>
import { onMounted, reactive, ref } from 'vue'
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { request } from '@/util';
import QueryString from 'qs';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';

onMounted(() => {
  setCurrentPageBreadcrumbs("Umum", ['Pengaturan']);
  getPengaturan()
})

const router = useRouter()

const form = reactive({
  app_version: '',
  timezone: '',
  attendance: '',
  pulang: '',
  admin_call: '',
  android_guru_app_version: '',
  app_version_ios: '',
  ios_guru_app_version: '',
  totmasuk: '',
  examout: '',
})
function getPengaturan() {
  request.post('setting')
  .then(res => {
    res.data.data.forEach(set => {
      form[set.setting_name] = set.setting_value
    });
  })
}
function post() {
  request.post('setting/edit', QueryString.stringify(form))
  .then(res => {
    useToast().success('Data berhasil diedit!')
  })
}

</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <h2 class="fs-1 fw-bold py-6">Data Umum</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-column gap-4">
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Siswa Wali Version</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="form.app_version" placeholder="Siswa Wali Version" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Timezone</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-select class="w-100" v-model="form.timezone" placeholder="Pilih Timezone">
                <el-option label="WIB" value="wib" />
                <el-option label="WITA" value="wita" />
                <el-option label="WIT" value="wit" />
              </el-select>
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Jam Masuk Sekolah</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <!-- <el-time-picker
                v-model="form.attendance"
                arrow-control
                format="HH:mm"
                placeholder="Jam Masuk Sekolah"
              /> -->
              <el-input v-model="form.attendance" placeholder="Jam Masuk Sekolah" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Jam Pulang Sekolah</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <!-- <el-time-picker
                v-model="form.pulang"
                arrow-control
                format="HH:mm"
                placeholder="Jam Pulang Sekolah"
              /> -->
              <el-input v-model="form.pulang" placeholder="Jam Pulang Sekolah" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">HP Admin</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="form.admin_call" placeholder="No Hp Admin" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Android Guru Version</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="form.android_guru_app_version" placeholder="Android Guru Version" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Siswa Wali IOS Version</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="form.app_version_ios" placeholder="Siswa Wali IOS Version" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Guru IOS Version</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="form.ios_guru_app_version" placeholder="Guru IOS Version" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Total Masuk Sekolah</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="form.totmasuk" placeholder="Total Masuk Sekolah" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Max Keluar Ujian</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="form.examout" placeholder="Max Keluar Ujian" />
            </div>
          </div>
          <div class="d-flex justify-content-end gap-4">
            <!-- <a href="#" class="btn btn-light">Batal</a> -->
            <a @click.prevent="post" class="btn btn-primary">Simpan</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>