<script setup>
import { reactive, ref } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const props = defineProps({
  editorValue: String
})

const emits = defineEmits(['update:editorValue'])

const editor = ClassicEditor
const editorData = ref('')
const editorConfig = {
    // The configuration of the editor.
}

function updateValue() {
  emits('update:editorValue', editorData.value)
}
</script>

<template>
  <ckeditor class="w-100" :editor="editor" v-model="editorData" :config="editorConfig" v-on:input="updateValue()"></ckeditor>
</template>