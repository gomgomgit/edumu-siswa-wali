<script setup>
import { ref } from "vue"


const props = defineProps({
  tabs: Array
})

// Props tabs

// const tabs = ref([
//   {
//     to: '/sekolah/akademik/data-kelas/utama',
//     title: 'Utama'
//   },
//   {
//     to: '/sekolah/akademik/data-kelas/wali-kelas',
//     title: 'Wali Kelas'
//   },
//   {
//     to: '/sekolah/akademik/data-kelas/mutasi-kelas',
//     title: 'Mutasi Kelas'
//   },
// ])
</script>

<template>
  <div class="d-flex w-100 justify-content-between pb-8 pt-4 px-10">
    <div class="d-flex w-100 gap-4 w-sm-auto">
      <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">

        <template v-for="(tab, index) in props.tabs" :key="index">
          <li class="nav-item">
            <router-link 
              active-class="active router-link-exact-active text-active-primary" 
              :to="tab.to" 
              class="nav-link text-black-50 me-6"
            > 
              <span>{{tab.title}}</span>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
