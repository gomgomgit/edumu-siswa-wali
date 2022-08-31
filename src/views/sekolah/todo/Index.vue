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
  const date = ref(moment().format('YYYY-MM-DD'))
  
  const store = useStore()
  const currentUser = store.getters.currentUser;

  const tableRef = ref()
  const formMode = ref()
  const activeData = ref()

  const todoData = reactive({
    columns: [
      { label: 'Judul', field: 'calendar_title', sortable: false },
      { label: 'Deskripsi', field: 'calendar_desc', sortable: false },
      { label: 'Tanggal Buat', field: 'calendar_date', sortable: false },
      { label: 'Tanggal Berakhir', field: 'calendar_time_end', sortable: false },
      { label: 'Status', field: 'calendar_status', sortable: false },
      { label: 'Action', field: 'action', sortable: false, width: '100px' },
    ],
    rows: [],
    totalRows: 0,
  })

  function getTodo(payload) {
    request.post('calendar/todo-all', QueryString.stringify({
      type_date: "week",
      user_id: currentUser.siswa_id
    })).then(res => {
      todoData.rows = res.data.data
      todoData.totalRows = res.data.total
    })
  }
  
  function handleEdit (row) {
    activeData.value = row
    formMode.value = 'Edit Data'
  }
  function handleFormClose() {
    formMode.value = false
    activeData.value = null
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
              <!-- <el-date-picker
                v-model="date"
                type="date"
                placeholder="Tanggal"
                size="large"
                value-format="YYYY-MM-DD"
                @change="getTodo()"
              /> -->
              
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
              <div v-if="column.field == 'calendar_status'">
                    <span :class="`badge badge-light-${row.calendar_status == '1' ? 'success' : 'danger'}`">{{row.calendar_status == '1' ?  "Aktif" : " Non Aktif"}}</span>
              </div>
              <div v-if="column.field == 'action'">
                <button @click="handleEdit(row)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/art/art005.svg" />
                  </span>
                </button>
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