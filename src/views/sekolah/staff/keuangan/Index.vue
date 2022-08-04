<script setup>
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb'
import ServerSideTable from '@/components/ServerSideTable.vue'
import { onMounted, reactive, ref } from 'vue';
import { request } from '@/util';
import { useToast } from 'vue-toast-notification';
import { deleteConfirmation } from '@/core/helpers/deleteconfirmation';


onMounted(() => {
	setCurrentPageBreadcrumbs('TU/Keuangan', ['Sekolah', 'Staff'])
})

const userData = reactive({
	columns: [
		{ label: 'Foto', field: 'user_foto', sortable: false },
		{ label: 'Nama', field: 'user_nama', sortable: false },
		{ label: 'Level', field: 'user_level', sortable: false },
	],
	rows: [],
	totalRows: 0
})

function getUser(payload) {
	request.post('staff/list', null, {
		params: {
			page: payload?.page ?? 1,
      level: "keuangan"
		}
	}).then(res => {
    userData.rows = res.data.data.users
    userData.totalRows = res.data.data.users.total
	}).catch(err => {
      useToast().error(err.data.text)
  })
}
</script>

<template>
	<div class="card mb-5 mb-xxl-8">
		<div class="card-body pt-5 pb-5">

			<!-- Page Content -->
			<div class="page-content">
				<div class="d-flex flex-wrap justify-content-between align-items-center">
					<div class="d-flex gap-4">
						<h2 class="fs-1 fw-bold py-6 m-0">TU/Keuangan</h2>
					</div>
				</div>
				<div class="separator border-black-50 border-2 my-3"></div>
			</div>
		</div>
		<div class="mb-5 mb-xxl-8 px-12">
			<ServerSideTable
				ref="tableRef"
				:totalRows="userData.totalRows || 0"
				:columns="userData.columns"
				:rows="userData.rows"
				@loadItems="getUser()"
			>
        <template #table-row="{column, row}">
          <div v-if="column.field == 'user_foto'">
            <div class="bg-secondary p-2 d-inline-block">
              <img :src="row.user_foto" alt="" style="max-height: 80px">
            </div>
          </div>
        </template>
			</ServerSideTable>
		</div>
	</div>
</template>