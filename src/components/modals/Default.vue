<script setup>
  const props = defineProps({
    show: Boolean
  })

  const emits = defineEmits('closeModal')
</script>

<template>
  <div class="modal-wrapper">
      <transition name="fade">
        <div v-if="props.show" class="modal-overlay" @click="emits('closeModal')"></div>
      </transition>
      
      <transition name="slide-fade">
        <div v-if="props.show" class="modal-container">
          <div class="modal-header d-block border-bottom border-secondary">
            <div class="fw-bold fs-1 m-4">
              Tambah Data
            </div>
            <div class="fw-bold fs-4 m-4">
              <span class="text-black-50">Sekolah / Akademik / Tahun Ajar /</span>
              <span> Tambah Data</span> 
            </div>
          </div>
          <div class="modal-body py-4">
            <slot/>
          </div>
          <div class="modal-footer border-top border-secondary">
            <div class="d-flex justify-content-end gap-4">
              <a href="#" class="btn bg-guru text-white">Discard</a>
              <a href="#" class="btn btn-primary text-white">Save Changes</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<style scoped>

  .modal-overlay {
    content: '';
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 98;
    background: #000000;
    opacity: 0.4;
    cursor: pointer;
  }
  .modal-container {
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 650px;
    max-width: 90%;
    height: fit-content;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    background: #FFF;
    z-index: 999;
    transform: none;
  }

  .slide-fade-enter-active {
    transition: all 0.2s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(40px);
    opacity: 0;
  }

  .fade-leave-to, .fade-enter-from {
    transition: opacity .3s ease-in;
    opacity: 0;
  }
  .fade-leave-enter, .fade-enter-to {
    transition: opacity .3s ease-out;
    opacity: 0.4;
  }
</style>