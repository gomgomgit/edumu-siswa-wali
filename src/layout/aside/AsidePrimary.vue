<script setup>
import { defineComponent } from "vue";
import KTQuickLinksMenu from "@/layout/header/partials/QuickLinksMenu.vue";
import KTUserMenu from "@/layout/header/partials/UserMenu.vue";
import { useStore } from "vuex";

const emit = defineEmits(['openSubMenu', 'closeSubMenu'])

const store = useStore()
const userData = store.getters.currentUser

function openSubMenu(menu) {
  emit('openSubMenu', menu)
}

</script>

<template>
  <div
    class="aside-primary d-flex flex-column align-items-lg-center flex-row-auto"
  >
    <div
      class="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-10"
      id="kt_aside_logo"
    >
      <a href="#">
        <img alt="Logo" src="media/logos/Logo-Edumu.png" class="h-64px" />
      </a>
    </div>

    <div
      class="aside-nav d-flex flex-column align-items-center flex-column-fluid w-100 pt-5 pt-lg-0"
      id="kt_aside_nav"
    >
      <div
        class="hover-scroll-y mb-10"
        data-kt-scroll="true"
        data-kt-scroll-activate="{default: false, lg: true}"
        data-kt-scroll-height="auto"
        data-kt-scroll-wrappers="#kt_aside_nav"
        data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
        data-kt-scroll-offset="0px"
      >
        <ul class="nav flex-column">
          <li
            class="nav-item mb-2"
            data-bs-toggle="tooltip"
            data-bs-trigger="hover"
            data-bs-placement="right"
            data-bs-dismiss="click"
            data-bs-original-title="Projects"
          >
            <a
              class="nav-link btn btn-icon btn-active-color-primary btn-color-gray-400 btn-active-light active"
              data-bs-toggle="tab"
              href="#kt_aside_nav_tab_projects"
              @mouseenter="openSubMenu('kt_aside_nav_tab_projects')"
            >
              <span class="svg-icon svg-icon-2x">
                <inline-svg src="media/icons/duotune/general/gen025.svg" />
              </span>
            </a>
          </li>

          <li
            class="nav-item mb-2"
            data-bs-toggle="tooltip"
            data-bs-trigger="hover"
            data-bs-placement="right"
            data-bs-dismiss="click"
            data-bs-original-title="Siswa"
          >
            <a
              class="nav-link btn btn-icon btn-active-color-primary btn-color-gray-400 btn-active-light"
              data-bs-toggle="tab"
              href="#kt_aside_nav_tab_siswa"
              @mouseenter="openSubMenu('kt_aside_nav_tab_siswa')"
            >
              <span class="svg-icon svg-icon-2x">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <rect x="0" y="0" width="24" height="24" />
                    <path
                      d="M13.6855025,18.7082217 C15.9113859,17.8189707 18.682885,17.2495635 22,17 C22,16.9325178 22,13.1012863 22,5.50630526 L21.9999762,5.50630526 C21.9999762,5.23017604 21.7761292,5.00632908 21.5,5.00632908 C21.4957817,5.00632908 21.4915635,5.00638247 21.4873465,5.00648922 C18.658231,5.07811173 15.8291155,5.74261533 13,7 C13,7.04449645 13,10.79246 13,18.2438906 L12.9999854,18.2438906 C12.9999854,18.520041 13.2238496,18.7439052 13.5,18.7439052 C13.5635398,18.7439052 13.6264972,18.7317946 13.6855025,18.7082217 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10.3144829,18.7082217 C8.08859955,17.8189707 5.31710038,17.2495635 1.99998542,17 C1.99998542,16.9325178 1.99998542,13.1012863 1.99998542,5.50630526 L2.00000925,5.50630526 C2.00000925,5.23017604 2.22385621,5.00632908 2.49998542,5.00632908 C2.50420375,5.00632908 2.5084219,5.00638247 2.51263888,5.00648922 C5.34175439,5.07811173 8.17086991,5.74261533 10.9999854,7 C10.9999854,7.04449645 10.9999854,10.79246 10.9999854,18.2438906 L11,18.2438906 C11,18.520041 10.7761358,18.7439052 10.4999854,18.7439052 C10.4364457,18.7439052 10.3734882,18.7317946 10.3144829,18.7082217 Z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                  </g>
                </svg>
              </span>
            </a>
          </li>

          <li
            class="nav-item mb-2"
            data-bs-toggle="tooltip"
            data-bs-trigger="hover"
            data-bs-placement="right"
            data-bs-dismiss="click"
            data-bs-original-title="Sekolah"
          >
            <a
              class="nav-link btn btn-icon btn-active-color-primary btn-color-gray-400 btn-active-light"
              data-bs-toggle="tab"
              href="#kt_aside_nav_tab_sekolah"
              @mouseenter="openSubMenu('kt_aside_nav_tab_sekolah')"
            >
              <span class="svg-icon svg-icon-2x">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <rect x="0" y="0" width="24" height="24" />
                    <path
                      d="M5.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L5.5,11 C4.67157288,11 4,10.3284271 4,9.5 L4,5.5 C4,4.67157288 4.67157288,4 5.5,4 Z M11,6 C10.4477153,6 10,6.44771525 10,7 C10,7.55228475 10.4477153,8 11,8 L13,8 C13.5522847,8 14,7.55228475 14,7 C14,6.44771525 13.5522847,6 13,6 L11,6 Z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <path
                      d="M5.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M11,15 C10.4477153,15 10,15.4477153 10,16 C10,16.5522847 10.4477153,17 11,17 L13,17 C13.5522847,17 14,16.5522847 14,16 C14,15.4477153 13.5522847,15 13,15 L11,15 Z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="aside-footer d-flex flex-column align-items-center flex-column-auto"
      id="kt_aside_footer"
    >
      <div
        class="d-flex align-items-center mb-6"
        id="kt_header_user_menu_toggle"
      >
        <div
          class="cursor-pointer symbol symbol-40px"
          data-kt-menu-trigger="click"
          data-kt-menu-overflow="true"
          data-kt-menu-placement="top-start"
          data-kt-menu-flip="top-end"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          data-bs-dismiss="click"
          title="User profile"
        >
          <img :src="userData.sekolah_foto" alt="metronic" />
        </div>
        <KTUserMenu></KTUserMenu>
      </div>
      
    </div>
  </div>
</template>
