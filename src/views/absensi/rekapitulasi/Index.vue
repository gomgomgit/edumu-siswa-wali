<script setup>
import PageTabs from '@/components/page-tabs/index.vue'
import { ref } from 'vue'

const tabs = [
  {
    to: '/absensi/rekapitulasi/siswa',
    title: 'Siswa'
  },
  {
    to: '/absensi/rekapitulasi/guru',
    title: 'Guru'
  },
  {
    to: '/absensi/rekapitulasi/mapel',
    title: 'Mapel'
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