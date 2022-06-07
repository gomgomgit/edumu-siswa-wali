<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { request } from '@/util'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import ServerSideTable from '@/components/ServerSideTable.vue'

  onMounted(() => {
    setCurrentPageBreadcrumbs("Tahun Ajar", ['Sekolah', "Akademik"]);
  })

  function getTahunAjar (payload) {
      request.post('thn_ajar', null, {
        params: {
          page: payload.page ?? 1,
          sortby: payload.sort?.type ?? 'ASC'
        }
      }).then(res => {
        tahunAjar.rows = res.data.data.data
        tahunAjar.totalRows = res.data.data.total
      })
    }

  const loadingTahunAjar = ref(false)
  
  const tahunAjar = reactive({
    columns: [
      { label: 'Tahun Ajar', field: 'thn_ajar_value' },
      { label: 'Semester', field: 'thn_ajar_semester' },
      { label: 'Status', field: 'thn_ajar_status' },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })

  const semester = ref('')
  const status = ref('')

  const modalData = ref(false)

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
      name: "Tahun Ajar",
      key: "thn_ajar_value",
    },
    {
      name: "Semester",
      key: "thn_ajar_semester",
    },
    {
      name: "Status Aktif",
      key: "thn_ajar_status",
    },
    {
      name: "Action",
      key: "action",
      sortable: false,
    },
  ])

  const tableData = ref([
  ])

  const initialFormData = {tahun_ajar: '', status: '', semester: '', start: '', end: ''}

  const formData = reactive({
    tahun_ajar: '',
    status: '',
    semester: '',
    start: '',
    end: '',
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
    request.post('thn_ajar', null, {
      params: { page: 2 }
    })
    .then((res) => {
      tahunAjars.value = res.data.data
      tableData.value = res.data.data.data
      loadingTahunAjar.value = false
      console.log('success', res.data)
    })
  }

  function editData(data) {
    formData.tahun_ajar = data.tahun_ajar
    formData.status = data.status
    formData.semester = data.semester
    formData.start = data.start
    formData.end = data.end
    modalData.value = 'Edit Data'
  }
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body pt-5 pb-5">
        
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
              <a @click="modalData = 'Tambah Data'" class="btn btn-light-primary d-flex gap-3 align-items-center w-auto">
                <i class="fas fa-plus fs-5"></i>
                <span>
                  Tambah Tahun Ajar
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-5 mb-xxl-8 px-12">
        <ServerSideTable
          :totalRows="tahunAjar.totalRows || 0"
          :columns="tahunAjar.columns"
          :rows="tahunAjar.rows"
          @loadItems="getTahunAjar"
        >
          <template #table-row="{column, row}">
              <div v-if="column.field == 'thn_ajar_semester'">
                {{row.thn_ajar_semester[0].toUpperCase() + row.thn_ajar_semester.substring(1)}}
              </div>
              <div v-if="column.field == 'thn_ajar_status'">
                <span :class="'badge badge-light-' + (row.thn_ajar_status ? 'success' : 'danger')">{{row.thn_ajar_status ? 'Aktif' : 'Non Aktif'}}</span>
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
    </div>

    <!-- Modal -->

    <Modal
      :title="modalData"
      :breadcrumb="Array('Sekolah', 'Akademik', 'Tahun Ajar', modalData)"
      :show="modalData"
      @closeModal="closeModalData"
      @confirm="addData"
      @dismiss="closeModalData"
    >
        <div class="">
          <div class="row gy-6">
            <div class="col-4 d-flex align-items-center fw-bold fs-4">Tahun Ajar</div>
            <div class="col-8">
              <input type="text" v-model="formData.tahun_ajar" class="form-control" placeholder="Masukkan Tahun Ajar Cth : 2021/2022"/>
            </div>

            <div class="col-4 d-flex align-items-center fw-bold fs-4">Status</div>
            <div class="col-8">
              <select  v-model="formData.status" class="form-select form-select-solid" aria-label="Select example">
                <option>Pilih Status</option>
                <option value="1">Aktif</option>
                <option value="0">Non Aktif</option>
              </select>
            </div>

            <div class="col-4 d-flex align-items-center fw-bold fs-4">Semester</div>
            <div class="col-8">
              <select v-model="formData.semester" class="form-select form-select-solid" aria-label="Select example">
                <option>Pilih Semester</option>
                <option value="ganjil">Ganjil</option>
                <option value="genap">Genap</option>
              </select>
            </div>

            <div class="col-4 d-flex align-items-center fw-bold fs-4">Mulai</div>
            <div class="col-8">
              <el-date-picker class="w-100" v-model="formData.start" type="date" placeholder="Pick a day" />
            </div>

            <div class="col-4 d-flex align-items-center fw-bold fs-4">Selesai</div>
            <div class="col-8">
              <el-date-picker  class="w-100" v-model="formData.end" type="date" placeholder="Pick a day" />
            </div>
          </div>
        </div>
    </Modal>

  </div>
</template>

<style scoped>
  /* .el-input__inner {
    background: rgba(32, 139, 255, 0.5);
  }
  .el-input__inner::placeholder {
    color: #0084AD;
  }
  .el-input__suffix .icon {
    color: #0084AD;
  } */
</style>