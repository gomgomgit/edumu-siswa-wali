<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { request } from '@/util'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import FilterSelect from '@/components/filter-select'

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

  const semesterFilter = ref('')
  const statusFilter = ref('')

  const modalData = ref(false)

  const semesterOption = [
    {
      value: 'ganjil',
      label: 'Ganjil',
    },
    {
      value: 'genap',
      label: 'Genap',
    },
  ]
  const statusOption = [
    {
      value: 1,
      label: 'Aktif',
    },
    {
      value: 0,
      label: 'Non Aktif',
    },
  ]

  const initialFormData = {tahun_ajar: '', status: '', semester: '', start: '', end: ''}

  const formData = reactive({
    tahun_ajar: '',
    status: '',
    semester: '',
    start: '',
    end: '',
  })

  function changeFilter(changed){
    console.log(changed)
  }

  function addData() {
    alert('tambah data')
  }

  function closeModalData() {
    modalData.value = '',
    Object.assign(formData, initialFormData)
  }

  function editData(data) {
    // console.log(data)
    formData.tahun_ajar = data.thn_ajar_value
    formData.status = data.thn_ajar_status
    formData.semester = data.thn_ajar_semester
    formData.start = data.thn_ajar_start
    formData.end = data.thn_ajar_end
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
                <FilterSelect v-model:filterValue="semesterFilter" :options="semesterOption" @changeFilter="changeFilter('semester')" placeholder="Pilih Semester" />
              </div>
              <div>
                <FilterSelect v-model:filterValue="statusFilter" :options="statusOption" @changeFilter="changeFilter('status')" placeholder="Pilih Status" />
              </div>
            </div>

            <div class="position-relative d-flex ">
              <a @click="modalData = 'Tambah Data'" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
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