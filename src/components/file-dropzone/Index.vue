<script setup>
import { ref } from "vue";

const props = defineProps({
  fileInputData: Array
})
const emits = defineEmits('update:fileInputData')

const active = ref(false);
const dropzoneFile = ref("");

function toggleActive () {
  active.value = !active.value;
};
function drop(e) {
  dropzoneFile.value = e.dataTransfer.files;
  emits('update:fileInputData', e.dataTransfer.files)
};
function selectedFile() {
  dropzoneFile.value = null
  dropzoneFile.value = document.querySelector(".dropzoneFile").files;
  emits('update:fileInputData', document.querySelector(".dropzoneFile").files)
};
</script>

<template>
<div @drop.prevent="drop">
  <div>
    <div
      @dragenter.prevent="toggleActive"
      @dragleave.prevent="toggleActive"
      @dragover.prevent
      @drop.prevent="toggleActive"
      :class="{ 'active-dropzone': active }"
      class="dropzone"
    >
      <i class="fs-3x bi bi-download"></i>
      <span class="fs-4">Drag & Drop file disini</span>
      <span>atau</span>
      <label class="btn btn-light-primary" for="dropzoneFile">Pilih File</label>
      <input @change="selectedFile" type="file" multiple id="dropzoneFile" class="dropzoneFile" />
    </div>
  </div>
  <div class="d-flex flex-column gap-2 mt-3">
    <template v-for="file in dropzoneFile">
      <p class="m-0 fs-4">File: {{ file.name }} - {{file.size}} bytes</p>
    </template>
  </div>
</div>
</template>

<style scoped lang="scss">
.dropzone {
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 12px;
  border: 3px dashed #cecece;
  background-color: #fff;
  transition: 0.3s ease all;
  input {
    display: none;
  }
}
.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: #159BEA;
  label {
    background-color: #fff;
    color: #41b883;
  }
}
</style>