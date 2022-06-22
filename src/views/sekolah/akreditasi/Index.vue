<script setup>
import PageTabs from '@/components/page-tabs/index.vue'
import { ref } from 'vue'

const tabs = [
  {
    to: '/sekolah/akreditasi/akreditasi',
    title: 'Akreditasi'
  },
  {
    to: '/sekolah/akreditasi/website',
    title: 'Website'
  },
  {
    to: '/sekolah/akreditasi/unduh-pdf',
    title: 'Unduh PDF'
  },
  {
    to: '/sekolah/akreditasi/video',
    title: 'Video'
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