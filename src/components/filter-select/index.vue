<script setup>
import { ref } from "@vue/reactivity"

  const props = defineProps({
    filterValue : String,
    options: {type: Array, default: []},
    placeholder: {type: String, default: 'Pilih'},
    multiple: {type: Boolean, default: false},
    noData: {type: String, default: 'No Data'},
    class: {type: String, default: ''},
  })

  const emits = defineEmits(['changeFilter','update:filterValue'])

  const selectValue = ref('')

  const updateValue = () => {
    emits('update:filterValue', selectValue.value)
    emits('changeFilter')
  }
</script>

<template>
  <el-select v-model="selectValue"
    class="select-filter" :class="props.class"
    :no-data-text="props.noData" :multiple="props.multiple"
    :placeholder="props.placeholder"
    @change="updateValue" clearable
    size="large"
  >
    <slot/>
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
    border-radius: 6.175px;
    border: none;
    height: 45px;
  }
  .select-filter .el-input__inner::placeholder {
    color: white;
  }
  .select-filter .el-input__suffix .icon {
    color: white;
  }
</style>

// Contoh pemakaian:
// <FilterSelect v-model:filterValue="status" class="w-100" placeholder="Pilih Status" @changeFilter="changeStatus">
  <el-option
    v-for="item, index in options"
    :key="index"
    :label="item.label"
    :value="item.value"
  />
// </FilterSelect>

// Props dan Emit :
//
// v-model:filterValue="select" //menyimpan value yang di select // Required
//
// placeholder: {type: String, default: 'Pilih'},
//
// multiple: {type: Boolean, default: false}, //multiple option
//
// noData: {type: String, default: 'No Data'}, //text ketika tidak ada data
//
// class: {type: String, default: ''}, //tambahan class
//
// @filterChange="console.log('value')" // ketika value berubah
//
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
