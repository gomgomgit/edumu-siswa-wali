<script setup>
import PageTabs from '@/components/page-tabs/index.vue'
import { ref } from 'vue'

const tabs = [
  {
    to: '/siswa/kelas/hari-ini',
    title: 'Hari ini'
  },
  {
    to: '/siswa/kelas/mingguan',
    title: 'Mingguan'
  },
  {
    to: '/siswa/kelas/kursus',
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