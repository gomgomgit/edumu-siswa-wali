<script setup>
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { request } from "@/util";
import { onMounted, reactive, ref } from "vue";
import ImageInput from '@/components/image-input/Index.vue'
import ImageCropper from '@/components/image-cropper/Index.vue'
import CKEditor from '@/components/ckeditor/Index.vue'
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

onMounted(() => {
  setCurrentPageBreadcrumbs('Tambah Berita', ['Informasi', 'Berita'])
  getKategori()
})

const router = useRouter()

const categories = ref()
const form = reactive({
  'cat_id': '',
  'content_name': '',
  'content_shortdesc': '',
  'content_desc': '',
  'content_image': null,
  'content_status': '',
})

function getKategori() {
  request.post('kategori')
    .then(res => {
      categories.value = res.data.data
    })
}

function cropImage({ coordinates, canvas }) {
  console.log(coordinates, canvas)
}

function postBerita() {
  const formData = new FormData()
  formData.append('cat_id', form.cat_id)
  formData.append('content_name', form.content_name)
  formData.append('content_type', 'content')
  formData.append('content_shortdesc', form.content_shortdesc)
  formData.append('content_desc', form.content_desc)
  formData.append('content_image', form.content_image)
  formData.append('content_status', form.content_status)

  request.post('konten/add', formData, {
    headers: {
      'Content-Type' : 'multipart/form-data'
    }
  }).then(res => {
      useToast().success('Data Berhasil Ditambahkan!')
      router.push('/sekolah/informasi/berita')
  })
}
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <h2 class="fs-1 fw-bold py-6">Tambah Data Berita</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-column gap-4">
          <div class="row">
            <div class="col-3 d-flex">
              <p class="m-0 fs-4 fw-bold">Kategori</p>
            </div>
            <div class="col-9 align-items-center d-flex">
              <select v-model="form.cat_id" class="form-select form-select-solid">
                <template v-for="cat in categories" :key="cat.cat_id">
                  <option :value="cat.cat_id">{{cat.cat_name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-3 pt-3">
              <p class="m-0 fs-4 fw-bold">Judul Berita</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="form.content_name" placeholder="Judul Berita" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 pt-3">
              <p class="m-0 fs-4 fw-bold">Gambar</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <ImageCropper  v-model:fileInputData="form.content_image" :ratio="16/9" :cropRequire="true"/>
            </div>
          </div>
          <div class="row">
            <div class="col-3 pt-3">
              <p class="m-0 fs-4 fw-bold">Deskripsi Singkat</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-input v-model="form.content_shortdesc" type="textarea" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 pt-3">
              <p class="m-0 fs-4 fw-bold">Deskripsi Lengkap</p>
            </div>
            <div class="col-9 align-items-center">
              <!-- <el-input v-model="form.content_desc" type="textarea" /> -->
              <CKEditor width="100%" v-model:editorValue="form.content_desc" />
            </div>
          </div>
          <div class="row">
            <div class="col-3 pt-3">
              <p class="m-0 fs-4 fw-bold">Status Aktif</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <div class="form-check form-check-inline">
                <input
                  v-model="form.content_status"
                  class="form-check-input"
                  type="radio"
                  id="mapel-status-1"
                  :value="1">
                <label class="form-check-label" for="mapel-status-1">Aktif</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  v-model="form.content_status"
                  class="form-check-input"
                  type="radio"
                  id="mapel-status-0"
                  :value="0">
                <label class="form-check-label" for="mapel-status-0">Non Aktif</label>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end gap-4">
            <a href="#" class="btn btn-light">Batal</a>
            <a @click.prevent="postBerita" class="btn btn-primary">Simpan</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>