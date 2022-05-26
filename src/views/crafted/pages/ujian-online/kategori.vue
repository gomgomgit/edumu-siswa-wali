<script lang="ts" setup>
  import { ref } from "vue";
  import Datatable from "@/components/kt-datatable/KTDatatable.vue";

  const value1 = ref('')
  const value2 = ref('')

  const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
  }

  const tableHeader = ref([
    {
      name: "No",
      key: "no",
    },
    {
      name: "Kelas",
      key: "kelas",
    },
    {
      name: "Mata Pelajaran",
      key: "mapel",
    },
    {
      name: "Guru",
      key: "guru",
    },
    {
      name: "Judul Tugas",
      key: "judul_tugas",
    },
    {
      name: "Mulai - Selesai",
      key: "mulai_selesai",
    },
    {
      name: "Status",
      key: "status",
    },
    {
      name: "Action",
      key: "action",
      sortable: false,
    },
  ])

  const tableData = ref([
    {
      no : "1",
      kelas : "Kelas Edumu, X IPA",
      mapel : "B.Indonesia",
      guru : "Aldry Azzari",
      judul_tugas : "Syair",
      mulai_selesai : "4/22/2022 14:10 - 4/25/2022 18:10",
      status : "Tersimpan",
    },
    {
      no : "1",
      kelas : "Kelas Edumu, X IPA",
      mapel : "B.Indonesia",
      guru : "Aldry Azzari",
      judul_tugas : "Syair",
      mulai_selesai : "4/22/2022 14:10 - 4/25/2022 18:10",
      status : "Tersimpan",
    },
    {
      no : "1",
      kelas : "Kelas Edumu, X IPA",
      mapel : "B.Indonesia",
      guru : "Aldry Azzari",
      judul_tugas : "Syair",
      mulai_selesai : "4/22/2022 14:10 - 4/25/2022 18:10",
      status : "Tersimpan",
    },
    {
      no : "1",
      kelas : "Kelas Edumu, X IPA",
      mapel : "B.Indonesia",
      guru : "Aldry Azzari",
      judul_tugas : "Syair",
      mulai_selesai : "4/22/2022 14:10 - 4/25/2022 18:10",
      status : "Tersimpan",
    },
    {
      no : "1",
      kelas : "Kelas Edumu, X IPA",
      mapel : "B.Indonesia",
      guru : "Aldry Azzari",
      judul_tugas : "Syair",
      mulai_selesai : "4/22/2022 14:10 - 4/25/2022 18:10",
      status : "Tersimpan",
    },
  ])
</script>

<template>
  <div>
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body pt-5 pb-5">
        <div class="d-flex flex-wrap justify-content-between align-items-center">
          <div class="d-flex gap-4">
            <div>
              <select class="form-select" aria-label="Select example">
                <option>Pilih Guru</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div>
              <select class="form-select" aria-label="Select example">
                <option>Mapel</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div>
              <select class="form-select" aria-label="Select example">
                <option>Kelas</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div>
              <el-date-picker class="" v-model="value1" type="date" placeholder="Mulai" />
            </div>
            <div>
              <el-date-picker class="" v-model="value2" type="date" placeholder="Selesai" />
            </div>
          </div>

          <div class="position-relative mt-4 mt-lg-0 w-100 w-lg-auto">
            <a href="#" class="btn btn-warning d-flex gap-3 align-items-center">
              <span>
                Tambah Ujian
              </span>
              <i class="fas fa-plus fs-5"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-5 mb-xxl-8 px-12">
      <Datatable :table-header="tableHeader" :table-data="tableData">
        <template v-slot:cell-no="{ row: data }">
          {{ data.no }}
        </template>
        <template v-slot:cell-kelas="{ row: data }">
          {{ data.kelas }}
        </template>
        <template v-slot:cell-mapel="{ row: data }">
          {{ data.mapel }}
        </template>
        <template v-slot:cell-guru="{ row: data }">
          {{ data.guru }}
        </template>
        <template v-slot:cell-judul_tugas="{ row: data }">
          {{ data.judul_tugas }}
        </template>
        <template v-slot:cell-mulai_selesai="{ row: data }">
          {{ data.mulai_selesai }}
        </template>
        <template v-slot:cell-status="{ row: data }">
          {{ data.status }}
        </template>
        <template v-slot:cell-action>
          <div>  
            <a
              href="#"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <span class="svg-icon svg-icon-3">
                <inline-svg
                  src="media/icons/duotune/general/gen019.svg"
                />
              </span>
            </a>

            <a
              href="#"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <span class="svg-icon svg-icon-3">
                <inline-svg src="media/icons/duotune/art/art005.svg" />
              </span>
            </a>

            <a
              href="#"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            >
              <span class="svg-icon svg-icon-3">
                <inline-svg
                  src="media/icons/duotune/general/gen027.svg"
                />
              </span>
            </a>
          </div>
        </template>
      </Datatable>
    </div>
  </div>
</template>