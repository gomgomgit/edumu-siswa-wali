<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { computed } from '@vue/reactivity';

const props = defineProps({
  editorValue: String
})

const emits = defineEmits(['update:editorValue'])

const editor = ClassicEditor

const editorData = computed({
  get: () => props.editorValue ?? '',
  set: (val) => emits('update:editorValue', val)
})

const editorConfig = {
    // The configuration of the editor.
}
</script>

<template>
  <ckeditor class="w-100" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
</template>