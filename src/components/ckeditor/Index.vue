<script setup>
import { onMounted, reactive, ref } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

onMounted(()=> {
  setDefaultValue()
})

const props = defineProps({
  editorValue: String
})

const ss = props.editorValue
const emits = defineEmits(['update:editorValue'])


const editor = ClassicEditor
const editorData = ref('')
const editorConfig = {
    // The configuration of the editor.
}
function setDefaultValue() {
  editorData.value = 'dfsadfsdaf'
}
function updateValue() {
  emits('update:editorValue', editorData.value)
}
</script>

<template>
<div>
  <ckeditor class="w-100" :editor="editor" v-model="editorData" :config="editorConfig" v-on:input="updateValue()"></ckeditor>
  {{props.editorValue}}
</div>
</template>