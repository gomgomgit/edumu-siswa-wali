<script setup>
import { ref } from "vue";

const props = defineProps({
  fileInputData: Array,
  multiple: {Boolean, default: false},
  showFile: {Boolean, default: true}
})
const emits = defineEmits('update:fileInputData')

const active = ref(false);
const dropzoneFile = ref("");

function toggleActive () {
  active.value = !active.value;
};
function drop(e) {
  if (props.multiple) {
    dropzoneFile.value = e.dataTransfer.files;
    emits('update:fileInputData', e.dataTransfer.files)
  } else {
    dropzoneFile.value = e.dataTransfer.files[0];
    emits('update:fileInputData', e.dataTransfer.files[0])
  }
};
function selectedFile() {
  if (props.multiple) {
    dropzoneFile.value = null
    dropzoneFile.value = document.querySelector(".dropzoneFile").files;
    emits('update:fileInputData', document.querySelector(".dropzoneFile").files)
  } else {
    dropzoneFile.value = null
    dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
    emits('update:fileInputData', document.querySelector(".dropzoneFile").files[0])
  }
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
      <input @change="selectedFile" type="file" :multiple="props.multiple" id="dropzoneFile" class="dropzoneFile" />
    </div>
  </div>
  <div v-if="props.showFile" class="d-flex flex-column gap-2 mt-3">
    <template v-if="multiple" v-for="file in dropzoneFile">
      <p class="m-0 fs-4">File: {{ file.name }} - {{file.size}} bytes</p>
    </template>
    <template v-if="!multiple">
      <p class="m-0 fs-4">File: {{ dropzoneFile.name }} - {{dropzoneFile.size}} bytes</p>
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