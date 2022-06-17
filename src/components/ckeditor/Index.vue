<script setup>
import { onMounted, reactive, ref } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { computed } from '@vue/reactivity';

const props = defineProps({
  editorValue: String
})

const emits = defineEmits(['update:editorValue'])


const editor = ClassicEditor
const editorData = ref()
// const editorData = computed(()=>{
//   if (props.editorValue) {
//     return editorData.value = props.editorValue  
//   }
// })
const editorConfig = {
    // The configuration of the editor.
}
function updateValue() {
  emits('update:editorValue', editorData.value)
}
</script>

<template>
<div>
  <ckeditor class="w-100" :editor="editor" v-model="editorData" :config="editorConfig" v-on:input="updateValue()"></ckeditor>
</div>
</template>