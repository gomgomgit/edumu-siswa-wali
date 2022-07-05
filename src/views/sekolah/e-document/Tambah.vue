<script setup>
import { onMounted, reactive, ref } from 'vue'
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { request } from '@/util';
import QueryString from 'qs';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue'
import ServerSideTable from '@/components/ServerSideTable.vue'

onMounted(() => {
  setCurrentPageBreadcrumbs("Tambah Dokumen", ['Sekolah', 'E Dokumen']);
  getData()
})

const router = useRouter()
const kelasOption = ref()
const kategoriOption = ref()

const searchSiswa = ref()

const selectedSiswa = ref([])

const form = reactive({
  arsip_cat_id: '',
  kelas_id: '',
})

const siswa = reactive({
  columns: [
    { label: 'Siswa', field: 'user_nama', sortable: false },
    { label: 'NISN', field: 'siswa_nisn', sortable: false },
    { label: 'Kelas', field: 'kelas_nama', sortable: false }
  ],
  rows: [],
  totalRows: 0,
})

function getData() {
  request.post('arsip/catlist')
  .then(res => {
    kategoriOption.value = res.data.data
  })
  request.post('kelas')
  .then(res => {
    kelasOption.value = res.data.data
  })
}

function getSiswa(payload) {
  request.post('arsip/siswa-part', null, {
    params: {
      cari: searchSiswa.value,
      participant_id: form.kelas_id,
      page: payload?.page ?? 1,
      sortby: payload?.sort?.type ?? 'ASC'
    }
  }).then(res => {
    siswa.rows = res.data.data
  })
}

function post() {
  request.post('user/edit', QueryString.stringify(form))
  .then(res => {
    useToast().success('Data berhasil diedit!')
    router.push('/account/profile')
  })
}

function selectionChangedSiswa(params) {
  var finalArray = params.selectedRows.map((obj) => {
    return obj.siswa_id
  })
  selectedSiswa.value = finalArray
}

</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <h2 class="fs-1 fw-bold py-6">Tambah Data</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="d-flex flex-column gap-4">
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Pilih Kategori</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-select class="w-100" v-model="form.arsip_cat_id" filterable placeholder="Select">
                <el-option v-for="kategori in kategoriOption" :key="kategori.arsip_cat_id" :label="kategori.arsip_cat_name"
                  :value="kategori.arsip_cat_id" />
              </el-select>
            </div>
          </div>
          <div class="row">
            <div class="col-3 align-items-center d-flex">
              <p class="m-0 fs-4 fw-bold">Pilih Kelas</p>
            </div>
            <div class="col-9 align-items-center d-flex gap-4">
              <el-select @change="getSiswa()" class="w-100" v-model="form.kelas_id" filterable placeholder="Select">
                <el-option v-for="kelas in kelasOption" :key="kelas.kelas_id" :label="kelas.kelas_nama"
                  :value="kelas.kelas_id" />
              </el-select>
            </div>
          </div>
        </div>
        
        <div class="w-100 my-4">
          <el-input
            v-model="searchSiswa"
            clearable
            class=""
            placeholder="Nama Siswa"
            @input="getSiswa()"
          >
            <template #append>
              <el-button aria-disabled="true" class="pe-none" :icon="Search" />
            </template>
          </el-input>
        </div>
      </div>
    </div>

    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <h2 class="fs-1 fw-bold py-6">Siswa</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="my-5 mb-xxl-8">
          <ServerSideTable 
            @selected-rows-change="selectionChangedSiswa"
            :totalRows="siswa.totalRows || 0" 
            :columns="siswa.columns" 
            :rows="siswa.rows"
            :select-options="{
              enabled: true,
              selectOnCheckboxOnly: false, // only select when checkbox is clicked instead of the row
              selectionInfoClass: 'custom-class',
              selectionText: 'rows selected',
              clearSelectionText: 'clear',
              disableSelectInfo: true, // disable the select info panel on top
              selectAllByGroup: true, 
            }"
            @loadItems="getSiswa">
          </ServerSideTable>
        </div>
      </div>
    </div>
  </div>
</template>