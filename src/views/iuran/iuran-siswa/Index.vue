<script setup>
import { reactive, onMounted, ref } from 'vue'
import { request } from '@/util'
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';

import ServerSideTable from '@/components/ServerSideTable.vue'
import FilterSelect from '@/components/filter-select/index.vue'
import { deleteConfirmation } from '@/core/helpers/deleteconfirmation';
import { useToast } from 'vue-toast-notification';
import { Search } from '@element-plus/icons-vue'

import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, Plugin } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const userId = 255
const tableRef = ref()
const formMode = ref('')

const kelasData = ref([])
const tahunAjarData = ref([])
const tipeData = ref([])

const kelasFilter = ref('')
const tipeFilter = ref('')
const searchFilter = ref('')
const periodeFilter = ref('')

const transaksiData = reactive({
	columns: [
		{ label: 'Jenis Iuran', field: 'tipe_nama', sortable: false },
		{ label: 'Deskripsi', field: 'tipe_desc', sortable: false },
		{ label: 'ACTION', field: 'action', sortable: false, width: '200px' },
	],
	rows: [],
	totalRows: 0,
})


const chartData = {
	labels: [
		'Lunas',
		'Belum Lunas',
	],
	datasets: [{
			backgroundColor: ['#6464FF', '#FF5C5C'],
			data: [10, 20]
	}],
}
const chartOptions = {
	responsive: true,
	borderRadius: 6,
	borderWidth: 6,       
	cutout: 140,
	plugins: {
		legend: {
			display: false,
		},
    centerText: {
        display: true,
        text: "280"
    }
	},
}
const plugins = [{
     beforeDraw: function(chart) {
			var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;

      ctx.restore();
      var fontSize = (height / 134).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";

			let text = ['Total', '140.000.00']
			let	text0X = Math.round((width - ctx.measureText(text[0]).width) / 2)
			let	text0Y = (height / 2) - 45
			let	text1X = Math.round((width - ctx.measureText(text[1]).width) / 2)
			let	text1Y = (height / 2) + 25

      ctx.fillText(text[0], text0X, text0Y);
      ctx.fillText(text[1], text1X, text1Y);
      ctx.save();
     } 
   }]

function getData() {
	request.post('kelas')
	.then(res => {
		kelasData.value = res.data.data
	})
	request.post('thn_ajar')
	.then(res => {
		tahunAjarData.value = res.data.data
	})
	request.get('iuran/tipe')
	.then(res => {
		tipeData.value = res.data.data
	})
}

function getTransaksi (payload) {
	// request.get('siswa/transaksi', {
	// 	params: {
	// 		user_nama: searchFilter.value,
	// 		jenis: '',
	// 		tahun: '',
	// 		id: userId,
	// 		page: payload?.page ?? 1,
	// 		sortby: payload?.sort?.type
	// 	}
	// }).then(res => {
	// 	transaksiData.rows = res.data.data
	// 	transaksiData.totalRows = res.data.total
	// })
}

onMounted(() => {
	setCurrentPageBreadcrumbs("Iuran Siswa", ['Iuran']);
	getData()
})
</script>

<template>
	<div>
		<div class="card mb-5 mb-xxl-8">
			<div class="card-body">
        <div class="page-content">
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="d-flex gap-4">
              <h2 class="fs-1 fw-bold py-6 m-0">Data Iuran Siswa</h2>

              <!-- <div>
                <FilterSelect v-model:filterValue="semesterFilter" :options="semesterOption" @changeFilter="changeFilter('semester')" placeholder="Pilih Semester" />
              </div>
              <div>
                <FilterSelect v-model:filterValue="statusFilter" :options="statusOption" @changeFilter="changeFilter('status')" placeholder="Pilih Status" />
              </div> -->
            </div>
					</div>
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="d-flex gap-4">
              <div>
                <FilterSelect v-model:filterValue="kelasFilter" @changeFilter="changeFilter('kelas')" placeholder="Pilih Kelas">
									<el-option v-for="kelas in kelasData" :value="kelas.kelas_id" :label="kelas.kelas_nama"></el-option>
								</FilterSelect>
              </div>
              <div>
                <FilterSelect v-model:filterValue="tahunAjarFilter" @changeFilter="changeFilter('tahun_ajar')" placeholder="Pilih Tahun Ajar">
									<el-option v-for="tahun in tahunAjarData" :value="tahun.thn_ajar_id" :label="tahun.thn_ajar_value"></el-option>
								</FilterSelect>
              </div>
              <div>
                <FilterSelect v-model:filterValue="tipeFilter" @changeFilter="changeFilter('tipe')" placeholder="Pilih Jenis">
									<el-option v-for="tipe in tipeData" :value="tipe.tipe_id" :label="tipe.tipe_nama"></el-option>
								</FilterSelect>
              </div>
            </div>
						
            <div class="d-flex w-100 w-lg-50 w-xl-25 gap-4">
                <el-input
                  v-model="searchSiswa"
                  clearable
                  class="m-2"
                  placeholder="Cari Siswa"
                >
                  <template #append>
                    <el-button aria-disabled="true" class="pe-none" :icon="Search" />
                  </template>
                </el-input>
            </div>
					</div>
          <div class="d-flex flex-wrap justify-content-between align-items-center my-7 ">
            <div class="d-flex gap-4">
              <div>
                <div class="block">
									<el-date-picker
										v-model="periodeFilter"
										type="daterange"
										start-placeholder="Start date"
										end-placeholder="End date"
										:default-time="defaultTime"
									/>
								</div>
              </div>
            </div>
						
            <div class="d-flex align-items-center">
							<a class="btn btn-primary d-flex gap-3 align-items-center w-auto">
								<span>
									Siswa Absen GPS
								</span>
								<i class="bi bi-printer-fill fs-2"></i>
							</a>
						</div>
					</div>
					<div class="pt-7 my-7">
						<div class="row align-items-center">
							<div class="col-12 col-lg-7">
								<div class="mw-500px m-auto">
									<Doughnut
										:chart-options="chartOptions"
										:chart-data="chartData"
										:chart-id="chartId"
										:dataset-id-key="datasetIdKey"
										:plugins="plugins"
										:css-classes="cssClasses"
										:styles="styles"
									/>
								</div>
							</div>
							<div class="col-5">
								<h2 class="fs-2">Keterangan</h2>
								<div class="d-flex align-items-center mt-3 gap-3">
									<span class="keterangan-block blue"></span> <span class="fs-4 fw-bold">Lunas</span>
								</div>
								<div class="d-flex align-items-center mt-3 gap-3">
									<span class="keterangan-block red"></span> <span class="fs-4 fw-bold">Belum Lunas</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card mb-5 mb-xxl-8">
			<div class="card-body">
        <div class="page-content">
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="d-flex gap-4">
              <h2 class="fs-1 fw-bold py-6 m-0">Iuran</h2>

              <!-- <div>
                <FilterSelect v-model:filterValue="semesterFilter" :options="semesterOption" @changeFilter="changeFilter('semester')" placeholder="Pilih Semester" />
              </div>
              <div>
                <FilterSelect v-model:filterValue="statusFilter" :options="statusOption" @changeFilter="changeFilter('status')" placeholder="Pilih Status" />
              </div> -->
            </div>

            <div class="position-relative d-flex ">
              <a @click="formMode = 'Tambah Data'" class="btn btn-primary d-flex gap-3 align-items-center w-auto">
                <i class="bi bi-plus fs-1"></i>
                <span>
                  Tambah Jenis Iuran
                </span>
              </a>
            </div>
          </div>
          <div class="separator border-black-50 border-2 my-3"></div>
        </div>
				<ServerSideTable
					ref="tableRef"
					:totalRows="transaksiData.totalRows || 0"
					:columns="transaksiData.columns"
					:rows="transaksiData.rows"
					@loadItems="getTransaksi">
					<template #table-row="{column, row}">
						<div v-if="column.field == 'mapel_status'">
							<span :class="'badge badge-light-' + (row.mapel_status == 1 ? 'success' : 'danger')">
								{{row.mapel_status == 1 ? 'Aktif' : 'Non Aktif'}}
							</span>
						</div>
						<div v-if="column.field == 'action'">
							<button
								class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2"
								@click="handleEdit(row)">
								<span class="svg-icon svg-icon-3">
									<inline-svg src="media/icons/duotune/art/art005.svg" />
								</span>
							</button>
							<button @click="deleteData(row.tipe_id)" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
								<span class="svg-icon svg-icon-3">
									<inline-svg src="media/icons/duotune/general/gen027.svg"/>
								</span>
							</button>
						</div>
					</template>
				</ServerSideTable>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.keterangan-block {
	width: 75px;
	height: 28px;

	/* belum lunas */
	display: inline-block;
	border-radius: 20px;

	/* Inside auto layout */
	flex: none;
	order: 0;
	flex-grow: 0;
	&.red{
		background: #FF5C5C;
	}
	&.blue{
		background: #6464FF;
	}
}
</style>