<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { request } from '@/util'
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import { Search } from '@element-plus/icons-vue'
  import QueryString from 'qs';
  import { useToast } from 'vue-toast-notification';
import moment from "moment";
import { useStore } from "vuex";
import DetailModal from './DetailModal.vue'

  onMounted(() => {
    setCurrentPageBreadcrumbs("Absensi Mapel", ["Absensi"]);
  })
  const date = ref(moment().format('YYYY-MM-DD'))
  
  const store = useStore()
  const currentUser = store.getters.currentUser;

  const activeData = ref()

  const kehadiranData = reactive({
    columns: [
      { label: 'Guru', field: 'user_nama', sortable: false },
      { label: 'Mapel', field: 'mapel_nama', sortable: false },
      { label: 'Tgl/Jam', field: 'pg_create_date', sortable: false },
      { label: 'Status', field: 'pg_status', sortable: false },
      { label: 'Deskripsi', field: 'pg_note', sortable: false },
      // { label: 'Action', field: 'action', sortable: false, width: '100px' },
    ],
    rows: [],
    totalRows: 0,
  })

  function getKehadiran(payload) {
    request.post('attendance/mapel', QueryString.stringify({
      page: payload?.page ?? 1,
      date: date.value,
      siswa_id:	currentUser.siswa_id,
    })).then(res => {
      console.log(res)
      kehadiranData.rows = res.data.data.attendance_classes
      kehadiranData.totalRows = res.data.total
    }).catch(err => {
      kehadiranData.rows = []
      kehadiranData.totalRows = 0
    })
  }
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="d-flex gap-4">
              <h2 class="fs-1 fw-bold py-2">Data Absensi Mapel</h2>
            </div>
            <div class="position-relative d-flex gap-4">
              <el-date-picker
                v-model="date"
                type="date"
                placeholder="Tanggal"
                size="large"
                value-format="YYYY-MM-DD"
                @change="getKehadiran()"
              />
            </div>
          </div>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="mb-5 mb-xxl-8">
          <ServerSideTable
            :totalRows="kehadiranData.totalRows || 0"
            :columns="kehadiranData.columns"
            :rows="kehadiranData.rows"
            @loadItems="getKehadiran"
          >
            <template #table-row="{column, row}">
              <div v-if="column.field == 'action'">
                <a @click="activeData = row" class="btn btn-icon btn-bg-light btn-active-color-success btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <i class="bi bi-eye-fill fs-3"></i>
                  </span>
                </a>
              </div>
            </template>
          </ServerSideTable>
        </div>
      </div>
    </div>
    
    <detailModal 
      :activeData="activeData"
      @close="activeData = null"/>
  </div>
</template>