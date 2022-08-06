<script setup>
import PageTabs from '@/components/page-tabs/index.vue'
import { ref } from 'vue'

const tabs = [
  {
    to: '/lms/ujian-online/ujian',
    title: 'Ujian Online'
  },
  {
    to: '/lms/ujian-online/tugas',
    title: 'Tugas Online'
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