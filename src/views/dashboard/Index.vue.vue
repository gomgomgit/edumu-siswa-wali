<template>
  <!--begin::Dashboard-->
  <div class="row gy-5 g-xl-8">
    <div class="col-xxl-4">
      <SekolahPengguna
        widget-classes="card-xl-stretch mb-xl-8"
        widget-color="danger"
        chart-height="200"
        stroke-color="#cb1e46"
        :siswa="datas?.countSiswa"
        :siswaOnline="datas?.siswaOnline"
        :guru="datas?.countGuru"
        :guruOnline="datas?.guruOnline"
      ></SekolahPengguna>
    </div>
    <div class="col-xxl-8">
      <Calendar
        class="mb-8"
        widget-classes="card-xxl-stretch mb-5 mb-xl-8"
      ></Calendar>
    </div>
  </div>

  <div class="row gy-5 gx-xl-8">
    <div class="col-xxl-4">
      <Materi widget-classes="card-xxl-stretch mb-xl-3"></Materi>
    </div>
    <div class="col-xxl-8">
      <Tugas
        :datas="datas?.dataTugas"
        widget-classes="card-xxl-stretch mb-5 mb-xl-8"
      ></Tugas>
    </div>
  </div>
  <!--end::Dashboard-->
</template>

<script setup>
import { defineComponent, onMounted, ref } from "vue";
import SekolahPengguna from "./widgets/SekolahPengguna.vue";
import Materi from "./widgets/Materi.vue";
import Tugas from "./widgets/Tugas.vue";
import Calendar from "./widgets/Calendar.vue";
import { setCurrentPageTitle, setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { request } from "@/util";

onMounted(() => {
  setCurrentPageBreadcrumbs("Dashboard", []);
  getData()
});

const datas = ref()

function getData() {
  request.post('dashboard')
  .then(res => {
    datas.value = res.data.data
  })
}
</script>
