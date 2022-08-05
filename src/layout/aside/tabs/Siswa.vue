<template>
  <!--begin::Header-->
  <div class="card-header border-0 pt-5">
    <h3 class="card-title align-items-start flex-column">
      <span class="card-label fw-bolder text-dark">LMS</span>
    </h3>
  </div>
  <!--end::Header-->

  <!--begin::Body-->
  <div class="card-body pt-5">
    <template v-for="(item, index) in items" :key="index">
      <!--begin::Item-->
      <router-link
        class="menu-link"
        active-class="active"
        :to="item.route"
      >
        <div
          class="mb-7 d-flex align-items-center"
        >
          <!--begin::Symbol-->
          <div class="symbol symbol-50px me-5">
            <span :class="`bg-light-${item.color}`" class="symbol-label">
              <span
                :class="`svg-icon-${item.color}`"
                class="svg-icon svg-icon-2x"
              >
                <inline-svg :src="item.icon" />
              </span>
            </span>
          </div>
          <!--end::Symbol-->

          <!--begin::Text-->
          <div class="d-flex flex-column">
            <a href="#" class="text-dark text-hover-primary fs-6 fw-bolder">{{
              item.title
            }}</a>

            <span class="text-muted fw-bold">{{ item.description }}</span>
          </div>
          <!--end::Text-->
        </div>
      </router-link>
      <!--end::Item-->
    </template>
  </div>
  <!--end::Body-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "kt-tasks-overview",
  components: {},
  setup() {
    const items = [
      {
        icon: "media/icons/duotune/electronics/elc001.svg",
        color: "warning",
        title: "Ujian Online",
        description: "Pengerjaan ujian secara online",
        route: "/lms/ujian-online"
      },
      {
        icon: "media/icons/duotune/files/fil019.svg",
        color: "primary",
        title: "Tugas",
        description: "Kumpulan Tugas tugas",
        route: "/lms/tugas"
      },
      {
        icon: "media/icons/duotune/general/gen005.svg",
        color: "danger",
        title: "Materi Belajar",
        description: "Kumpulan materi pembelajaran",
        route: "/lms/materi"
      },
    ];

    return {
      items,
    };
  },
});
</script>
