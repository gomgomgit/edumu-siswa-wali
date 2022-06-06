<script setup>
import PageTabs from '@/components/page-tabs'
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

    <div class="card mb-5 mb-xxl-8">
      <div class="card-body pt-5 pb-5">
        <!-- Page Content -->
        
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'slide-fade'">
            <component :is="Component"/>
          </transition>
        </router-view> 
      </div>
    </div>
  </div>
</template>

<style>
  .el-input__inner {
    background: rgba(32, 139, 255, 0.5);
  }
  .el-input__inner::placeholder {
    color: #0084AD;
  }
  .el-input__suffix .icon {
    color: #0084AD;
  }
</style>