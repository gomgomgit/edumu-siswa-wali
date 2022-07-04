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
import QueryString from "qs";

  onMounted(() => {
    setCurrentPageBreadcrumbs("Skema Absensi", ["Absensi"]);
  })

  function getGuruGps (payload) {
    request.post('guru_gps', null, {
      params: {
        page: payload?.page ?? 1,
        sortby: payload?.sort?.type ?? 'ASC'
      }
    }).then(res => {
      guruGps.rows = res.data.data.data
      guruGps.totalRows = res.data.data.total
    })
  }
  function getGuruNonGps (payload) {
    request.post('guru_non_gps', null, {
      params: {
        page: payload?.page ?? 1,
        sortby: payload?.sort?.type ?? 'ASC'
      }
    }).then(res => {
      guruNonGps.rows = res.data.data.data
      guruNonGps.totalRows = res.data.data.total
    })
  }


  const guruGps = reactive({
    columns: [
      { label: 'Guru', field: 'user_nama', sortable: false },
      { label: 'NIP', field: 'guru_nip', sortable: false },
      { label: 'Status', field: 'def_loc', sortable: false },
    ],
    rows: [],
    totalRows: 0,
  })
  const guruNonGps = reactive({
    columns: [
      { label: 'Guru', field: 'user_nama', sortable: false },
      { label: 'NIP', field: 'guru_nip', sortable: false },
    ],
    rows: [],
    totalRows: 0,
  })

  const selectedGps = ref([])
  const selectedNonGps = ref([])

  function selectionChangedNonGps(params) {
    var finalArray = params.selectedRows.map(function (obj) {
      return obj.guru_id;
    });
    console.log(finalArray)
    selectedNonGps.value = finalArray
  }
  function selectionChangedGps(params) {
    var finalArray = params.selectedRows.map(function (obj) {
      return obj.guru_id;
    });
    console.log(finalArray)
    selectedGps.value = finalArray
  }

  function setGps(gps, del = '', rand = '') {
    request.post('guru/gps', QueryString.stringify({
      guru_pgs:	gps ? selectedGps.value : null,
      guru_non_gps:	gps ? null : selectedNonGps.value,
      opsi:	gps ? "1" : "0",
      resetloc:	del,
      setloc:	rand,
    })).then(res => {
      useToast().success('Data Berhasil diubah!')
      getGuruGps()
      getGuruNonGps()
    })
  }
</script>

<template>
  <div class="row">
    <div class="col-5">
      <div class="card mb-5 mb-xxl-8">
        <div class="card-body py-6">
          <div class="py-6 d-flex justify-content-between align-items-center">
            <h2 class="fs-1 fw-bold">Skema Absensi - Absensi Non GPS</h2>
            
          </div>
          <div class="separator border-black-50 border-2 my-3"></div>
          <div>
            <div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="position-relative d-flex gap-4">
              </div>
  
              <div class="d-flex gap-4">
                <a @click="setGps(0)" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                  <span>
                    Set Absen GPS
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div class="my-5 mb-xxl-8">
            <ServerSideTable 
              @selected-rows-change="selectionChangedNonGps"
              :totalRows="guruNonGps.totalRows || 0" 
              :columns="guruNonGps.columns" 
              :rows="guruNonGps.rows"
              :select-options="{
                enabled: true,
                selectOnCheckboxOnly: false, // only select when checkbox is clicked instead of the row
                selectionInfoClass: 'custom-class',
                selectionText: 'rows selected',
                clearSelectionText: 'clear',
                disableSelectInfo: true, // disable the select info panel on top
                selectAllByGroup: true, 
              }"
              @loadItems="getGuruNonGps">
            </ServerSideTable>
          </div>
        </div>
      </div>
    </div>
    <div class="col-7">
      <div class="card mb-5 mb-xxl-8">
        <div class="card-body py-6">
          <div class="py-6 d-flex justify-content-between align-items-center">
            <h2 class="fs-1 fw-bold">Skema Absensi - Absensi GPS</h2>
          </div>
          <div class="separator border-black-50 border-2 my-3"></div>
          <div>
            <div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="position-relative d-flex gap-4">
              </div>
  
              <div class="d-flex gap-4">
                <a @click="setGps(1, 1, 1)" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                  <span>
                    Lokasi Acak
                  </span>
                </a>
                <a @click="setGps(1, 1)" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                  <span>
                    Hapus Lokasi
                  </span>
                </a>
                <a @click="setGps(1)" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                  <span>
                    Set Absen Non GPS
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div class="my-5 mb-xxl-8">
            <ServerSideTable 
              @selected-rows-change="selectionChangedGps"
              :totalRows="guruGps.totalRows || 0" 
              :columns="guruGps.columns" 
              :rows="guruGps.rows"
              :pagination-options="{
                enabled: false,
              }"
              :select-options="{
                enabled: true,
                selectOnCheckboxOnly: false, // only select when checkbox is clicked instead of the row
                selectionInfoClass: 'custom-class',
                selectionText: 'rows selected',
                clearSelectionText: 'clear',
                disableSelectInfo: true, // disable the select info panel on top
                selectAllByGroup: true, 
              }"
              @loadItems="getGuruGps">
              <template #table-row="{column, row}">
                <div v-if="column.field == 'def_loc'">
                  {{row.def_loc ? 'Lokasi Acak' : 'Lokasi Tetap'}}
                </div>
              </template>
            </ServerSideTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>