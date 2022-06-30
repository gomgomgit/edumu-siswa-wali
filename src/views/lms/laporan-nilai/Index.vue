<script setup>
import PageTabs from '@/components/page-tabs/index.vue'
import { ref } from 'vue'

const tabs = [
  {
    to: '/lms/laporan-nilai/tugas-online',
    title: 'Ujian & Tugas Online'
  },
  {
    to: '/lms/laporan-nilai/tugas-offline',
    title: 'Tugas Offline'
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