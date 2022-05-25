<template>
  <!--begin::Head-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center">

        <h3 class="m-0 fs-1">Ujian Online</h3>

        <!-- begin::Tabs  -->
        <div class="d-flex">
          <router-link
            to="/ujian-online/peserta-ujian"
            active-class="active"
          >
            <a href="#" class="btn btn-active-warning">Peserta Ujian</a>
          </router-link>
          <router-link
            to="/ujian-online/pantau-ujian"
            active-class="active"
          >
            <a href="#" class="btn btn-active-warning">Pantau Ujian</a>
          </router-link>
          <router-link
            to="/ujian-online"
            active-class="active"
          >
            <a href="#" class="btn btn-active-warning">Kategori</a>
          </router-link>
        </div>
        <!-- end::Tabs  -->
      </div>
    </div>
  </div>
  <!--end::Head-->

  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";

export default defineComponent({
  name: "profile-page-layout",
  components: {
    Dropdown3,
  },
});
</script>
