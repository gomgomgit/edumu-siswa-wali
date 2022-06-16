<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const porps = defineProps({
  fileInputData: File
})

const emits = defineEmits('update:fileInputData')

const image = ref('')
const cropperCanvas = ref()

const imageUrl = ref('')
const imageResult = ref('')

const imagePreview = computed(() => {
  if (imageResult.value) {
    return imageResult.value
  } else {
    return '/media/illustrations/media/frame-media.png'
  }
})

function onImageChange(payload) {
  const file = payload.target.files[0];
  if(file) {
    image.value = payload.target.files[0]
    imageUrl.value = URL.createObjectURL(file)
    imageResult.value = URL.createObjectURL(file)
  } else {
    image.value = null
    imageUrl.value = null
  }
}

function inputFileClick() {
  document.getElementById('file-input-crop').click()
}
async function cropImage () {
  const { coordinates, canvas } = cropperCanvas.value.getResult();

  imageResult.value = canvas.toDataURL('image/png')
  // const blob = await (await fetch(imageResult.value)).blob(); 
  // const file = new File([blob], 'filecropped.jpg', {type:"image/jpeg", lastModified:new Date()});
  // emits('update:fileInputData', file)
  // imageUrl.value = null
}
function deleteImage() {
  emits('update:fileInputData', null)
  imageUrl.value = null
  imageResult.value = null
}
</script>

<template>
  <div class="mw-100">
    <div class="d-flex align-items-start">
      <cropper
        ref="cropperCanvas"
        class="cropper"
        id="copper"
        :src="imageUrl"
        :stencil-props="{
          }"
      />
      <img :src="imageResult" alt="">
  
      <input class="d-none" id="file-input-crop" type="file" accept="image/*" @change="onImageChange">
    </div>
    <div class="d-flex gap-2">
      <button class="text-white btn btn-bg-primary" @click="inputFileClick">Ganti Gambar</button>
      <button class="text-white btn btn-bg-success" @click="cropImage()">Potong</button>
      <button @click="deleteImage" class="text-white btn btn-bg-danger" >Hapus</button>
    </div>
  </div>
</template>