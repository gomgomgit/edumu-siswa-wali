<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { request } from '@/util'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import FilterSelect from '@/components/filter-select'
  import { Search } from '@element-plus/icons-vue'

  onMounted(() => {
    setCurrentPageBreadcrumbs("Pengumuman", ['Sekolah', "Informasi"]);
  })

  function getPengumuman (payload) {
      request.post('pengumuman', null, {
        params: {
          page: payload.page ?? 1,
          sortby: payload.sort?.type ?? 'ASC'
        }
      }).then(res => {
        pengumuman.rows = res.data.data.data
        pengumuman.totalRows = res.data.data.total
        pengumuman.perPage = res.data.data.per_page
      })
    }

  const loadingTahunAjar = ref(false)
  
  const pengumuman = reactive({
    columns: [
      { label: 'Judul', field: 'content_name' },
      { label: 'Deskripsi', field: 'content_shortdesc' },
      { label: 'Status', field: 'content_status' },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
    perPage: 0,
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
          <h2 class="fs-1 fw-bold py-6">Data Pengumuman</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div>
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="d-flex gap-4">
              <div>
                <el-input
                  v-model="input2"
                  class="m-2"
                  placeholder="Please Input"
                  :suffix-icon="Search"
                />
              </div>
            </div>

            <div class="position-relative d-flex gap-4">
              <div>
                <FilterSelect v-model:filterValue="statusFilter" :options="statusOption"
                  @changeFilter="changeFilter('status')" placeholder="Pilih Status" />
              </div>
              <div class="d-flex align-items-center">
                <a @click="modalData = 'Tambah Data'" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                  <i class="bi bi-plus fs-1"></i>
                  <span>
                    Tambah Pengumuman
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="my-5 mb-xxl-8">
          <ServerSideTable 
            :totalRows="pengumuman.totalRows || 0" 
            :columns="pengumuman.columns" 
            :rows="pengumuman.rows"
            :paginationOptions="{enabled: true, perPage: pengumuman.perPage}"
            @loadItems="getPengumuman">
            <template #table-row="{column, row}">
              <div v-if="column.field == 'thn_ajar_semester'">
                {{row.thn_ajar_semester[0].toUpperCase() + row.thn_ajar_semester.substring(1)}}
              </div>
              <div v-if="column.field == 'content_status'">
                <span :class="'badge badge-light-' + (row.content_status == '1' ? 'success' : 'danger')">{{row.content_status == '1' ?
                  'Aktif' : 'Non Aktif'}}</span>
              </div>
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