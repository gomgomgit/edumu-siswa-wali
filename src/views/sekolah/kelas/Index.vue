<script setup>
import PageTabs from '@/components/page-tabs/index.vue'
import { ref } from 'vue'

const tabs = [
  {
    to: '/sekolah/kelas/hari-ini',
    title: 'Hari ini'
  },
  {
    to: '/sekolah/kelas/mingguan',
    title: 'Mingguan'
  },
  {
    to: '/sekolah/kelas/kursus',
    title: 'Kursus'
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