<script setup>
import { ref } from 'vue';

const props = defineProps({
  fileInputData: Array
})
const emits = defineEmits('update:fileInputData')

const imagePreviewUrl = ref('')
const image = ref('')

function onFileChange(payload) {
    const file = payload.target.files[0];
    if(file) {
      emits('update:fileInputData', payload.target.files[0])
      URL.revokeObjectURL(file)
      imagePreviewUrl.value = URL.createObjectURL(file)
    } else {
      emits('update:fileInputData', null)
      imagePreviewUrl.value = null
    }
}
function inputFileClick() {
  document.getElementById('file-input-real').click()
}
function inputFileDelete() {
  emits('update:fileInputData', null)
  imagePreviewUrl.value = null
}
</script>

<template>
  <div>
    <div :style="'background-image: url('+ imagePreviewUrl +')'" class="file-input-image-preview" alt="">
      <div v-show="!imagePreviewUrl" @click="inputFileClick" class="file-input-plus">
        <i class="bi bi-plus fs-5x"></i>
      </div>

      <div v-if="imagePreviewUrl" class="file-input-icon-wrapper">
        <div class="file-input-icon" @click="inputFileClick">
          <i class="text-white fs-1 bi bi-pencil-fill"></i>
        </div>
        <div class="file-input-icon" @click="inputFileDelete">
          <i class="text-white fs-1 bi bi-trash-fill"></i>
        </div>
      </div>
    </div>
    <input class="d-none" id="file-input-real" type="file" @change="onFileChange">
  </div>
</template>

<style>



.file-input-image-preview {
  width: 200px;
  height: 200px;
  background-size: cover;
  border: 2px solid #a1afbf;
  border-radius: 8px;
  overflow: hidden;
}
.file-input-plus {
  background-color: #D9D9D9;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .3s ease-out;
}
.file-input-plus:hover {
  background-size: cover;
  background-color: #f8f8f8;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.file-input-icon-wrapper {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(85, 85, 85, 0.456);
  opacity: 0;
  transition: all .3s ease-out;
}
.file-input-icon-wrapper:hover {
  width: 100%;
  height: 100%;
  opacity: 1;
}
.file-input-icon {
  cursor: pointer;
  border-radius: 15px;
  border: 2px solid #fff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>