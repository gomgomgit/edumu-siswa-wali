<script setup>
  import { computed, onMounted, reactive, ref } from "vue";
  import ServerSideTable from "@/components/ServerSideTable.vue";
  import FilterSelect from "@/components/filter-select";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import { request } from "@/util";
  
  onMounted(() => {
    setCurrentPageBreadcrumbs("Mutasi Kelas", ['Sekolah', "Akademik"]);

    getKelas()
  })

  function getKelas () {
    request.post('kelas', null, {
      params: {
        id: 1,
      }
    }).then(res=>{
      kelas.value = res.data.data
    })
  }
  
  function getDataSiswaKelas (payload) {
    request.post('siswa_data_kelas', null, {
      params: {
        page: payload.page ?? 1,
        sortby: payload.sort?.type ?? 'ASC',
        kelas_id: kelasAsal?.value ?? ''
      }
    }).then(res => {
      dataSiswaKelas.rows = res.data.data.data
      dataSiswaKelas.totalRows = res.data.data.total
      dataSiswaKelasTujuan.rows = res.data.data.data
      dataSiswaKelasTujuan.totalRows = res.data.data.total
    })
  }
  
  const dataSiswaKelas = reactive({
    columns: [
      { label: 'Select', field: 'select', sortable: false },
      { label: 'NISN', field: 'siswa_nisn' },
      { label: 'Siswa', field: 'user_nama' },
    ],
    rows: [],
    totalRows: 0,
  })
  
  const dataSiswaFilter = computed(() => {
      console.log(kelasAsal.value)
      return kelasAsal.value === '' 
        ? dataSiswaKelas.rows 
        : dataSiswaKelas.rows.filter(row => 
          row.kelas_id == kelasAsal.value
        )
    }
  )
  const dataSiswaTujuanFilter = computed(() => {
      return kelasTujuan.value === '' 
        ? []
        : dataSiswaKelasTujuan.rows.filter(row => 
          row.kelas_id == kelasTujuan.value
        )
    }
  )

  const dataSiswaKelasTujuan = reactive({
    columns: [
      { label: 'NISN', field: 'siswa_nisn' },
      { label: 'Siswa', field: 'user_nama' },
    ],
    rows: [],
    totalRows: 0,
  })

  const kelas = ref([])
  const kelasAsal = ref('')
  const kelasTujuan = ref('')

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

  function changeAsal() {
    console.log(kelasAsal.value)
    getDataSiswaKelas
  }

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
            <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
              <div class="d-flex gap-4">
                <div>
                  <FilterSelect v-model:filterValue="kelasAsal" @changeFilter="changeAsal"
                    placeholder="Pilih Kelas Asal">
                    <el-option v-for="item, index in kelas" :key="index" :label="item.kelas_nama"
                      :value="item.kelas_id" />
                  </FilterSelect>
                </div>
                <div>
                  <FilterSelect v-model:filterValue="kelasTujuan" @changeFilter="changeTujuan"
                    placeholder="Pilih Kelas Tujuan">
                    <el-option v-for="item, index in kelas" :key="index" :label="item.kelas_nama"
                      :value="item.kelas_id" />
                  </FilterSelect>
                </div>
              </div>

              <div class="position-relative d-flex ">
                <a href="#" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                  <span>
                    Pindahkan
                  </span>
                </a>
              </div>
            </div>
            <div class="mb-5 mb-xxl-8">
              <ServerSideTable 
                :totalRows="dataSiswaKelas.totalRows || 0" 
                :columns="dataSiswaKelas.columns"
                :rows="dataSiswaFilter" @loadItems="getDataSiswaKelas">
                <template #table-row="{column, row}">
                  <div v-if="column.field == 'select'">
                    <input type="checkbox" name="" id="">
                  </div>
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
            <div class="mb-5 mb-xxl-8">
              <ServerSideTable 
                :totalRows="dataSiswaKelasTujuan.totalRows || 0" 
                :columns="dataSiswaKelasTujuan.columns"
                :rows="dataSiswaTujuanFilter" @loadItems="getDataSiswaKelas">
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
  </div>
</template>