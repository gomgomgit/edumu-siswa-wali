<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex flex-shrink-0">
    <!--begin::Invite user-->
    <div class="d-flex ms-3">
      <a
        href="#"
        class="btn btn-flex flex-center btn-bg-white btn-text-gray-500 btn-active-color-primary w-auto h-40px px-3 px-md-6"
        tooltip="New Member"
        data-bs-toggle=""
        data-bs-target=""
      >
        <!-- <span class="svg-icon svg-icon-2 svg-icon-primary me-0 me-md-2">
          <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
        </span> -->
        <span class="">SMK Muhammadiyah Kota Cirebon</span>
      </a>
    </div>
    <!--end::Invite user-->

    
    <div
      class="d-flex align-items-center ms-5"
      id="kt_header_user_menu_toggle"
    >
      <div
        class="cursor-pointer symbol symbol-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-overflow="true"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-flip="bottom-end"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        data-bs-dismiss="click"
        title="User profile"
      >
        <img src="media/avatars/300-1.jpg" alt="metronic" />
      </div>
      <KTUserMenu></KTUserMenu>
    </div>
  </div>
  <!--end::Toolbar wrapper-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTUserMenu from "@/layout/header/partials/UserMenu.vue";

export default defineComponent({
  name: "layout-topbar",
  components: {
    KTUserMenu,
  },
});
</script>
