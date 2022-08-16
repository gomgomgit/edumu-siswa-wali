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
      todoData.value = res.data.data.calendars
    })
  }
  function getEvent() {
    request.post('calendar/event', QueryString.stringify({
      type_date: "week",
      date: date.value,
    })).then(res => {
      eventData.value = res.data.data.calendars
    })
  }
  function getSchedule() {
    request.post('calendar/schedule', QueryString.stringify({
      type_date: "week",
      date: date.value,
      siswa_id: currentUser.siswa_id
    })).then(res => {
      scheduleData.value = res.data.data.calendars
    })
  }
  function getAcademic() {
    request.post('calendar/academic', QueryString.stringify({
      type_date: "week",
      date: date.value,
    })).then(res => {
      academicData.value = res.data.data.calendars
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
              <template v-for="todo in todoData" :key="todo.calendar_id">
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
                    <a href="#" class="text-gray-800 text-hover-primary fw-bold fs-6">{{todo.calendar_title}}</a>
                    <span class="text-muted fw-semobold d-block">{{todo.calendar_desc}}</span>
                  </div>
                  <span class="badge fs-8 fw-bold badge-light-info">{{todo.calendar_date}}</span>
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
              <template v-for="event in eventData" :key="event.calendar_id">
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
                    <a href="#" class="text-gray-800 text-hover-primary fw-bold fs-6">{{event.calendar_title}}</a>
                    <span class="text-muted fw-semobold d-block">{{event.calendar_desc}}</span>
                  </div>
                  <span class="badge fs-8 fw-bold badge-light-success">{{event.calendar_date}}</span>
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
              <template v-for="schedule in scheduleData" :key="schedule.calendar_id">
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
                    <a href="#" class="text-gray-800 text-hover-primary fw-bold fs-6">{{schedule.calendar_title}}</a>
                    <span class="text-muted fw-semobold d-block">{{schedule.calendar_desc}}</span>
                  </div>
                  <span class="badge fs-8 fw-bold badge-light-primary">{{schedule.calendar_time_start}} - {{schedule.calendar_time_end}}</span>
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
              <template v-for="academic in academicData" :key="academic.calendar_id">
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
                    <a href="#" class="text-gray-800 text-hover-primary fw-bold fs-6">{{academic.calendar_title}}</a>
                    <span class="text-muted fw-semobold d-block">{{academic.calendar_desc}}</span>
                  </div>
                  <span class="badge fs-8 fw-bold badge-light-warning">{{academic.calendar_date}}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>