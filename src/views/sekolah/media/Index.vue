<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { request } from '@/util'
  import qs from 'qs'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import FilterSelect from '@/components/filter-select'
  import { useToast } from "vue-toast-notification"

  onMounted(() => {
    setCurrentPageBreadcrumbs("Media", ['Sekolah']);
  })

  function getKelasMedia (payload) {
      request.post('kelas', null, {
        params: {
          page: payload?.page ?? 1,
          sortby: payload?.sort?.type ?? 'ASC'
        }
      }).then(res => {
        kelasMedia.rows = res.data.data.data
        kelasMedia.totalRows = res.data.data.total
      })
    }

  const kelasMedia = reactive({
    columns: [
      { label: 'Kelas', field: 'kelas_nama' },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })

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
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body pt-5 pb-5">
        
        <div>
          <h2 class="fs-1 fw-bold py-6">Data Media</h2>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <!-- Page Content -->
        <div class="page-content">
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="d-flex gap-4">
            </div>

            <div class="position-relative d-flex ">
            </div>
          </div>
        </div>
      </div>
      <div class="mb-5 mb-xxl-8 px-12">
        <ServerSideTable
          :totalRows="kelasMedia.totalRows || 0"
          :columns="kelasMedia.columns"
          :rows="kelasMedia.rows"
          @loadItems="getKelasMedia"
        >
          <template #table-row="{column, row}">
              <div v-if="column.field == 'action'">
                <router-link :to="'/sekolah/media/album/' + row.kelas_id" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/files/fil001.svg" />
                  </span>
                </router-link>
              </div>
            </template>
        </ServerSideTable>
      </div>
    </div>
  </div>
</template>