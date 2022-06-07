<script setup>
import { ref } from "@vue/reactivity"

  const props = defineProps({
    filterValue : String,
    options: {type: Array, default: []},
    placeholder: {type: String, default: 'Pilih'},
    multiple: {type: Boolean, default: false},
    multiple: {type: String, default: false}
  })

  const emits = defineEmits(['changeFilter','update:filterValue'])

  const selectValue = ref('')

  const updateValue = () => {
    emits('update:filterValue', selectValue.value)
    emits('changeFilter')
  }
</script>

<template>
  <el-select :multiple="props.multiple" @change="updateValue" clearable v-model="selectValue" class="m-2 select-filter" :placeholder="props.placeholder" size="large">
    <el-option
      v-for="item, index in props.options"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<style>
  .select-filter .el-input__inner {
    background: #159BEA;
    color: white;
    font-weight: 500;
  }
  .select-filter .el-input__inner::placeholder {
    color: white;
  }
  .select-filter .el-input__suffix .icon {
    color: white;
  }
</style>


// Contoh Props dan Emit :
//
// v-model:filterValue="select" //menyimpan value yang di select // Required
//
// placeholder: {type: String, default: 'Pilih'}, 
//
// multiple: {type: Boolean, default: false}, //multiple option
//
// option="options"  //Array pilihan filter (value & label) contoh dibawah //optional
// const options = [
//   {
//     value: 'ID 1',
//     label: 'Option1',
//   },
//   {
//     value: 'ID 2',
//     label: 'Option2',
//   },
//   {
//     value: 'ID 3',
//     label: 'Option3',
//   },
//   {
//     value: 'ID 4',
//     label: 'Option4',
//   },
//   {
//     value: 'ID 5',
//     label: 'Option5',
//   },
// ]
