<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { request } from '@/util'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import FilterSelect from '@/components/filter-select'
  import { Search } from '@element-plus/icons-vue'
import { useToast } from "vue-toast-notification";
import { deleteConfirmation } from "@/core/helpers/deleteconfirmation";

  onMounted(() => {
    setCurrentPageBreadcrumbs("Dokumen", ['Sekolah', "E-Document"]);
    getClass()
  })
  const baseUrl = process.env.VUE_APP_API_URL

  function getSiswa (payload) {
      request.post('arsip/siswa', null, {
        params: {
          cari: searchFilter.value,
          participant_id: classFilter.value,
          page: payload?.page ?? 1,
          sortby: payload?.sort?.type ?? 'ASC'
        }
      }).then(res => {
        siswa.rows = res.data.data.data
        siswa.totalRows = res.data.data.total
      })
    }
  function getClass (payload) {
      request.post('kelas')
      .then(res => {
        classOption.value = res.data.data
      })
    }


  const siswa = reactive({
    columns: [
      { label: 'Nama Siswa', field: 'user_nama', sortable: false },
      { label: 'E-Document', field: 'arsipFile', sortable: false },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })

  const searchFilter = ref('')
  const classFilter = ref('')
  const classOption = ref([])

  
  function deleteBerita(id) {
    deleteConfirmation(function() {
      request.get('konten/delete/' + id)
      .then(res => {
        useToast().success('Data Berhasil Dihapus!')
        getBerita()
      })
    })
  }

</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div class="py-6 d-flex justify-content-between align-items-center">
          <h2 class="fs-1 fw-bold">Data E-Document</h2>
          
        </div>
        <div class="separator border-black-50 border-2 my-3"></div>
        <div>
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="position-relative d-flex gap-4">
              <div>
                <FilterSelect v-model:filterValue="classFilter"
                  @changeFilter="getSiswa()"
                  placeholder="Pilih Kelas">
                  <el-option v-for="kelas in classOption" :value="kelas.kelas_id" :label="kelas.kelas_nama">
                  </el-option>
                </FilterSelect>
              </div>
            </div>

            <div class="d-flex gap-4">
              <div>
                <el-input
                  v-model="searchFilter"
                  class="m-2"
                  placeholder="Cari Nama"
                  :suffix-icon="Search"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="my-5 mb-xxl-8">
          <ServerSideTable 
            :key="searchFilter"
            :totalRows="siswa.totalRows || 0" 
            :columns="siswa.columns" 
            :rows="siswa.rows"
            @loadItems="getSiswa">
            <template #table-row="{column, row}">
              <div v-if="column.field == 'arsipFile'">
                <span v-if="!row.arsipFile[0]" class="badge badge-light-danger">
                  File Kosong
                </span>
                <template v-if="row.arsipFile[0]" v-for="arsip in row.arsipFile">
                  <span class="badge badge-light-success">
                    {{arsip.arsip_cat_name}}
                  </span>
                </template>
              </div>
              <div v-if="column.field == 'action'">
                <router-link :to="'/sekolah/informasi/berita/edit/' + row.content_id" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <i class="bi bi-eye-fill fs-3"></i>
                  </span>
                </router-link>
              </div>
            </template>
          </ServerSideTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.image-thumbnail{
  max-width: 80px;
  max-height: 60px;
}
</style>