<script setup>
import { ref } from 'vue'

const tabs = ref({
	active: 'event',
	items: ['event', 'ujian']
})

const questionSources = ref ({
	active: 'buat-manual',
	list: [
		'buat-manual',
		'import-soal',
		'bank-soal'
	]
})

</script>

<template>
	<div class="pt-2">

		<!-- =========== Tabs Control Element =========== -->

		<ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap">
			<li
				class="nav-item"
				v-for="(tab, index) in tabs.items"
				:key="index">
				<a
					role="button"
					class="nav-link text-black-50 text-capitalize"
					:class="{'active text-active-primary': tab === tabs.active}"
					@click="tabs.active = tab">
					<span>{{ tab }}</span>
				</a>
			</li>
		</ul>

		<transition name="slide-fade">

			<!-- =========== Event Tab =========== -->

			<section v-if="tabs.active === 'event'">
				<div class="row gy-6 mt-4">
					<div class="col-3 fw-bold fs-4">Judul Ujian</div>
					<div class="col-9">
						<input
							type="text"
							class="form-control"
							placeholder="Isi judul ujian online" />
					</div>

					<div class="col-3 fw-bold fs-4">Kategori</div>
					<div class="col-9">
						<select class="form-control">
							<option value="">- Pilih kategori -</option>
						</select>
					</div>

					<div class="col-3 fw-bold fs-4">Guru</div>
					<div class="col-9">
						<select class="form-control">
							<option value="">- Pilih guru -</option>
						</select>
					</div>

					<div class="col-3 fw-bold fs-4">Mata Pelajaran</div>
					<div class="col-9">
						<select class="form-control">
							<option value="">- Pilih mata pelajaran -</option>
						</select>
					</div>

					<div class="col-3 fw-bold fs-4">Keterangan</div>
					<div class="col-9">
						<input
							type="text"
							class="form-control"
							placeholder="Isi keterangan ujian online" />
					</div>

					<div class="col-3 fw-bold fs-4">Skema Waktu Ujian</div>
					<div class="col-9">
						<select class="form-control">
							<option value="">- Pilih skema waktu ujian online -</option>
						</select>
					</div>

					<div class="col-3 fw-bold fs-4">Waktu Ujian</div>
					<div class="col-9 d-flex justify-content-between">
						<section class="d-flex align-items-center gap-3">
							<div class="fw-bold fs-5">Mulai</div>
							<input
								type="datetime-local"
								class="form-control flex-grow-1"
								onfocus="this.showPicker()" />
						</section>
						<section class="d-flex align-items-center gap-3">
							<div class="fw-bold fs-5">Selesai</div>
							<input
								type="datetime-local"
								class="form-control flex-grow-1"
								onfocus="this.showPicker()" />
						</section>
						<section class="d-flex align-items-center gap-3">
							<div class="fw-bold fs-5">Pengerjaan</div>
							<input
								type="number"
								class="form-control"
								placeholder="Dalam menit" />
						</section>
					</div>

					<div class="col-3 fw-bold fs-4">Kelas Peserta</div>
					<div class="col-9">
						<el-select
							multiple
							placeholder="Penetapan kelas peserta ujian online"
							class="w-100">
							<el-option
								v-for="n in 5"
								:label="'Kelas Test' + n"
								:value="n"
								:key="n" />
						</el-select>
					</div>

					<div class="col-3 fw-bold fs-4">Keluar Layar Ujian</div>
					<div class="col-3">
						<input
							type="number"
							class="form-control"
							placeholder="Berapa Kali" />
					</div>
					<div class="col-5 offset-1">
						<div class="h-100 d-flex align-items-center text-muted">
							Atur tampilan jawaban acak pada ujian online
						</div>
					</div>

					<div class="col-3 fw-bold fs-4">Token Ujian</div>
					<div class="col-1">
						<div class="form-check form-switch form-check-custom form-check-solid h-100 d-flex align-items-center">
							<input class="form-check-input" type="checkbox">
						</div>
					</div>
					<div class="col-2">
						<button class="btn btn-light w-100">PENGATURAN</button>
					</div>
					<div class="col-5 offset-1">
						<div class="h-100 d-flex align-items-center text-muted">
							Atur penggunaan token untuk memulai ujian online
						</div>
					</div>

					<div class="col-3 fw-bold fs-4">Share Social Media</div>
					<div class="col-9">
						<div class="form-check form-switch form-check-custom form-check-solid h-100 d-flex align-items-center">
							<input class="form-check-input" type="checkbox">
						</div>
					</div>

					<div class="col-3 offset-9">
						<button
							class="btn btn-primary btn-lg w-100"
							@click="tabs.active = 'ujian'">
							SELANJUTNYA
							<i class="fas fa-angle-double-right ms-2"></i>
						</button>
					</div>
				</div>
			</section>


			<!-- =========== Ujian Tab =========== -->

			<section v-else-if="tabs.active === 'ujian'">
				<div class="d-grid gap-10 mt-10">
					<div class="d-flex align-items-center pengaturan-ujian-item">
						<div class="w-40 fw-bold fs-4">Sumber Soal</div>
						<ul class="p-2 bg-light nav nav-pills rounded-3">
							<li
								class="nav-item"
								v-for="(source, index) in questionSources.list"
								:key="index">
								<button
									class="nav-link text-black fw-bold text-capitalize py-3 w-150px"
									:class="{'active text-white': questionSources.active === source}"
									@click="questionSources.active = source">
									{{ source.split('-').join(' ') }}
								</button>
							</li>
						</ul>
					</div>

					<div class="d-flex align-items-center pengaturan-ujian-item">
						<div class="w-40 fw-bold fs-4">Soal Acak</div>
						<div class="flex-grow-1 text-muted pengaturan-ujian-note">Atur tampilan soal secara acak pada perangkat siswa</div>
						<div class="form-check form-switch form-check-custom form-check-solid">
							<input class="form-check-input" type="checkbox">
						</div>
					</div>

					<div class="d-flex align-items-center pengaturan-ujian-item">
						<div class="w-40 fw-bold fs-4">Jawaban Acak</div>
						<div class="flex-grow-1 text-muted pengaturan-ujian-note">Atur tampilan jawaban secara acak pada perangkat siswa</div>
						<div class="form-check form-switch form-check-custom form-check-solid">
							<input class="form-check-input" type="checkbox">
						</div>
					</div>

					<div class="d-flex align-items-center pengaturan-ujian-item">
						<div class="w-40 fw-bold fs-4">Bobot Soal Otomatis</div>
						<div class="flex-grow-1 text-muted pengaturan-ujian-note">Atur bobot soal otomatis (nilai maks 100) atau manual</div>
						<div class="form-check form-switch form-check-custom form-check-solid">
							<input class="form-check-input" type="checkbox">
						</div>
					</div>

					<div class="d-flex align-items-center pengaturan-ujian-item">
						<div class="w-40 fw-bold fs-4">Ketentuan Skor Soal</div>
						<div class="flex-grow-1 text-muted pengaturan-ujian-note">Penetapan ketentuan skor per soal ujian online</div>
						<div class="form-check form-switch form-check-custom form-check-solid">
							<input class="form-check-input" type="checkbox">
						</div>
					</div>

					<div class="d-flex align-items-center pengaturan-ujian-item">
						<div class="w-40 fw-bold fs-4">Tampilkan Nilai Ujian</div>
						<div class="flex-grow-1 text-muted pengaturan-ujian-note">Atur tampilan nilai setelah ujian online selesai</div>
						<div class="form-check form-switch form-check-custom form-check-solid">
							<input class="form-check-input" type="checkbox">
						</div>
					</div>

					<div class="d-flex align-items-center pengaturan-ujian-item">
						<div class="w-40 fw-bold fs-4">Tampilkan Jawaban Soal</div>
						<div class="flex-grow-1 text-muted pengaturan-ujian-note">Atur tampilan hasil jawaban siswa dan jawaban benar setelah pengerjaan</div>
						<div class="form-check form-switch form-check-custom form-check-solid">
							<input class="form-check-input" type="checkbox">
						</div>
					</div>

					<div class="d-flex align-items-center pengaturan-ujian-item">
						<div class="w-40 fw-bold fs-4">Tampikan Peringkat</div>
						<div class="flex-grow-1 text-muted pengaturan-ujian-note">Atur tampilan peringkat pencapaian nilai peserta ujian</div>
						<div class="form-check form-switch form-check-custom form-check-solid">
							<input class="form-check-input" type="checkbox">
						</div>
					</div>

					<div class="d-flex align-items-center pengaturan-ujian-item">
						<div class="w-40 fw-bold fs-4">Tampilkan Kelulusan</div>
						<div class="flex-grow-1 text-muted pengaturan-ujian-note">Atur tampilan jawaban benar setelah ujian online selesai</div>
						<div class="form-check form-switch form-check-custom form-check-solid">
							<input class="form-check-input" type="checkbox">
						</div>
					</div>

					<div class="d-flex align-items-center pengaturan-ujian-item">
						<div class="w-40 fw-bold fs-4">Kartu Soal</div>
						<div class="flex-grow-1 text-muted pengaturan-ujian-note">Atur isi matriks penyusunan soal berdasarkan kisi-kisi soal</div>
						<div class="form-check form-switch form-check-custom form-check-solid">
							<input class="form-check-input" type="checkbox">
						</div>
					</div>

					<div class="d-flex align-items-center pengaturan-ujian-item">
						<div class="w-40 fw-bold fs-4">Status Ujian Online</div>
						<div class="flex-grow-1 text-muted pengaturan-ujian-note">Atur status pengaktifan ujian online</div>
						<div class="form-check form-switch form-check-custom form-check-solid">
							<input class="form-check-input" type="checkbox">
						</div>
					</div>

					<div class="row">
						<div class="col-3 offset-9">
							<router-link class="btn btn-primary btn-lg w-100" to="/lms/ujian-online/utama/form/soal-ujian">
								SELANJUTNYA
								<i class="fas fa-angle-double-right ms-2"></i>
							</router-link>
						</div>
					</div>
				</div>
			</section>
		</transition>
	</div>
</template>

<style scoped>
.w-40 {
	width: 40%;
}
/* .pengaturan-ujian-item .pengaturan-ujian-note {
	opacity: 0;
	transition: opacity 0.3s;
}
.pengaturan-ujian-item:hover .pengaturan-ujian-note {
	opacity: 1;
} */
</style>