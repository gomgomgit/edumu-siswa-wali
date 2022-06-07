<script setup>
  import { onMounted, reactive, ref } from "vue";
  import Datatable from "@/components/kt-datatable/KTDatatable.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { request } from "@/util";
  
  onMounted(() => {
    setCurrentPageBreadcrumbs("Mutasi Kelas", ['Sekolah', "Akademik"]);
  })
  
  function getSiswaDataKelas (payload) {
    request.post('kelas', null, {
      params: {
        page: payload.page ?? 1,
        sortby: payload.sort?.type ?? 'ASC'
      }
    }).then(res => {
      siswaDataKelas.rows = res.data.data.data
      siswaDataKelas.totalRows = res.data.data.total
    })
  }
  
  const siswaDataKelas = reactive({
    columns: [
      { label: 'NISN', field: 'siswa_nisn' },
      { label: 'Siswa', field: 'user_nama' },
    ],
    rows: [],
    totalRows: 0,
  })

  const filterkelas = ref('')

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

</script>

<template>
  <div class="row g-8">
    <div class="col-7">
      <div class="card mb-5 mb-xxl-8">
        <div class="card-body pt-5 pb-5">
          <div>
            <h2 class="fs-1">Data Siswa</h2>
            <p class="text-black-50 fw-bold">Kelas Asal</p>
          </div>
          <div class="separator border-black-50 border-3 my-4"></div>
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
                <a href="#" class="btn btn-light-primary d-flex gap-3 align-items-center w-auto">
                  <span>
                    Pindahkan
                  </span>
                </a>
              </div>
            </div>
            <div class="mb-5 mb-xxl-8 px-12">
              <ServerSideTable
                :totalRows="siswaDataKelas.totalRows || 0"
                :columns="siswaDataKelas.columns"
                :rows="siswaDataKelas.rows"
                @loadItems="getSiswaDataKelas"
              >
                <template #table-row="{column, row}">
                  <div v-if="column.field == 'user_nama'">
                    {{row.user_nama}}
                  </div>
                </template>
              </ServerSideTable>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-5">
      <div class="card mb-5 mb-xxl-8">
        <div class="card-body pt-5 pb-5">
          
          <div>
            <h2 class="fs-1">Data Siswa</h2>
            <p class="text-black-50 fw-bold">Kelas Tujuan</p>
          </div>
          <div class="separator border-black-50 border-3 my-4"></div>
          <div class="page-content">
            <div class="mb-5 mb-xxl-8 px-12">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>