<script setup>
  import { ref, reactive, onMounted } from "vue";
  import { request } from '@/util'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import FilterSelect from '@/components/filter-select'
  import ServerSideTable from '@/components/ServerSideTable.vue'
  
  onMounted(() => {
    setCurrentPageBreadcrumbs("Data Kelas", ['Sekolah', "Akademik"]);
  })

  function getTableData (payload) {
    request.post('kelas', null, {
      params: {
        page: payload.page ?? 1,
        sortby: payload.sort?.type ?? 'ASC'
      }
    }).then(res => {
      tableData.rows = res.data.data.data
      tableData.totalRows = res.data.data.total
    })
  }

  const tingkatKelas = ref('')
  const status = ref('')

  const modalData = ref(false)

  const options = [
    {
      value: 'ID 1',
      label: 'Option1',
    },
    {
      value: 'ID 2',
      label: 'Option2',
    },
    {
      value: 'ID 3',
      label: 'Option3',
    },
    {
      value: 'ID 4',
      label: 'Option4',
    },
    {
      value: 'ID 5',
      label: 'Option5',
    },
  ]

  const waliKelas = ref([
    {
      name: 'Guru 1'
    },
    {
      name: 'Guru 1'
    },
    {
      name: 'Guru 1'
    },
    {
      name: 'Guru 1'
    },
    {
      name: 'Guru 1'
    },
  ])

  const tahunAjar = ref([
    {
      name: '2020/2021'
    },
    {
      name: '2021/2022'
    },
    {
      name: '2022/2023'
    },
  ])

  const dataTingkatKelas = ref([
    {
      name: '10'
    },
    {
      name: '11'
    },
    {
      name: '12'
    },
  ])

  const jamMasuk = ref([
    {
      name: 'pagi',
      start: '08:00 AM',
      end: '10:00 AM',
    },
    {
      name: 'siang',
      start: '11:00 AM',
      end: '03:00 PM',
    },
    {
      name: 'sore',
      start: '03:00 PM',
      end: '07:00 PM',
    },
  ])

  const tableData = reactive({
    columns: [
      { label: 'Kelas', field: 'kelas_nama' },
      { label: 'Jam Masuk', field: 'shift' },
      { label: 'Tingkat Kelas', field: 'kelas_level' },
      { label: 'Status', field: 'kelas_status' },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })

  const initialFormData = {namaKelas: '', wali: '', tingkatKelas: '', jamMasuk: '', status: ''}

  const formData = reactive({
    namaKelas: '', 
    wali: '', 
    tingkatKelas: '', 
    jamMasuk: '', 
    status: ''
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

  function changeStatus() {
    console.log(status.value)
  }
</script>

<template>
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div class="d-flex gap-4">
            <div>
              <FilterSelect v-model:filterValue="tingkatKelas" placeholder="Pilih Kelas">
                <el-option
                  v-for="item, index in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </FilterSelect>
            </div>
            <div>
              <FilterSelect v-model:filterValue="status" placeholder="Pilih Status" @changeFilter="changeStatus">
                <el-option
                  v-for="item, index in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </FilterSelect>
            </div>
          </div>

          <div class="position-relative d-flex ">
            <a @click.prevent="modalData = 'Tambah Data'" href="#" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
              <i class="fas fa-plus fs-5"></i>
              <span>
                Tambah Kelas
              </span>
            </a>
          </div>
        </div>
        <div class="mb-5 mb-xxl-8">
          <ServerSideTable
            :totalRows="tableData.totalRows || 0"
            :columns="tableData.columns"
            :rows="tableData.rows"
            @loadItems="getTableData"
          >
            <template #table-row="{column, row}">
              <div v-if="column.field == 'shift'">
                {{row.shift.name}} <span class="badge badge-primary ms-4">{{row.shift.start}} - {{row.shift.end}}</span>
              </div>
              <div v-if="column.field == 'kelas_status'">
                <span :class="'badge badge-light-' + (row.kelas_status ? 'success' : 'danger')">{{row.kelas_status ? 'Aktif' : 'Non Aktif'}}</span>
              </div>
              <div v-if="column.field == 'action'">
                <button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
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
                <div class="col-4 d-flex align-items-center fw-bold fs-4">Nama Kelas</div>
                <div class="col-8">
                  <input type="text" v-model="formData.namaKelas" class="form-control" placeholder="X IPA , IX IPS , DST"/>
                </div>
                <div class="col-4 d-flex align-items-center fw-bold fs-4">Wali Kelas</div>
                <div class="col-8">
                  <select  v-model="formData.guru" class="form-select form-select-solid" aria-label="Select example">
                    <option>Pilih Guru</option>
                    <template v-for="(guru, guruIndex) in waliKelas" :key="guruIndex">
                      <option value="1">{{guru.name}}</option>
                    </template>
                  </select>
                </div>
                <div class="col-4 d-flex align-items-center fw-bold fs-4">Tingkat Kelas</div>
                <div class="col-8">
                  <select  v-model="formData.tahun_ajar" class="form-select form-select-solid" aria-label="Select example">
                    <option>Pilih Tingkat Kelas</option>
                    <template v-for="(kelas, kelasIndex) in dataTingkatKelas" :key="kelasIndex">
                      <option value="1">{{kelas.name}}</option>
                    </template>
                  </select>
                </div>
                <div class="col-4 d-flex align-items-center fw-bold fs-4">Jam Masuk</div>
                <div class="col-8">
                  <select  v-model="formData.jamMasuk" class="form-select form-select-solid" aria-label="Select example">
                    <option>Pilih Jam Masuk</option>
                    <template v-for="(jam, jamIndex) in jamMasuk" :key="jamIndex">
                      <option value="1">{{jam.name}} ({{jam.start}}-{{jam.end}})</option>
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