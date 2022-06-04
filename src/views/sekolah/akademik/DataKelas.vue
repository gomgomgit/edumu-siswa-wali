<template>
  <!--begin::Head-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-5 pb-5">
      <!-- Page Header -->
      <div class="page-header border-bottom border-black-50 mb-3">
        <div class="page-title px-3 py-7 mb-6 d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center">
          <h3 class="mb-0 fs-2x">Akademik - Data Kelas</h3>
          
        <!-- begin::Tabs  -->
          <div class="d-flex w-100 gap-4 w-sm-auto justify-content-end">
            <router-link
              to="/sekolah/akademik/data-kelas/utama"
              active-class="active"
              class="btn btn-active-primary"
            >
              <span>Utama</span>
            </router-link>
            <router-link
              to="/sekolah/akademik/data-kelas/wali-kelas"
              active-class="active"
              class="btn btn-active-primary"
            >
              <span>Wali Kelas</span>
            </router-link>
            <router-link
              to="/sekolah/akademik/data-kelas/mutasi-kelas"
              active-class="active"
              class="btn btn-active-primary"
            >
              <span>Mutasi Kelas</span>
            </router-link>
          </div>
        </div>
        <div class="page-breadcrumb px-3 py-3 mb-6 d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center">
          <h3 class="mb-0 fs-4"><span class="text-black-50"> Sekolah / Akademik / </span>Data Kelas</h3>
        </div>
      </div>
      <!-- Page Content -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
  .el-input__inner {
    background: rgba(32, 139, 255, 0.5);
  }
  .el-input__inner::placeholder {
    color: #0084AD;
  }
  .el-input__suffix .icon {
    color: #0084AD;
  }
</style>