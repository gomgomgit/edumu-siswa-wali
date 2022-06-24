<script setup>
  import { ref, onMounted, reactive, watch } from "vue";
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
import { isEmpty } from "validate.js";

  onMounted(() => {
    setCurrentPageBreadcrumbs("Kategori", ['Sekolah', "E-Document"]);
  })

  function getKategori (payload) {
      request.post('arsip/cat', null, {
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
  const activeData = ref([])
  const formMode = ref('')
  
  const initialKategori = {arsip_cat_id: null, arsip_cat_name: null, isActive: null}
  const formData = reactive({...initialKategori})

  const kategori = reactive({
    columns: [
      { label: 'Kategori', field: 'arsip_cat_name', sortable: false },
      { label: 'Status', field: 'arsip_cat_status', sortable: false },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })
  function showFormKategori(mode, data) {
    if (data) {
      activeData.value = data
    }
    formMode.value = mode
  }

  function closeModalForm() {
    formMode.value = false
    Object.assign(formData, initialKategori)
  }
  function submitKategori() {
	const endpoint = isEmpty(activeData.value) ? 'arsip/cat/add' : 'arsip/cat/edit'
	const message = isEmpty(activeData.value) ? 'Ditambahkan!' : 'Diubah!'

    request.post(endpoint, QueryString.stringify(formData))
      .then(res => {
        useToast().success('Data Berhasil ' + message)
        formMode.value = false
        Object.assign(formData, initialKategori)
        getKategori()
      })
  }
  // function deleteKategori(id) {
  //   deleteConfirmation(function() {
  //     request.get('/kategori/delete/' + id)
  //     .then(res => {
  //       useToast().success('Data Berhasil Dihapus!')
  //       getKategori()
  //     })
  //   })
  // }
  
watch(
	() => activeData,
	activeData => !isEmpty(activeData) && Object.assign(formData, { ...activeData.value, isActive: activeData.value.arsip_cat_status == 1 ? true : false }),
	{ deep: true }
)
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div class="d-flex justify-content-between py-6">
          <h2 class="fs-1 fw-bold">Data Kategori</h2>
          
          <div class="d-flex align-items-center">
            <a @click="showFormKategori('Tambah Kategori')" class="btn btn-primary d-flex align-items-center">
              <i class="fas fa-plus fs-5 me-3"></i>
              <span>
                Tambah Kategori
              </span>
            </a>
          </div>
        </div>
        <div class="separator border-black-50 border-2 my-3"></div>
        <div class="my-5 mb-xxl-8">
          <ServerSideTable :totalRows="kategori.totalRows || 0" :columns="kategori.columns" :rows="kategori.rows"
            @loadItems="getKategori">
            <template #table-row="{column, row}">
              <div v-if="column.field == 'arsip_cat_status'">
                  <span :class="'badge badge-light-' + (row.arsip_cat_status == 1 ? 'success' : 'danger')">
                    {{row.arsip_cat_status == 1 ? 'Aktif' : 'Non Aktif'}}
                  </span>
              </div>
              <div v-if="column.field == 'action'">
                <button @click="showFormKategori('Edit Kategori', row)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/art/art005.svg" />
                  </span>
                </button>
              </div>
            </template>
          </ServerSideTable>
        </div>
      </div>
    </div>
    
    <Modal
      :title="formMode"
      :show="formMode"
      @closeModal="closeModalForm"
      @confirm="submitKategori()"
      @dismiss="closeModalForm"
    >
        <div class="">
          <div class="row gy-6">
            <div class="col-4 d-flex align-items-center fw-bold fs-4">Nama Kategori</div>
            <div class="col-8">
              <input type="text" v-model="formData.arsip_cat_name" class="form-control" placeholder="Masukkan Tahun Ajar Cth : 2021/2022"/>
            </div>
            
            <div class="col-4 d-flex align-items-center fw-bold fs-4">Status Mapel</div>
            <div class="col-8">
              <div class="form-check form-check-inline">
                <input
                  v-model="formData.isActive"
                  class="form-check-input"
                  type="radio"
                  id="mapel-status-1"
                  :value="true">
                <label class="form-check-label" for="mapel-status-1">Aktif</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  v-model="formData.isActive"
                  class="form-check-input"
                  type="radio"
                  id="mapel-status-0"
                  :value="false">
                <label class="form-check-label" for="mapel-status-0">Non Aktif</label>
              </div>
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