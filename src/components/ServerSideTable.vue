<script setup>
import { ref, onMounted } from 'vue'
import { VueGoodTable } from 'vue-good-table-next'

import 'vue-good-table-next/dist/vue-good-table-next.css'

const props = defineProps({
	columns: { type: Array, required: true },
	rows: { type: Array, required: true },
	totalRows: { type: Number, required: true }
})

const emit = defineEmits(['loadItems'])

const serverParams = ref({
	columnFilters: {},
	sort: {
		field: '',
		type: '',
	},
	page: 0,
	perPage: 10
})

onMounted(loadItems)

function updateParams(newProps) {
	serverParams.value = Object.assign({}, serverParams.value, newProps)
}
function loadItems() {
	emit('loadItems', serverParams.value)
}
function onPageChange(params) {
	updateParams({ page: params.currentPage - 1 })
	loadItems()
}
function onPerPageChange(params) {
	updateParams({ perPage: params.currentPerPage })
	loadItems()
}
function onSortChange(params) {
	updateParams({
		sort: params[0],
	})
	loadItems()
}
function onColumnFilter(params) {
	updateParams(params)
	loadItems()
}
</script>

<template>
	<vue-good-table
		id="ss-table"
		styleClass="vgt-table"
		mode="remote"
		:totalRows="props.totalRows"
		:pagination-options="{ enabled: true }"
		:sort-options="{ enabled: true }"
		:rows="props.rows"
		:columns="props.columns"
		@page-change="onPageChange"
		@sort-change="onSortChange"
		@column-filter="onColumnFilter"
		@per-page-change="onPerPageChange"
	>
		<template #table-row="tableRowProps">
			<slot name="table-row" v-bind="tableRowProps"></slot>
		</template>
	</vue-good-table>
</template>

<style>
.vgt-wrap__footer {
	background: none;
	border: none;
}
.vgt-inner-wrap {
	border-radius: 0;
	box-shadow: none;
}
table.vgt-table {
	border: none;
}
.vgt-table thead th {
	background: #F5F8FA;
	border-bottom: none;
	color: #A1ABC0;
	font-weight: 600;
	font-size: 1rem;
}
.vgt-table thead th:first-child {
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
}
.vgt-table thead th:last-child {
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
}
#ss-table table.vgt-table :where(td, th) {
	padding: 1.75rem;
}
table.vgt-table td {
	border-bottom: 1px dashed #A1ABC055;
	font-size: 1.15rem;
}
.vgt-table th.sortable button:before {
	border-top: 5px solid #A1ABC0;
	right: 1rem;
}
.vgt-table th.sortable button:after {
	border-bottom: 5px solid #A1ABC0;
	right: 1rem;
}
</style>