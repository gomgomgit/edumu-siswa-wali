<script setup>
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';
import { onMounted } from 'vue';

onMounted(() => {
  setCurrentPageBreadcrumbs("Unduh PDF", ['Sekolah', 'Akreditasi']);
})
</script>
<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <h2 class="fs-1 fw-bold py-6">Unduh PDF</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div>
          <iframe src="https://bansm.kemdikbud.go.id/unduh" class="w-100 vh-100"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>