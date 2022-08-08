<script setup>
import PageTabs from '@/components/page-tabs/index.vue'
import { ref } from 'vue'

const tabs = [
  {
    to: '/sekolah/jadwal/pelajaran',
    title: 'Pelajaran'
  },
  {
    to: '/sekolah/jadwal/hari-ini',
    title: 'Hari ini'
  },
  {
    to: '/sekolah/jadwal/mingguan',
    title: 'Mingguan'
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