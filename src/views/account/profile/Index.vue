<script setup>
import { onMounted, reactive, ref } from 'vue'
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { request } from '@/util';
import QueryString from 'qs';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';

onMounted(() => {
  setCurrentPageBreadcrumbs("My Profile", ['Account']);
  getProfile()
})

const router = useRouter()
const userId = 255

const form = reactive({
  user_id: '',
  user_nama: '',
  user_username: '',
  user_level: '',
  user_status: '',
  user_password: '',
})

function getProfile() {
  request.get('user/' + userId)
  .then(res => {
    const result = res.data.data

    form.user_id = result.user_id
    form.user_nama = result.user_nama
    form.user_level = result.user_level
    form.user_status = result.user_status
    form.user_username = result.user_username
  })
}
function post() {
  request.post('user/edit', QueryString.stringify(form))
  .then(res => {
    useToast().success('Data berhasil diedit!')
    router.push('/account/profile')
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
              <p class="m-0 fs-4 fw-bold">Nama Lengkap</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="form.user_nama" placeholder="Nama Lengkap" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Username</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="form.user_username" placeholder="Username" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Password</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="form.user_password" placeholder="Ganti password anda (Biarkan kosong jika tidak ingin mengganti)" />
            </div>
          </div>
          <div class="d-flex justify-content-end gap-4">
            <a @click.prevent="post" class="btn btn-primary">Simpan</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>