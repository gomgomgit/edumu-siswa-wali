import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import JwtService from "@/core/services/JwtService";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "/ujian-online",
        name: "ujian-online",
        component: () => import("@/views/pages/ujian-online/UjianOnline.vue"),
        children: [
          {
            path: "",
            redirect: "/ujian-online/peserta-ujian",
          },
          {
            path: "peserta-ujian",
            name: "ujian-online-peserta-ujian",
            component: () =>
              import("@/views/pages/ujian-online/tabs/peserta-ujian.vue"),
          },
          {
            path: "pantau-ujian",
            name: "ujian-online-pantau-ujian",
            component: () =>
              import("@/views/pages/ujian-online/tabs/pantau-ujian.vue"),
          },
          {
            path: "kategori",
            name: "ujian-online-kategori",
            component: () =>
              import("@/views/pages/ujian-online/tabs/kategori.vue"),
          },
        ]
      },

      {
        path: "/sekolah/profil-pengguna/siswa",
        name: "sekolah-profil-pengguna-siswa",
        component: () => import("@/views/sekolah/profil-pengguna/siswa/Index.vue"),
      },
      {
        path: "/sekolah/profil-pengguna/siswa/tambah-data",
        name: "sekolah-profil-pengguna-siswa-tambah",
        component: () => import("@/views/sekolah/profil-pengguna/siswa/Tambah.vue"),
      },
      {
        path: "/sekolah/profil-pengguna/siswa/edit-data/:id",
        name: "sekolah-profil-pengguna-siswa-edit",
        component: () => import("@/views/sekolah/profil-pengguna/siswa/Edit.vue"),
      },
      {
        path: "/sekolah/profil-pengguna/wali",
        name: "sekolah-profil-pengguna-wali",
        component: () => import("@/views/sekolah/profil-pengguna/wali/Index.vue"),
      },
      {
        path: "/sekolah/profil-pengguna/wali/tambah-data",
        name: "sekolah-profil-pengguna-wali-tambah",
        component: () => import("@/views/sekolah/profil-pengguna/wali/Tambah.vue"),
      },
      {
        path: "/sekolah/profil-pengguna/wali/edit-data/:id",
        name: "sekolah-profil-pengguna-wali-edit",
        component: () => import("@/views/sekolah/profil-pengguna/wali/Edit.vue"),
      },
      {
        path: "/sekolah/profil-pengguna/guru",
        name: "sekolah-profil-pengguna-guru",
        component: () => import("@/views/sekolah/profil-pengguna/guru/Index.vue"),
      },
      {
        path: "/sekolah/profil-pengguna/guru/tambah-data",
        name: "sekolah-profil-pengguna-guru-tambah",
        component: () => import("@/views/sekolah/profil-pengguna/guru/Tambah.vue"),
      },
      {
        path: "/sekolah/profil-pengguna/guru/edit-data/:id",
        name: "sekolah-profil-pengguna-guru-edit",
        component: () => import("@/views/sekolah/profil-pengguna/guru/Edit.vue"),
      },
      {
        path: "/sekolah/akademik/tahun-ajar",
        name: "sekolah-akademik-tahun-ajar",
        component: () => import("@/views/sekolah/akademik/tahun-ajar/Index.vue"),
      },
      {
        path: "/sekolah/akademik/data-kelas",
        name: "sekolah-akademik-data-kelas",
        component: () => import("@/views/sekolah/akademik/data-kelas/Index.vue"),
        children: [
          {
            path: "",
            redirect: "/sekolah/akademik/data-kelas/utama",
          },
          {
            path: "utama",
            name: "sekolah-akademik-data-kelas-utama",
            component: () =>
              import("@/views/sekolah/akademik/data-kelas/tabs/Utama.vue"),
          },
          {
            path: "wali-kelas",
            name: "sekolah-akademik-data-kelas-wali-kelas",
            component: () =>
              import("@/views/sekolah/akademik/data-kelas/tabs/WaliKelas.vue"),
          },
          {
            path: "mutasi-kelas",
            name: "sekolah-akademik-data-kelas-mutasi-kelas",
            component: () =>
              import("@/views/sekolah/akademik/data-kelas/tabs/MutasiKelas.vue"),
          },
        ],
      },
      {
        path: "/sekolah/akademik/kalender-akademik",
        name: "sekolah-akademik-kalender-akademik",
        component: () => import("@/views/sekolah/akademik/KalenderAkademik.vue"),
      },
      {
        path: "/sekolah/mata-pelajaran",
        name: "sekolah-mata-pelajaran",
        component: () => import("@/views/sekolah/mata-pelajaran/Index.vue"),
        children: [
          {
            path: "",
            redirect: "/sekolah/mata-pelajaran/data-mapel"
          },
          {
            path: "data-mapel",
            name: "sekolah-mata-pelajaran-data-mapel",
            component: () => import("@/views/sekolah/mata-pelajaran/data-mapel/Index.vue")
          },
          {
            path: "jadwal-pelajaran",
            name: "sekolah-mata-pelajaran-jadwal-pelajaran",
            component: () => import("@/views/sekolah/mata-pelajaran/jadwal-pelajaran/Index.vue")
          },
        ],
      },
      {
        path: "/sekolah/informasi/pengumuman",
        name: "sekolah-informasi-pengumuman",
        component: () => import("@/views/sekolah/informasi/pengumuman/Index.vue"),
      },
      {
        path: "/sekolah/informasi/pengumuman/tambah",
        name: "sekolah-informasi-pengumuman-tambah",
        component: () => import("@/views/sekolah/informasi/pengumuman/Tambah.vue"),
      },
      {
        path: "/sekolah/informasi/pengumuman/edit/:id",
        name: "sekolah-informasi-pengumuman-edit",
        component: () => import("@/views/sekolah/informasi/pengumuman/Edit.vue"),
      },
      {
        path: "/sekolah/informasi/prestasi",
        name: "sekolah-informasi-prestasi",
        component: () => import("@/views/sekolah/informasi/prestasi/Index.vue"),
      },
      {
        path: "/sekolah/informasi/prestasi/tambah",
        name: "sekolah-informasi-prestasi-tambah",
        component: () => import("@/views/sekolah/informasi/prestasi/Tambah.vue"),
      },
      {
        path: "/sekolah/informasi/prestasi/edit/:id",
        name: "sekolah-informasi-prestasi-edit",
        component: () => import("@/views/sekolah/informasi/prestasi/Edit.vue"),
      },
      {
        path: "/sekolah/informasi/berita",
        name: "sekolah-informasi-berita",
        component: () => import("@/views/sekolah/informasi/berita/Index.vue"),
        children: [
          {
            path: "",
            redirect: "/sekolah/informasi/berita/utama",
          },
          {
            path: "utama",
            name: "sekolah-informasi-berita-utama",
            component: () =>
              import("@/views/sekolah/informasi/berita/tabs/Utama.vue"),
          },
          {
            path: "kategori",
            name: "sekolah-informasi-berita-kategori",
            component: () =>
              import("@/views/sekolah/informasi/berita/tabs/Kategori.vue"),
          },
        ],
      },
      {
        path: "/sekolah/informasi/berita/tambah",
        name: "sekolah-informasi-berita-tambah",
        component: () => import("@/views/sekolah/informasi/berita/Tambah.vue"),
      },
      {
        path: "/sekolah/informasi/berita/edit/:id",
        name: "sekolah-informasi-berita-edit",
        component: () => import("@/views/sekolah/informasi/berita/Edit.vue"),
      },
      {
        path: "/sekolah/media",
        name: "sekolah-media",
        component: () => import("@/views/sekolah/media/Index.vue"),
      },
      {
        path: "/sekolah/media/album/:id",
        name: "sekolah-media-album",
        component: () => import("@/views/sekolah/media/Album.vue"),
      },
      {
        path: "/pengaturan/umum",
        name: "pengaturan-umum",
        component: () => import("@/views/pengaturan/umum/Index.vue"),
      },
      {
        path: "/pengaturan/pengguna",
        name: "pengaturan-pengguna",
        component: () => import("@/views/pengaturan/pengguna/Index.vue"),
      },
      {
        path: "/prototype/api-testing",
        name: "prototype-api-testing",
        component: () => import("@/views/prototype/ApiTesting.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/components/page-layouts/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      },
    ],
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/crafted/authentication/Error404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((from, to) => {
  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);

  // store.dispatch(Actions.VERIFY_AUTH, { api_token: JwtService.getToken() });
  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
