<script setup>
  import { ref, reactive, onMounted } from "vue";
  import Datatable from "@/components/kt-datatable/KTDatatable.vue";
  import Modal from "@/components/modals/CustomModal.vue";
  import ServerSideTable from "@/components/ServerSideTable.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import FilterSelect from '@/components/filter-select'
  import { request } from "@/util";
  
  onMounted(() => {
    setCurrentPageBreadcrumbs("Wali Kelas", ['Sekolah', "Akademik"]);
  })

  function getWaliKelas (payload) {
    request.post('listwalikelas', null, {
      params: {
        page: payload.page ?? 1,
        sortby: payload.sort?.type ?? 'ASC'
      }
    }).then(res => {
      waliKelas.rows = res.data.data.data
      waliKelas.totalRows = res.data.data.total
    })
  }

  const waliKelas = reactive({
    columns: [
      {label: 'Guru', field: 'user_nama'},
      {label: 'Kelas', field: 'kelas_nama'},
      {label: 'Tahun Ajar', field: 'thn_ajar'},
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })

  const semester = ref('')
  const status = ref('')

  const modalData = ref(false)

  const semesterOption = ref([
    {
      label: 'Ganjil',
      value: 'ganjil'
    },
    {
      label: 'Genap',
      value: 'genap'
    },
  ])
  const statusOption = ref([
    {
      label: 'Aktif',
      value: 1
    },
    {
      label: 'Non Aktif',
      value: 0
    },
  ])

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

  const initialFormData = {guru: '', tahun_ajar: '', kelas: ''}

  const formData = reactive({
    guru: '',
    tahun_ajar: '',
    kelas: '',
  })

  function addData() {
    alert('tambah data')
  }

  function closeModalData() {
    modalData.value = '',
    Object.assign(formData, initialFormData)
  }

  function getData(event) {
    console.log(event)
    console.log('getData')
  }

  function editData(data) {
    formData.guru = data.guru
    formData.tahun_ajar = data.tahun_ajar
    formData.kelas = data.kelas
    modalData.value = 'Edit Data'
  }
</script>

<template>
<div class="card mb-5 mb-xxl-8">
  <div class="card-body pt-5 pb-5">
    <div class="page-content">
      <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div class="d-flex gap-4">
          <div>
            <FilterSelect v-model:filterValue="semester" :options="semesterOption" placeholder="Pilih Semester"></FilterSelect>
          </div>
          <div>
            <FilterSelect v-model:filterValue="status" :options="statusOption" placeholder="Pilih Status"></FilterSelect>
          </div>
        </div>

        <div class="position-relative d-flex ">
          <a @click.prevent="modalData = 'Tambah Data'" href="#" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
            <i class="bi bi-plus fs-1"></i>
            <span>
              Wali Kelas
            </span>
          </a>
        </div>
      </div>
      <div class="mb-5 mb-xxl-8">
        <ServerSideTable
          :totalRows="waliKelas.totalRows || 0"
          :columns="waliKelas.columns"
          :rows="waliKelas.rows"
          @loadItems="getWaliKelas"
        >
          <template #table-row="{column, row}">
              <div v-if="column.field == 'action'">
                <button @click="editData(row)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/art/art005.svg" />
                  </span>
                </button>
                <button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/general/gen027.svg"/>
                  </span>
                </button>
              </div>
            </template>
        </ServerSideTable>
      </div>

      
      <Modal 
        :title="modalData" 
        :breadcrumb="Array('Sekolah', 'Akademik', 'Data Kelas', modalData)" 
        :show="modalData" 
        @closeModal="closeModalData"
        @confirm="addData"
        @dismiss="closeModalData"
      >
          <div class="">
            <div class="row gy-6">
              <div class="col-4 d-flex align-items-center fw-bold fs-4">Guru</div>
              <div class="col-8">
                <select  v-model="formData.guru" class="form-select form-select-solid" aria-label="Select example">
                  <option>Pilih Guru</option>
                  <template v-for="(guru, guruIndex) in waliKelas" :key="guruIndex">
                    <option value="1">{{guru.name}}</option>
                  </template>
                </select>
              </div>
              <div class="col-4 d-flex align-items-center fw-bold fs-4">Tahun Ajar</div>
              <div class="col-8">
                <select  v-model="formData.tahun_ajar" class="form-select form-select-solid" aria-label="Select example">
                  <option>Pilih Tahun Ajar</option>
                  <template v-for="(tahun, tahunIndex) in tahunAjar" :key="tahunIndex">
                    <option value="1">{{tahun.name}}</option>
                  </template>
                </select>
              </div>
              <div class="col-4 d-flex align-items-center fw-bold fs-4">Kelas</div>
              <div class="col-8">
                <select  v-model="formData.kelas" class="form-select form-select-solid" aria-label="Select example">
                  <option>Pilih Kelas</option>
                  <template v-for="(kelas, kelasIndex) in kelas" :key="kelasIndex">
                    <option value="1">{{kelas.name}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
      </Modal>
    </div>
  </div>
</div>
</template>