<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { request } from '@/util'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import FilterSelect from '@/components/filter-select'
  import { Search } from '@element-plus/icons-vue'

  onMounted(() => {
    setCurrentPageBreadcrumbs("Kategori", ['Sekolah', "Informasi", "Berita"]);
  })

  function getKategori (payload) {
      request.post('kategori', null, {
        params: {
          page: payload.page ?? 1,
          sortby: payload.sort?.type ?? 'ASC'
        }
      }).then(res => {
        kategori.rows = res.data.data.data
        kategori.totalRows = res.data.data.total
      })
    }

  const loadingTahunAjar = ref(false)
  
  const kategori = reactive({
    columns: [
      { label: 'Kategori', field: 'cat_name' },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })

  const statusFilter = ref('')

  const modalData = ref(false)

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


  function changeFilter(changed){
    console.log(changed)
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
                v-model="input2"
                class="w-100 kategori-input"
                placeholder="nama kategori"
                size=""
              />
            </div>

              <div class="d-flex align-items-center">
                <a @click="modalData = 'Tambah Data'" class="btn btn-primary d-flex align-items-center">
                  <i class="fas fa-plus fs-5 me-3"></i>
                  <span>
                    Tambah Pengumuman
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
              
                <button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/files/fil001.svg" />
                  </span>
                </button>
                <button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/art/art005.svg" />
                  </span>
                </button>
                <button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
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
  </div>
</template>

<style>
.kategori-input .el-input__inner {
  background: #F5F8FA !important;
  color: black;
}
</style>