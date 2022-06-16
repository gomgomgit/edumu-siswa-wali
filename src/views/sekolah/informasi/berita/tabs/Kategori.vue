<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { request } from '@/util'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import FilterSelect from '@/components/filter-select'
  import { Search } from '@element-plus/icons-vue'
  import QueryString from "qs"
  import { useToast } from "vue-toast-notification"
import { object } from "yup";
import { deleteConfirmation } from "@/core/helpers/deleteconfirmation";

  onMounted(() => {
    setCurrentPageBreadcrumbs("Kategori", ['Sekolah', "Informasi", "Berita"]);
  })

  function getKategori (payload) {
      request.post('kategori', null, {
        params: {
          page: payload?.page ?? 1,
          sortby: payload?.sort?.type ?? 'ASC'
        }
      }).then(res => {
        kategori.rows = res.data.data.data
        kategori.totalRows = res.data.data.total
      })
    }

  const inputKategori = ref('')
  const modalEdit = ref()
  
  const initialKategori = {cat_id: null, cat_name: null}
  const formData = reactive({...initialKategori})

  const kategori = reactive({
    columns: [
      { label: 'Kategori', field: 'cat_name' },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })

  function tambahKategori() {
    request.post('/kategori/add', QueryString.stringify({
      cat_name: inputKategori.value
    })).then(res => {
      inputKategori.value = null
      getKategori()
      useToast().success('Data Berhasil Ditambahkan!')
    })
  }
  function showEditKategori(data) {
    formData.cat_id = data.cat_id
    formData.cat_name = data.cat_name
    modalEdit.value = true
  }
  function closeModalEdit() {
    modalEdit.value = false
    Object.assign(formData, initialKategori)
  }
  function editKategori() {
    request.post('kategori/edit', QueryString.stringify(formData))
      .then(res => {
        useToast().success('Data Berhasil Diedit!')
        modalEdit.value = false
        Object.assign(formData, initialKategori)
        getKategori()
      })
  }
  function deleteKategori(id) {
    deleteConfirmation(function() {
      request.get('/kategori/delete/' + id)
      .then(res => {
        useToast().success('Data Berhasil Dihapus!')
        getKategori()
      })
    })
  }
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <h2 class="fs-1 fw-bold py-6">Data Kategori</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div>
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-6">
            <div>
              <h3 class="fw-bold m-0">Nama Kategori : </h3>
            </div>
            <div class="flex-grow-1">
              <el-input
                v-model="inputKategori"
                class="w-100 kategori-input"
                placeholder="nama kategori"
                size=""
              />
            </div>

              <div class="d-flex align-items-center">
                <a @click="tambahKategori" class="btn btn-primary d-flex align-items-center">
                  <i class="fas fa-plus fs-5 me-3"></i>
                  <span>
                    Tambah Kategori
                  </span>
                </a>
              </div>
          </div>
        </div>
        <div class="my-5 mb-xxl-8">
          <ServerSideTable :totalRows="kategori.totalRows || 0" :columns="kategori.columns" :rows="kategori.rows"
            @loadItems="getKategori">
            <template #table-row="{column, row}">
              <div v-if="column.field == 'action'">
                <button @click="showEditKategori(row)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/art/art005.svg" />
                  </span>
                </button>
                <button @click="deleteKategori(row.cat_id)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/general/gen027.svg" />
                  </span>
                </button>
              </div>
            </template>
          </ServerSideTable>
        </div>
      </div>
    </div>
    
    <Modal
      title="Edit Kategori"
      :show="modalEdit"
      @closeModal="closeModalEdit"
      @confirm="editKategori()"
      @dismiss="closeModalEdit"
    >
        <div class="">
          <div class="row gy-6">
            <div class="col-4 d-flex align-items-center fw-bold fs-4">Nama Kategori</div>
            <div class="col-8">
              <input type="text" v-model="formData.cat_name" class="form-control" placeholder="Masukkan Tahun Ajar Cth : 2021/2022"/>
            </div>
          </div>
        </div>
    </Modal>
  </div>
</template>

<style>
.kategori-input .el-input__inner {
  background: #F5F8FA !important;
  color: black;
}
</style>