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
import { useRoute } from "vue-router";

  onMounted(() => {
    setCurrentPageBreadcrumbs("Detail", ['Sekolah', "E-Document"]);
    getCatList()
  })
  const route = useRoute()
  const siswaId = route.params.id
  const siswaName = route.params.name

  function getSiswa (payload) {
      request.post('arsip/detail', null, {
        params: {
          user_id: siswaId,
          cari: searchFilter.value,
          arsip_cat_id: catFilter.value,
          page: payload?.page ?? 1,
          sortby: payload?.sort?.type ?? 'ASC'
        }
      }).then(res => {
        dokumen.rows = res.data.data.data
        dokumen.totalRows = res.data.data.total
      })
    }
  function getCatList (payload) {
      request.post('arsip/catlist')
      .then(res => {
        catlistOption.value = res.data.data
      })
    }


  const dokumen = reactive({
    columns: [
      { label: 'Nama Siswa', field: 'user_nama', sortable: false },
      { label: 'Nama File', field: 'file_name', sortable: false },
      { label: 'Tipe', field: 'arsip_cat_name', sortable: false },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })

  const searchFilter = ref('')
  const catFilter = ref('')
  const catlistOption = ref([])

  
  function deleteData(id) {
    deleteConfirmation(function() {
      request.get('thn_ajar/delete/' + id)
      .then(res => {
        useToast().success('Data Berhasil Dihapus!')
        getTahunAjar()
      })
    })
  }

</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div class="py-6 d-flex justify-content-between align-items-center">
          <h2 class="fs-1 fw-bold">Detail Dokumen - {{siswaName}}</h2>
          
        </div>
        <div class="separator border-black-50 border-2 my-3"></div>
        <div>
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="position-relative d-flex gap-4">
              <div>
                <FilterSelect v-model:filterValue="catFilter"
                  @changeFilter="getSiswa()"
                  placeholder="Pilih Kategori">
                  <el-option v-for="cat in catlistOption" :value="cat.arsip_cat_id" :label="cat.arsip_cat_name">
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
            :totalRows="dokumen.totalRows || 0" 
            :columns="dokumen.columns" 
            :rows="dokumen.rows"
            @loadItems="getSiswa">
            <template #table-row="{column, row}">
              <div v-if="column.field == 'action'">
                <a :href="row.file_url" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <i class="bi bi-cloud-arrow-down-fill fs-3"></i>
                  </span>
                </a>
                
                <button @click="deleteData(row.thn_ajar_id)" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/general/gen027.svg"/>
                  </span>
                </button>
              </div>
            </template>
          </ServerSideTable>
        </div>
      </div>
    </div>
  </div>
</template>