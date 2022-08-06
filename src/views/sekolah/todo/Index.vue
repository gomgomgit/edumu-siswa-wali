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
import FormModal from "./FormModal.vue";

  onMounted(() => {
    setCurrentPageBreadcrumbs("Todo", ["Sekolah"]);
  })
  const date = ref(moment().format('YYYY-MM'))
  
  const store = useStore()
  const currentUser = store.getters.currentUser;

  const tableRef = ref()
  const formMode = ref()
  const activeData = ref()

  const todoData = reactive({
    columns: [
      { label: 'Foto', field: 'foto', sortable: false },
      { label: 'Tipe', field: 'presensi_tipe', sortable: false },
      { label: 'Deskripsi', field: 'deskripsi', sortable: false },
      { label: 'Status', field: 'presensi_status', sortable: false },
      { label: 'Action', field: 'action', sortable: false, width: '100px' },
    ],
    rows: [],
    totalRows: 0,
  })

  function getTodo(payload) {
    request.post('calendar/todo', QueryString.stringify({
      type_date: "week",
      date: date.value,
      user_id: currentUser.siswa_id
    })).then(res => {
      todoData.rows = res.data.data.presensis.data
      todoData.totalRows = res.data.data.presensis.totalRows
    })
  }
  function handleFormClose() {
    formMode.value = false
  }
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body py-6">
        <div>
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="d-flex gap-4">
              <h2 class="fs-1 fw-bold py-2">Todo</h2>
            </div>
            <div class="position-relative d-flex align-items-center gap-4">
              <el-date-picker
                v-model="date"
                type="month"
                placeholder="Tanggal"
                size="large"
                value-format="YYYY-MM"
                @change="getTodo()"
              />
              
              <button @click="formMode = 'Tambah Data'" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                <i class="bi bi-plus fs-1"></i>
                <span>
                  Tambah Todo
                </span>
              </button>
            </div>
          </div>
        </div>
        <div class="separator border-black-50 border-2 my-6"></div>
        <div class="mb-5 mb-xxl-8">
          <ServerSideTable
            ref="tableRef"
            :totalRows="todoData.totalRows || 0"
            :columns="todoData.columns"
            :rows="todoData.rows"
            @loadItems="getTodo"
          >
            <template #table-row="{column, row}">
              <div v-if="column.field == 'foto'">
                <div class="bg-secondary p-2 d-inline-block">
                  <img :src="row.presensi_foto" alt="" style="max-height: 80px">
                </div>
              </div>
              <div v-if="column.field == 'deskripsi'">
                {{row.presensi_create_date}} - {{row.presensi_create_time}}
              </div>
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
    <FormModal 
      :mode="formMode"
      :activeData="activeData"
      @close="handleFormClose"
      @submit="tableRef.loadItems()" />
  </div>
</template>