<script setup>
  import { ref, reactive, onMounted } from "vue";
  import { request } from '@/util'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import FilterSelect from '@/components/filter-select'
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import QueryString from "qs";
  import { useToast } from "vue-toast-notification"
  import { deleteConfirmation } from "@/core/helpers/deleteconfirmation";
import moment from "moment";
import { useStore } from "vuex";
  
  onMounted(() => {
    setCurrentPageBreadcrumbs("Hari Ini", ['Sekolah', "Kelas"]);
  })

  const store = useStore()
  const currentUser = store.getters.currentUser;

  function getJadwal (payload) {
    request.post('jadwal/today', QueryString.stringify(
      {
        kelas_id: currentUser.kelas_id,
        day: moment().day()
      }
    ))
    .then(res => {
      jadwal.rows = res.data.data.jadwals
    })
  }

  const jadwal = reactive({
    columns: [
      { label: 'Mapel', field: 'mapel_nama', sortable: false },
      { label: 'Guru', field: 'user_nama', sortable: false },
      { label: 'Waktu', field: 'desc', sortable: false },
    ],
    rows: [],
    totalRows: 0,
  })
</script>

<template>
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <div class="page-content">
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div class="d-flex gap-4">
            <h2 class="fs-1 fw-bold py-6">Jadwal Hari Ini</h2>
          </div>
        </div>
        <div class="mb-5 mb-xxl-8">
          <ServerSideTable
            :columns="jadwal.columns"
            :rows="jadwal.rows"
            @loadItems="getJadwal"
          >
          </ServerSideTable>
        </div>
      </div>
    </div>
  </div>
</template>