<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { request } from '@/util'
  import Modal from "@/components/modals/CustomModal.vue";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import { deleteConfirmation } from "@/core/helpers/deleteconfirmation";
  import ServerSideTable from '@/components/ServerSideTable.vue'
  import FilterSelect from '@/components/filter-select'
  import { Search } from '@element-plus/icons-vue'
  import QueryString from 'qs';
  import { useToast } from 'vue-toast-notification';
  import ChangePassword from "@/components/change-password/Index.vue";
import moment from "moment";
import { useStore } from "vuex";

  onMounted(() => {
    setCurrentPageBreadcrumbs("Kalender", ["Sekolah"]);
    getData()
  })
  
  const todoData = ref()
  const eventData = ref()
  const scheduleData = ref()
  const academicData = ref()

  const date = ref(moment().format('YYYY-MM-DD'))
  
  const store = useStore()
  const currentUser = store.getters.currentUser;
  
  function getData () {
    getTodo()
    getEvent()
    getSchedule()
    getAcademic()
  }

  function getTodo() {
    request.post('calendar/todo', QueryString.stringify({
      type_date: "week",
      date: date.value,
      user_id: currentUser.siswa_id
    })).then(res => {
      todoData.value = res.data.data
    })
  }
  function getEvent() {
    request.post('calendar/event', QueryString.stringify({
      type_date: "week",
      date: date.value,
    })).then(res => {
      eventData.value = res.data.data
    })
  }
  function getSchedule() {
    request.post('calendar/schedule', QueryString.stringify({
      type_date: "week",
      date: date.value,
      siswa_id: currentUser.siswa_id
    })).then(res => {
      scheduleData.value = res.data.data
    })
  }
  function getAcademic() {
    request.post('calendar/academic', QueryString.stringify({
      type_date: "week",
      date: date.value,
    })).then(res => {
      academicData.value = res.data.data
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
              <h2 class="fs-1 fw-bold py-2">Kalender</h2>
            </div>
            <div class="position-relative d-flex gap-4">
              <el-date-picker
                v-model="date"
                type="date"
                placeholder="Tanggal"
                size="large"
                value-format="YYYY-MM-DD"
                @change="getData"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="card mb-5 mb-xxl-8">
          <div class="card-body py-6">
            <div>
              <div class="d-flex flex-wrap justify-content-between align-items-center">
                <div class="d-flex gap-4">
                  <h2 class="fs-2 fw-bold">Todo</h2>
                </div>
              </div>                   
            </div>
            <div class="separator border-black-50 border-2"></div>
            <div class="my-5 mb-xxl-8">
              <template v-for="todo in todoData?.calendars" :key="todo.calendar_id">
                <div class="mb-8 d-flex align-items-center gap-6">
                  <span class="bullet bullet-vertical h-40px bg-info"></span>
                  <!-- <div class="form-check form-check-custom form-check-solid mx-5">
                    <span class="btn btn-icon btn-bg-light btn-active-color-info btn-sm me-2">
                      <span class="svg-icon svg-icon-3">
                        <i class="bi bi-eye-fill fs-3"></i>
                      </span>
                    </span>
                  </div> -->
                  <div class="flex-grow-1">
                    <a href="#" class="text-gray-800 text-hover-primary fw-bold fs-6">{{todoData?.isOff ? todo.libur_desc : todo.calendar_title}}</a>
                    <span class="text-muted fw-semobold d-block">{{todoData?.isOff ? todo.kelas_nama : todo.calendar_desc}}</span>
                  </div>
                  <span class="badge fs-8 fw-bold badge-light-info">{{todoData?.isOff ? todo.libur_tanggal : todo.calendar_date}}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card mb-5 mb-xxl-8">
          <div class="card-body py-6">
            <div>
              <div class="d-flex flex-wrap justify-content-between align-items-center">
                <div class="d-flex gap-4">
                  <h2 class="fs-2 fw-bold">Event</h2>
                </div>
              </div>                   
            </div>
            <div class="separator border-black-50 border-2"></div>
            <div class="my-5 mb-xxl-8">
              <template v-for="event in eventData?.calendars" :key="event.calendar_id">
                <div class="mb-8 d-flex align-items-center gap-6">
                  <span class="bullet bullet-vertical h-40px bg-success"></span>
                  <!-- <div class="form-check form-check-custom form-check-solid mx-5">
                    <span class="btn btn-icon btn-bg-light btn-active-color-success btn-sm me-2">
                      <span class="svg-icon svg-icon-3">
                        <i class="bi bi-eye-fill fs-3"></i>
                      </span>
                    </span>
                  </div> -->
                  <div class="flex-grow-1">
                    <a href="#" class="text-gray-800 text-hover-primary fw-bold fs-6">{{eventData?.isOff ? event.libur_desc : event.calendar_title}}</a>
                    <span class="text-muted fw-semobold d-block">{{eventData?.isOff ? event.kelas_nama : event.calendar_desc}}</span>
                  </div>
                  <span class="badge fs-8 fw-bold badge-light-primary">{{eventData?.isOff ? event.libur_tanggal : event.calendar_time_start}}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card mb-5 mb-xxl-8">
          <div class="card-body py-6">
            <div>
              <div class="d-flex flex-wrap justify-content-between align-items-center">
                <div class="d-flex gap-4">
                  <h2 class="fs-2 fw-bold">Jadwal</h2>
                </div>
              </div>                   
            </div>
            <div class="separator border-black-50 border-2"></div>
            <div class="my-5 mb-xxl-8">
              <template v-for="schedule in scheduleData?.calendars" :key="schedule.calendar_id">
                <div class="mb-8 d-flex align-items-center gap-6">
                  <span class="bullet bullet-vertical h-40px bg-primary"></span>
                  <!-- <div class="form-check form-check-custom form-check-solid mx-5">
                    <span class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2">
                      <span class="svg-icon svg-icon-3">
                        <i class="bi bi-eye-fill fs-3"></i>
                      </span>
                    </span>
                  </div> -->
                  <div class="flex-grow-1">
                    <a href="#" class="text-gray-800 text-hover-primary fw-bold fs-6">{{scheduleData?.isOff ? schedule.libur_desc : schedule.calendar_title}}</a>
                    <span class="text-muted fw-semobold d-block">{{scheduleData?.isOff ? schedule.kelas_nama : schedule.calendar_desc}}</span>
                  </div>
                  <span class="badge fs-8 fw-bold badge-light-primary">{{scheduleData?.isOff ? schedule.libur_tanggal : schedule.calendar_time_start + ' - ' + schedule.calendar_time_end}}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card mb-5 mb-xxl-8">
          <div class="card-body py-6">
            <div>
              <div class="d-flex flex-wrap justify-content-between align-items-center">
                <div class="d-flex gap-4">
                  <h2 class="fs-2 fw-bold">Akademik</h2>
                </div>
              </div>                   
            </div>
            <div class="separator border-black-50 border-2"></div>
            <div class="my-5 mb-xxl-8">
              <template v-for="academic in academicData?.calendars" :key="academic.calendar_id">
                <div class="mb-8 d-flex align-items-center gap-6">
                  <span class="bullet bullet-vertical h-40px bg-warning"></span>
                  <!-- <div class="form-check form-check-custom form-check-solid mx-5">
                    <span class="btn btn-icon btn-bg-light btn-active-color-warning btn-sm me-2">
                      <span class="svg-icon svg-icon-3">
                        <i class="bi bi-eye-fill fs-3"></i>
                      </span>
                    </span>
                  </div> -->
                  <div class="flex-grow-1">
                    <a href="#" class="text-gray-800 text-hover-primary fw-bold fs-6">{{academicData?.isOff ? academic.libur_desc : academic.calendar_title}}</a>
                    <span class="text-muted fw-semobold d-block">{{academicData?.isOff ? academic.kelas_nama : academic.calendar_desc}}</span>
                  </div>
                  <span class="badge fs-8 fw-bold badge-light-primary">{{academicData?.isOff ? academic.libur_tanggal : academic.calendar_time_start}}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>