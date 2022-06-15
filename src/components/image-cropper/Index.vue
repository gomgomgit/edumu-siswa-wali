<script setup>
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const image = ref('')
const cropperCanvas = ref()

const imageUrl = ref('')


function onImageChange(payload) {
  const file = payload.target.files[0];
  if(file) {
    image.value = payload.target.files[0]
    URL.revokeObjectURL(file)
    imageUrl.value = URL.createObjectURL(file)
  } else {
    image.value = null
    imageUrl.value = null
  }
}

function inputFileClick() {
  document.getElementById('file-input-crop').click()
}
function cropImage() {
  const { coordinates, canvas } = cropperCanvas.value.getResult();
  console.log(cropperCanvas.value.getResult())
  console.log(coordinates)

  if (canvas) {
    var blobBin = atob(dataURL.split(',')[1]);
    var array = [];
    for(var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    } 

    var file=new Blob([new Uint8Array(array)], {type: 'image/png'});

    console.log(file)
  }

  // const newTab = window.open();
  // // for testing open the result in a new tab
  // newTab.document.body.innerHTML = `<img src="${result.canvas.toDataURL(
  //   "image/jpeg"
  // )}"></img>`;
}
</script>

<template>
  <div>
    <cropper
      ref="cropperCanvas"
      class="cropper"
      id="copper"
      :src="imageUrl"
      :stencil-props="{
        aspectRatio: 10/12
      }"
    />
    <input class="d-none" id="file-input-crop" type="file" accept="image/*" @change="onImageChange">
    <div class="d-flex gap-2">
      <button class="text-white btn btn-bg-primary" @click="inputFileClick">Pilih Gambar</button>
      <button class="text-white btn btn-bg-success" @click="cropImage">Potong</button>
      <button class="text-white btn btn-bg-danger" >Hapus</button>
    </div>
  </div>
  <img :src="imageUrl" alt="">
</template>