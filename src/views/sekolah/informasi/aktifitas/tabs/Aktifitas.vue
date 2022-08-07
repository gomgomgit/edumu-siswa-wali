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
import moment from "moment";

  onMounted(() => {
    setCurrentPageBreadcrumbs("Aktifitas", ['Sekolah', "Informasi", "Aktifitas"]);
  })

  const store = useStore()
  const currentUser = store.getters.currentUser

  function getAktifitas (payload) {
      request.post('notification/activity', queryString.stringify({
        page: payload?.page ?? 1,
        kelasId:	currentUser.kelas_id,
        siswa_id:	currentUser.siswa_id,
        user_id:	currentUser.user_id,
      })).then(res => {
        aktifitas.rows = res.data.data.notifications
        aktifitas.totalRows = res.data.data.total
      })
    }
  
  const aktifitas = reactive({
    columns: [
      { label: 'Tipe', field: 'notification_type', sortable: false },
      { label: 'Judul', field: 'notification_title', sortable: false },
      { label: 'Deskripsi', field: 'notification_desc', sortable: false },
      { label: 'Tanggal', field: 'notification_date', sortable: false },
      { label: 'ACTION', field: 'action', sortable: false, width: '200px' },
    ],
    rows: [],
    totalRows: 0,
    perPage: 0,
  })
  
  function dateFormating(date) {
    return moment(date).format('DD/MM/Y')
  }
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div class="py-6 d-flex justify-content-between align-items-center">
          <h2 class="fs-1 fw-bold">Aktifitas</h2>
        </div>
        <div class="separator border-black-50 border-2 my-3"></div>
        <div class="my-5 mb-xxl-8">
          <ServerSideTable 
            :totalRows="aktifitas.totalRows || 0" 
            :columns="aktifitas.columns" 
            :rows="aktifitas.rows"
            @loadItems="getAktifitas">
            <template #table-row="{column, row}">
              <div v-if="column.field == 'notification_date'">
                {{dateFormating(row.notification_date)}}
              </div>
              <div v-if="column.field == 'action'">
                <template v-if="row.notification_type == 'Assignment'">
                  <router-link :to="`/lms/tugas/detail/${row.notification_id}`" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                    <span class="svg-icon svg-icon-3">
                      <i class="bi bi-eye-fill fs-3"></i>
                    </span>
                  </router-link>
                </template>
                <template v-if="row.notification_type == 'Material'">
                  <router-link :to="`/lms/materi`" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                    <span class="svg-icon svg-icon-3">
                      <i class="bi bi-eye-fill fs-3"></i>
                    </span>
                  </router-link>
                </template>
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