<script setup>
import PageTabs from '@/components/page-tabs/index.vue'

const tabs = [
  {
    to: '/sekolah/mata-pelajaran/data-mapel',
    title: 'Data Mapel'
  },
  {
    to: '/sekolah/mata-pelajaran/jadwal-pelajaran',
    title: 'Jadwal Pelajaran'
  }
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