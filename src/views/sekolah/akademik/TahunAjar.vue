<script setup>
  import { ref } from "vue";
  import Datatable from "@/components/kt-datatable/KTDatatable.vue";

  const semester = ref('')
  const status = ref('')

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
      name: "Tahun Ajar",
      key: "tahun_ajar",
    },
    {
      name: "Semester",
      key: "semester",
    },
    {
      name: "Status Aktif",
      key: "status_aktif",
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
      tahun_ajar : "2021/2022",
      semester : "Ganjil",
      status_aktif : "Aldry Azzari",
    },
    {
      no : "1",
      tahun_ajar : "2021/2022",
      semester : "Ganjil",
      status_aktif : "Aldry Azzari",
    },
    {
      no : "1",
      tahun_ajar : "2021/2022",
      semester : "Ganjil",
      status_aktif : "Aldry Azzari",
    },
    {
      no : "1",
      tahun_ajar : "2021/2022",
      semester : "Ganjil",
      status_aktif : "Aldry Azzari",
    },
    {
      no : "1",
      tahun_ajar : "2021/2022",
      semester : "Ganjil",
      status_aktif : "Aldry Azzari",
    },
  ])
</script>

<template>
  <!--begin::Head-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <!-- Page Header -->
      <div class="page-header border-bottom border-black-50 mb-3">
        <div class="page-title px-3 py-7 mb-6 d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center">
          <h3 class="mb-0 fs-2x">Akademik - Tahun Ajar</h3>
        </div>
        <div class="page-breadcrumb px-3 py-3 mb-6 d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center">
          <h3 class="mb-0 fs-4"><span class="text-black-50"> Sekolah / Akademik / </span>Tahun Ajar</h3>
        </div>
      </div>
      <!-- Page Content -->
      <div class="page-content">
        <div class="d-flex flex-wrap justify-content-between align-items-center">
          <div class="d-flex gap-4">
            <div>
              <el-select v-model="semester" class="m-2" placeholder="Semester" size="large">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div>
              <el-select v-model="status" class="m-2" placeholder="Status" size="large">
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
              <i class="text-white fas fa-plus fs-5"></i>
              <span>
                Tambah Tahun Ajar
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-5 mb-xxl-8 px-12">
      <Datatable :table-header="tableHeader" :table-data="tableData">
        <template v-slot:cell-no="{ row: data }">
          {{ data.no }}
        </template>
        <template v-slot:cell-tahun_ajar="{ row: data }">
          {{ data.tahun_ajar }}
        </template>
        <template v-slot:cell-semester="{ row: data }">
          {{ data.semester }}
        </template>
        <template v-slot:cell-status_aktif="{ row: data }">
          {{ data.status_aktif }}
        </template>
        <template v-slot:cell-action>
          <div>  
            <a
              href="#"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <span class="svg-icon svg-icon-3">
                <inline-svg
                  src="media/icons/duotune/general/gen019.svg"
                />
              </span>
            </a>

            <a
              href="#"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <span class="svg-icon svg-icon-3">
                <inline-svg src="media/icons/duotune/art/art005.svg" />
              </span>
            </a>

            <a
              href="#"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            >
              <span class="svg-icon svg-icon-3">
                <inline-svg
                  src="media/icons/duotune/general/gen027.svg"
                />
              </span>
            </a>
          </div>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<style>
  .el-input__inner {
    background: rgba(32, 139, 255, 0.5);
  }
  .el-input__inner::placeholder {
    color: #0084AD;
  }
  .el-input__suffix .icon {
    color: #0084AD;
  }
  .bg-fwf {
    background: #0084AD;
  }
</style>