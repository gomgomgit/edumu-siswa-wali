<template>
  <!--begin::Head-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center">

        <h3 class="mb-4 mb-sm-0 fs-1">Ujian Online</h3>

        <!-- begin::Tabs  -->
        <div class="d-flex w-100 gap-4 w-sm-auto justify-content-end">
          <router-link
            to="/ujian-online/peserta-ujian"
            active-class="active"
            class="btn btn-active-warning"
          >
            <span>Peserta Ujian</span>
          </router-link>
          <router-link
            to="/ujian-online/pantau-ujian"
            active-class="active"
            class="btn btn-active-warning"
          >
            <span>Pantau Ujian</span>
          </router-link>
          <router-link
            to="/ujian-online/kategori"
            active-class="active"
            class="btn btn-active-warning"
          >
            <span>Kategori</span>
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
