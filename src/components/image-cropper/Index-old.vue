<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const porps = defineProps({
  fileInputData: Array
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

  imageResult.value = canvas.toDataURL()
  const blob = await (await fetch(imageResult.value)).blob(); 
  const file = new File([blob], 'filecropped.jpg', {type:"image/jpeg", lastModified:new Date()});
  emits('update:fileInputData', file)
  imageUrl.value = null
}
function deleteImage() {
  emits('update:fileInputData', null)
  imageUrl.value = null
  imageResult.value = null
}
</script>

<template>
  <div>
    <div class="">
      <cropper
        ref="cropperCanvas"
        class="cropper"
        id="copper"
        v-if="imageUrl"
        :src="imageUrl"
        :stencil-props="{
        }"
      />
      <img v-if="!imageUrl" :src="imageResult" alt="">
  
      <input class="d-none" id="file-input-crop" type="file" accept="image/*" @change="onImageChange">
    </div>
    <div class="d-flex gap-2">
      <button class="text-white btn btn-bg-primary" @click="inputFileClick">{{imageUrl ? 'Ganti Gambar' : 'Pilih Gambar'}}</button>
      <button v-if="imageUrl" class="text-white btn btn-bg-success" @click="cropImage">Potong</button>
      <button @click="deleteImage" v-if="imageUrl || imageResult" class="text-white btn btn-bg-danger" >Hapus</button>
    </div>
  </div>
</template>