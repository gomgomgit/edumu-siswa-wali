<template>
  <!--begin::Dashboard-->
  <div class="row gy-5 g-xl-8">
    <div class="col-xxl-4">
      <SekolahPengguna
        widget-classes="card-xl-stretch mb-xl-8"
        widget-color="danger"
        chart-height="200"
        stroke-color="#cb1e46"
        :count="datas?.count"
      ></SekolahPengguna>
    </div>
    
    <div class="col-xxl-8 mb-6">
      <Calendar
        :datas="datas?.calendars"
        widget-classes="card-xxl-stretch mb-5 mb-xl-8"
      ></Calendar>
    </div>
  </div>

  <div class="row gy-5 gx-xl-8">
    <div class="col-xxl-4">
      <!-- <Materi :datas="datas?.dataMateri" widget-classes="card-xxl-stretch mb-xl-3"></Materi> -->
      <Materi 
        widget-classes="card-xxl-stretch mb-xl-3"
        :total="datas?.count?.countMateri"
        :datas="datas?.dataMateri"
      ></Materi>
    </div>
    <div class="col-xxl-8">
      <Tugas
        :total="datas?.count?.countTugas"
        :datas="datas?.dataTugas"
        widget-classes="card-xxl-stretch mb-5 mb-xl-8"
      ></Tugas>
    </div>
  </div>

  <div class="row gy-5 g-xl-8">
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
import QueryString from "qs"

onMounted(() => {
  setCurrentPageBreadcrumbs("Dashboard", []);
  getData()
});

const datas = ref()

const store = useStore()
const userId = store.getters.currentUser.user_id
const siswaId = store.getters.currentUser.siswa_id

function getData() {
  request.post('dashboard/revamp', QueryString.stringify({user_id: userId, siswa_id: siswaId}))
  .then(res => {
    datas.value = res.data.data
  })
}
</script>
