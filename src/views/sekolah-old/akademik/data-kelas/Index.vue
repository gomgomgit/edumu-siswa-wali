<script setup>
import PageTabs from '@/components/page-tabs/index.vue'
import { ref } from 'vue'

const tabs = [
  {
    to: '/sekolah/akademik/data-kelas/utama',
    title: 'Utama'
  },
  {
    to: '/sekolah/akademik/data-kelas/wali-kelas',
    title: 'Wali Kelas'
  },
  {
    to: '/sekolah/akademik/data-kelas/mutasi-kelas',
    title: 'Mutasi Kelas'
  },
]
</script>

<template>
  <div>
    <PageTabs :tabs="tabs"></PageTabs>

    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'slide-fade'">
        <component :is="Component"/>
      </transition>
    </router-view> 
  </div>
</template>