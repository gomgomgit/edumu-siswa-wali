<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { request } from '@/util'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import FilterSelect from '@/components/filter-select'
  import { Search } from '@element-plus/icons-vue'
  import { deleteConfirmation } from "@/core/helpers/deleteconfirmation";
  import { useToast } from "vue-toast-notification";
  import { useStore } from "vuex";
  import queryString from "qs";

  onMounted(() => {
    setCurrentPageBreadcrumbs("Pengumuman", ['Sekolah', "Informasi"]);
  })

  const store = useStore()
  const currentUser = store.getters.currentUser
  const storageUrl = process.env.VUE_APP_STORAGE_URL;

  function getPengumuman (payload) {
      request.post('pengumuman/all', queryString.stringify({
        page: payload?.page ?? 1,
        section:	"pengumuman",
        platform:	"web",
        kelas_id:	currentUser.kelas_id,
        locale:	"id"
      })).then(res => {
        pengumuman.rows = res.data.data.content.data
        pengumuman.totalRows = res.data.data.content.total
      })
    }
  
  const pengumuman = reactive({
    columns: [
      { label: 'Gambar', field: 'content_image', sortable: false },
      { label: 'Judul', field: 'content_name', sortable: false },
      { label: 'Deskripsi', field: 'content_shortdesc', sortable: false },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
    perPage: 0,
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

  function deletePengumuman(id) {
    deleteConfirmation(function() {
      request.get('pengumuman/delete/' + id)
      .then(res => {
        useToast().success('Data Berhasil Dihapus!')
        getPengumuman()
      })
    })
  }
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div class="py-6 d-flex justify-content-between align-items-center">
          <h2 class="fs-1 fw-bold">Data Pengumuman</h2>
        </div>
        <div class="separator border-black-50 border-2 my-3"></div>
        <div class="my-5 mb-xxl-8">
          <ServerSideTable 
            :totalRows="pengumuman.totalRows || 0" 
            :columns="pengumuman.columns" 
            :rows="pengumuman.rows"
            :paginationOptions="{enabled: true, perPage: pengumuman.perPage}"
            @loadItems="getPengumuman">
            <template #table-row="{column, row}">
              <div v-if="column.field == 'content_image'">
                <div class="p-2 bg-secondary d-inline-block">
                  <template v-if="row.content_image">
                    <img class="image-thumbnail"  :src="`${storageUrl}/${currentUser.sekolah_kode}/apischool/public` + '/images/konten/' + row.content_image" alt="">
                  </template>
                  <template v-if="!row.content_image">
                    <span class="fw-bold fs-6 mx-2">NO IMAGE</span>
                  </template>
                </div>
              </div>
              <div v-if="column.field == 'action'">
                <router-link :to="`/sekolah/informasi/pengumuman/detail/${row.content_id}`" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
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