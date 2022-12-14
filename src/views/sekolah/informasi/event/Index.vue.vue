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
import queryString from "qs";
import moment from "moment";
import { useStore } from "vuex";

  onMounted(() => {
    setCurrentPageBreadcrumbs("Event", ['Sekolah', "Informasi"]);
  })
  
  const store = useStore()
  const currentUser = store.getters.currentUser
  const storageUrl = process.env.VUE_APP_STORAGE_URL;

  function getBerita (payload) {
      request.post('event', queryString.stringify({
        page: payload?.page ?? 1,
      })).then(res => {
        event.rows = res.data.data.data
        event.totalRows = res.data.data.total
      })
    }

  const event = reactive({
    columns: [
      { label: 'Gambar', field: 'event_foto', sortable: false },
      { label: 'Tipe', field: 'event_type', sortable: false },
      { label: 'Judul', field: 'event_judul', sortable: false },
      { label: 'Tanggal Mulai - Selesai', field: 'event_tanggal', sortable: false },
      { label: 'Status', field: 'event_status', sortable: false },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
  })
  
  function deleteBerita(id) {
    deleteConfirmation(function() {
      request.get('konten/delete/' + id)
      .then(res => {
        useToast().success('Data Berhasil Dihapus!')
        getBerita()
      })
    })
  }
  
  function dateFormating(date) {
    return moment(date).format('YYYY-MM-DD h:mm:ss')
  }

</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div class="py-6 d-flex justify-content-between align-items-center">
          <h2 class="fs-1 fw-bold">Data Event</h2>
        </div>
        <div class="separator border-black-50 border-2 my-3"></div>
        <div class="my-5 mb-xxl-8">
          <ServerSideTable 
            :totalRows="event.totalRows || 0" 
            :columns="event.columns" 
            :rows="event.rows"
            @loadItems="getBerita">
            <template #table-row="{column, row}">
              <div v-if="column.field == 'event_foto'">
                <div class="p-2 bg-secondary d-inline-block">
                  <template v-if="row.event_foto">
                    <img class="image-thumbnail"  :src="`${storageUrl}/${currentUser.sekolah_kode}/apischool/public` + '/images/event/' + row.event_foto" alt="">
                  </template>
                  <template v-if="!row.event_foto">
                    <span class="fw-bold fs-6 mx-2">NO IMAGE</span>
                  </template>
                </div>
              </div>
              <div v-if="column.field == 'event_tanggal'">
                {{dateFormating(row.event_mulai)}} --- {{dateFormating(row.event_selesai)}}
              </div>
              <div v-if="column.field == 'event_status'">
                <span :class="'badge badge-light-' + (row.event_status == '1' ? 'success' : 'danger')">{{row.event_status == '1' ?
                  'Aktif' : 'Non Aktif'}}</span>
              </div>
              <div v-if="column.field == 'action'">
                <router-link :to="`/sekolah/informasi/event/detail/${row.event_id}`" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
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