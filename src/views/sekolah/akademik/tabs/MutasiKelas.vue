<script setup>
  import { ref } from "vue";
  import Datatable from "@/components/kt-datatable/KTDatatable.vue";

  const semester = ref('')
  const status = ref('')
  const checked = ref('')

  const options = [
    {
      value: 'Option1',
      label: 'Option1',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
    {
      value: 'Option4',
      label: 'Option4',
    },
    {
      value: 'Option5',
      label: 'Option5',
    },
  ]

  const tableHeader = ref([
    {
      name: "No",
      key: "no",
    },
    {
      name: "Guru",
      key: "guru",
    },
    {
      name: "Kelas",
      key: "kelas",
    },
    {
      name: "Tahun Ajar",
      key: "tahun_ajar",
    },
    {
      name: "Action",
      key: "action",
      sortable: false,
    },
  ])

  const tableData = ref([
    {
      no : "1",
      guru : "Faradillah S.Pd",
      kelas : "X IPA",
      tahun_ajar : "2021/2022",
    },
    {
      no : "1",
      guru : "Faradillah S.Pd",
      kelas : "Kelas Edumu 2",
      tahun_ajar : "2021/2022",
    },
    {
      no : "1",
      guru : "Faradillah S.Pd",
      kelas : "Kelas Edumu 2",
      tahun_ajar : "2021/2022",
    },
    {
      no : "1",
      guru : "Faradillah S.Pd",
      kelas : "Kelas Edumu 2",
      tahun_ajar : "2021/2022",
    },
    {
      no : "1",
      guru : "Faradillah S.Pd",
      kelas : "Kelas Edumu 2",
      tahun_ajar : "2021/2022",
    },
  ])
</script>

<template>
  <div class="page-content">
    <div class="d-flex flex-wrap justify-content-between align-items-center">
      <div class="d-flex gap-4">
        <div>
          <el-select v-model="semester" class="m-2" placeholder="Pilih Kelas Asal" size="large">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="status" class="m-2" placeholder="Pilih Kelas Tujuan" size="large">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="position-relative d-flex ">
        <a href="#" class="btn bg-fwf text-white d-flex gap-3 align-items-center w-auto">
          <span>
            Pindahkan
          </span>
        </a>
      </div>
    </div>
    <div class="mb-5 mb-xxl-8 px-12">
      <Datatable 
        id="datatable"
        :table-header="tableHeader" 
        :table-data="tableData"
      >
        <template class="text-center" v-slot:cell-no="{ row: data }">
          {{ data.no }}
        </template>
        <template v-slot:cell-guru="{ row: data }">
          {{ data.guru }}
        </template>
        <template v-slot:cell-kelas="{ row: data }">
          {{ data.kelas }}
        </template>
        <template v-slot:cell-tahun_ajar="{ row: data }">
          {{ data.tahun_ajar }}
        </template>
        <template v-slot:cell-action>
          <div>  
            <el-checkbox v-model="checked" label="" size="large" />
          </div>
        </template>
      </Datatable>
    </div>
  </div>
</template>