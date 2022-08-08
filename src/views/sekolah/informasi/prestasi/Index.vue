<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { request } from '@/util'
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import queryString from "qs";

  onMounted(() => {
    setCurrentPageBreadcrumbs("Prestasi", ['Sekolah', "Informasi"]);
  })

  function getPrestasi (payload) {
      request.post('content/list', queryString.stringify({
        page: payload?.page ?? 1,
        section:	"prestasi",
        platform:	"web",
        locale:	"id"
      })).then(res => {
        prestasi.rows = res.data.data.content.data
        prestasi.totalRows = res.data.data.content.total
      })
    }

  const prestasi = reactive({
    columns: [
      { label: 'Gampar', field: 'content_image', sortable: false },
      { label: 'Judul', field: 'content_name', sortable: false },
      { label: 'Deskripsi', field: 'content_shortdesc', sortable: false },
      { label: 'Status', field: 'content_status', sortable: false },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })

  const statusFilter = ref('')
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

</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div class="py-6 d-flex justify-content-between align-items-center">
          <h2 class="fs-1 fw-bold">Data Prestasi</h2>
        </div>
        <div class="separator border-black-50 border-2 my-3"></div>
        <div class="my-5 mb-xxl-8">
          <ServerSideTable :totalRows="prestasi.totalRows || 0" :columns="prestasi.columns" :rows="prestasi.rows"
            @loadItems="getPrestasi">
            <template #table-row="{column, row}">
              <div v-if="column.field == 'content_image'">
                <div class="p-2 bg-secondary d-inline-block">
                  <template v-if="row.content_image">
                    <img class="image-thumbnail"  :src="row.content_image" alt="">
                  </template>
                  <template v-if="!row.content_image">
                    <span class="fw-bold fs-6 mx-2">NO IMAGE</span>
                  </template>
                </div>
              </div>
              <div v-if="column.field == 'content_status'">
                <span :class="'badge badge-light-' + (row.content_status == '1' ? 'success' : 'danger')">{{row.content_status == '1' ?
                  'Aktif' : 'Non Aktif'}}</span>
              </div>
              <div v-if="column.field == 'action'">
                <router-link :to="`/sekolah/informasi/prestasi/detail/${row.content_id}`" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
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