<script setup>
  import { ref, reactive } from "vue";
  import Datatable from "@/components/kt-datatable/KTDatatable.vue";
  import Modal from "@/components/modals/CustomModal.vue";

  const tingkatKelas = ref('')
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

  const tableHeader = ref([
    {
      name: "No",
      key: "no",
    },
    {
      name: "Kelas",
      key: "kelas",
    },
    {
      name: "Jam Masuk",
      key: "jam_masuk",
    },
    {
      name: "Tingkat Kelas",
      key: "tingkat_kelas",
    },
    {
      name: "Status",
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
      kelas : "X IPA",
      jam_masuk : {
        name: "pagi",
        start: "7:00 AM", 
        end: "12.00 AM"
      },
      tingkat_kelas : "12",
      status : 1,
    },
    {
      no : "1",
      kelas : "Kelas Edumu 2",
      jam_masuk : {
        name: "pagi",
        start: "7:00 AM", 
        end: "12.00 AM"
      },
      tingkat_kelas : "12",
      status : 1,
    },
    {
      no : "1",
      kelas : "Kelas Edumu 2",
      jam_masuk : {
        name: "pagi",
        start: "7:00 AM", 
        end: "12.00 AM"
      },
      tingkat_kelas : "12",
      status : 1,
    },
    {
      no : "1",
      kelas : "Kelas Edumu 2",
      jam_masuk : {
        name: "pagi",
        start: "7:00 AM", 
        end: "12.00 AM"
      },
      tingkat_kelas : "12",
      status : 1,
    },
    {
      no : "1",
      kelas : "Kelas Edumu 2",
      jam_masuk : {
        name: "pagi",
        start: "7:00 AM", 
        end: "12.00 AM"
      },
      tingkat_kelas : "12",
      status : 1,
    },
  ])

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
</script>

<template>
  <div class="page-content">
    <div class="d-flex flex-wrap justify-content-between align-items-center">
      <div class="d-flex gap-4">
        <div>
          <el-select v-model="tingkatKelas" class="m-2" placeholder="Tingkat Kelas" size="large">
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
        <a @click.prevent="modalData = 'Tambah Data'" href="#" class="btn bg-fwf text-white d-flex gap-3 align-items-center w-auto">
          <i class="text-white fas fa-plus fs-5"></i>
          <span>
            Tambah Kelas
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
        <template v-slot:cell-kelas="{ row: data }">
          {{ data.kelas }}
        </template>
        <template v-slot:cell-jam_masuk="{ row: data }">
          {{ data.jam_masuk.name }}
          <span class="badge badge-light-primary">{{data.jam_masuk.start}} - {{data.jam_masuk.end}}</span>
        </template>
        <template v-slot:cell-tingkat_kelas="{ row: data }">
          {{ data.tingkat_kelas }}
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
</template>