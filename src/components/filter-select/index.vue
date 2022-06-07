<script setup>
import { ref } from "@vue/reactivity"

  const props = defineProps({
    filterValue : String,
    options: {type: Array, default: []},
    placeholder: {type: String, default: 'Pilih'},
    multiple: {type: Boolean, default: false}
  })

  const emits = defineEmits(['changeFilter','update:filterValue'])

  const updateValue = () => {
    emits('update:filterValue', selectValue.value)
    emits('changeFilter')
  }

  const selectValue = ref('')
</script>

<template>
  <el-select :multiple="props.multiple" @change="updateValue" clearable v-model="selectValue" class="m-2 select-filter" :placeholder="props.placeholder" size="large">
    <el-option
      v-for="item in props.options"
      :key="item.value"
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