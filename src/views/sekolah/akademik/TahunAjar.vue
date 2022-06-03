<script setup>
  import { ref, onMounted, reactive } from "vue";
  import axios from 'axios';
  import Datatable from "@/components/kt-datatable/KTDatatable.vue";
  import Modal from "@/components/modals/CustomModal.vue";

  onMounted(() => {
    getDataKelas
  })

  function getDataKelas() {
    axios.post('https://apistaging.edumu.id/devel/apischool/thn_ajar', {page: 1, id: 1})
    .then((res) => {
      console.log(res.data)
    })
    .catch(err => console.log(err.request))
  }

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
      key: "status",
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
      status : 1,
      semester : "ganjil",
      start : "02/02/2020",
      end : "02/02/2020",
    },
    {
      no : "1",
      tahun_ajar : "2021/2022",
      status : 0,
      semester : "genap",
      start : "02/12/2022",
      end : "02/12/2022",
    },
    {
      no : "1",
      tahun_ajar : "2021/2022",
      status : 1,
      semester : "ganjil",
      start : "02/02/2020",
      end : "02/02/2020",
    },
    {
      no : "1",
      tahun_ajar : "2021/2022",
      status : 1,
      semester : "ganjil",
      start : "02/02/2020",
      end : "02/02/2020",
    },
    {
      no : "1",
      tahun_ajar : "2021/2022",
      status : 1,
      semester : "ganjil",
      start : "02/02/2020",
      end : "02/02/2020",
    },
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
              <a @click="modalData = 'Tambah Data'" class="btn bg-fwf text-white d-flex gap-3 align-items-center w-auto">
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
        <Datatable 
          :table-header="tableHeader" 
          :table-data="tableData"
          @currentChange="getData"
          :total="100"
          :currentPage="3"
        >
          <template v-slot:cell-no="{ row: data }">
            {{ data.no }}
          </template>
          <template v-slot:cell-tahun_ajar="{ row: data }">
            {{ data.tahun_ajar }}
          </template>
          <template v-slot:cell-semester="{ row: data }">
            {{ data.semester }}
          </template>
          <template v-slot:cell-status="{ row: data }">
            {{ data.status ? 'Aktif' : 'Non Aktif' }}
          </template>
          <template v-slot:cell-action="scope">
            <div>
              <a
                @click.prevent="editData(scope.row)"
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
  .bg-guru {
    background: #04C8C8;
  }
</style>