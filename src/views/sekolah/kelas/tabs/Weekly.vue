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
    setCurrentPageBreadcrumbs("Mingguan", ['Sekolah', "Jadwal"]);
  })

  const store = useStore()
  const currentUser = store.getters.currentUser;

  function getJadwal (payload) {
    request.post('jadwal/week', QueryString.stringify(
      {
        kelas_id: currentUser.kelas_id,
        siswa_id: currentUser.siswa_id,
      }
    ))
    .then(res => {
      jadwal.rows = res.data.data.jadwals
    })
  }

  const jadwal = reactive({
    columns: [
      { label: 'Hari', field: 'jadwal_hari_name', sortable: false },
      { label: 'Mapel', field: 'jadwals', sortable: false },
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
            <h2 class="fs-1 fw-bold py-6">Jadwal Mingguan</h2>
          </div>
        </div>
        <div class="mb-5 mb-xxl-8">
          <ServerSideTable
            :columns="jadwal.columns"
            :rows="jadwal.rows"
            @loadItems="getJadwal"
          >
            <template #table-row="{column, row}">
              <div v-if="column.field == 'jadwals'">
                <div class="d-flex gap-6">
                  <div class="d-flex flex-column gap-6">
                    <template v-for="jadwal in row.jadwals" :key="jadwal.jadwal_id">
                      <div>
                        {{jadwal.mapel_nama}}
                      </div>
                    </template>
                  </div>
                  <div class="d-flex flex-column gap-6">
                    <template v-for="jadwal in row.jadwals" :key="jadwal.jadwal_id">
                      <div>
                        {{jadwal.jadwal_mulai}} - {{jadwal.jadwal_selesai}}
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </template>
          </ServerSideTable>
        </div>
      </div>
    </div>
  </div>
</template>