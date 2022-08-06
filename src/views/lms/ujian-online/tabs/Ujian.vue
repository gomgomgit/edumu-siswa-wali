<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { request } from '@/util'
  import qs from 'qs'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import FilterSelect from '@/components/filter-select'
  import { useToast } from "vue-toast-notification"
import { deleteConfirmation } from "@/core/helpers/deleteconfirmation";
import { useStore } from "vuex";

  onMounted(() => {
    setCurrentPageBreadcrumbs("Ujian", ['LMS', "Ujian Online"]);
  })

  const store = useStore()
  const currentUser = store.getters.currentUser;

  function getExam (payload) {
      request.post('exam/followed', qs.stringify({
        page: payload?.page ?? 1,
        siswa_id: currentUser.siswa_id,
        exam_cat_type: 'exam'
      })).then(res => {
        examData.rows = res.data.data.exam_categorys
        examData.totalRows = res.data.data.total
      })
    }

  const examData = reactive({
    columns: [
      { label: 'Kategori', field: 'exam_cat_name', sortable: false },
      { label: 'Judul', field: 'exam_title', sortable: false },
      { label: 'Deskripsi', field: 'exam_desc', sortable: false },
      { label: 'Tgl Mulai', field: 'exam_start_date', sortable: false },
      { label: 'Tgl Selesai', field: 'exam_end_date', sortable: false },
      { label: 'Tipe', field: 'exam_type', sortable: false },
      { label: 'Waktu', field: 'exam_time_limit', sortable: false },
      { label: 'ACTION', field: 'action', sortable: false, width: '100px' },
    ],
    rows: [],
    totalRows: 0,
  })
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body pt-5 pb-5">
        
        <!-- Page Content -->
        <div class="page-content">
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="d-flex gap-4">
              <h2 class="fs-1 fw-bold py-6 m-0">Data Ujian Online</h2>
            </div>
          </div>
          <div class="separator border-black-50 border-2 my-3"></div>
        </div>
      </div>
      <div class="mb-5 mb-xxl-8 px-12">
        <ServerSideTable
          :totalRows="examData.totalRows || 0"
          :columns="examData.columns"
          :rows="examData.rows"
          :pagination-options="{
            enabled: false,
          }"
          @loadItems="getExam"
        >
          <template #table-row="{column, row}">
              <div v-if="column.field == 'exam_title'">
                {{row.exam[0].exam_title}}
              </div>
              <div v-if="column.field == 'exam_desc'">
                {{row.exam[0].exam_desc}}
              </div>
              <div v-if="column.field == 'exam_start_date'">
                {{row.exam[0].exam_start_date}}
              </div>
              <div v-if="column.field == 'exam_end_date'">
                {{row.exam[0].exam_end_date}}
              </div>
              <div v-if="column.field == 'exam_type'">
                {{row.exam[0].exam_type}}
              </div>
              <div v-if="column.field == 'exam_time_limit'">
                {{row.exam[0].exam_time_limit}}
              </div>
              <div v-if="column.field == 'action'">
                <router-link :to="`/lms/ujian-online/detail/${row.exam[0].exam_id}`" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
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
</template>