<script setup>
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';
import { request } from '@/util';
import moment from 'moment';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import ServerSideTable from '@/components/ServerSideTable.vue';
import { useStore } from 'vuex';
  import queryString from "qs";

onMounted(() => {
  getData()
  setCurrentPageBreadcrumbs('Detail', ['Sekolah', 'Informasi', 'Prestasi'])
})

const store = useStore()
const currentUser = store.getters.currentUser
const storageUrl = process.env.VUE_APP_STORAGE_URL;

const route = useRoute()

const contentId = route.params.id
const detailData = ref([])


function getData() {
  request.post('pengumuman/detail', queryString.stringify({
    content_id: contentId,
  })).then(res => {
    detailData.value = res.data.data.content[0]
  })
}

function formatingDate(date) {
  return {
    date: moment(date).format('DD/MM/Y'),
    time: moment(date).format('LT')
  }
}
</script>
<template>
<div>
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="mb-4">
          <div class="d-flex justify-content-between">
            <h2 class="fs-1 fw-bold py-4">Detail Prestasi</h2>
            <div>
              <router-link :to="'/sekolah/informasi/prestasi'" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                <i class="bi bi-arrow-left-circle fs-1"></i>
                <span>
                  Kembali
                </span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="separator border-black-50 border-2 mb-6"></div>
        <div>
          <div class="fs-1 fw-bold text-center">{{detailData.content_name}}</div>
          <div class="fs-5 font-gray-700 text-center">{{detailData.content_create_date}}</div>
          <div class="my-4 text-center">
            <div class="p-2 bg-secondary d-inline-block mw-100">
              <img class="mw-100"  :src="`${storageUrl}/${currentUser.sekolah_kode}/apischool/public` + '/images/konten/' + detailData.content_image" alt="">
            </div>
          </div>
          <div class="mt-6 fs-4" v-html="detailData.content_desc"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>