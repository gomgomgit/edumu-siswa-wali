<template>
  <div>
    <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage.value})` }" @click="selectImage">
    </div>

    <input id="input-file" type="file" @input="pickFile">
  </div>
</template>
 
<script setup>
import { ref } from 'vue';

const previewImage = ref(null)
const file = ref(null)

const fileInput = document.getElementById('input-file')

function selectImage() {
  fileInput.click()
}

function pickFile() {
  let input = fileInput
  console.log(input)
  // let file = input.files
  // if (file && file[0]) {
  //   let reader = new FileReader
  //   reader.onload = e => {
  //     previewImage = e.target.result
  //   }
  //   reader.readAsDataURL(file[0])
  //   this.$emit('input', file[0])
  // }
}
</script>
 
<style>
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>