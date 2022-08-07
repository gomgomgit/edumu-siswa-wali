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
        path: "/lms/ujian-online",
        name: "lms-ujian-online",
        component: () => import("@/views/lms/ujian-online/Index.vue"),
        children: [
          {
            path: "",
            redirect: "/lms/ujian-online/ujian",
          },
          {
            path: "ujian",
            name: "lms-ujian-online-ujian",
            component: () =>
              import("@/views/lms/ujian-online/tabs/Ujian.vue"),
          },
          {
            path: "tugas",
            name: "lms-ujian-online-tugas",
            component: () =>
              import("@/views/lms/ujian-online/tabs/Tugas.vue"),
          },
        ]
      },
      {
        path: "/lms/ujian-online/detail/:id",
        name: "lms-ujian-online-detail",
        component: () => import("@/views/lms/ujian-online/Detail.vue"),
      },
      {
        path: "/lms/ujian-online/soal/:id",
        name: "lms-ujian-online-soal",
        component: () => import("@/views/lms/ujian-online/Soal.vue"),
      },
      {
        path: "/lms/ujian-online/Result/:id",
        name: "lms-ujian-online-Result",
        component: () => import("@/views/lms/ujian-online/Result.vue"),
      },
      
      {
        path: "/lms/tugas",
        name: "lms-tugas",
        component: () => import("@/views/lms/tugas/Index.vue"),
      },
      {
        path: "/lms/tugas/detail/:id",
        name: "lms-tugas-detail",
        component: () => import("@/views/lms/tugas/Detail.vue"),
      },
      {
        path: "/lms/materi",
        name: "lms-materi",
        component: () => import("@/views/lms/materi/Index.vue"),
      },

      //Sekolah
      {
        path: "/sekolah/todo",
        name: "sekolah-todo",
        component: () => import("@/views/sekolah/todo/Index.vue"),
      },
      {
        path: "/sekolah/kalender",
        name: "sekolah-kalender",
        component: () => import("@/views/sekolah/kalender/Index.vue"),
      },
      {
        path: "/sekolah/kelas",
        name: "sekolah-kelas",
        component: () => import("@/views/sekolah/kelas/Index.vue"),
        children: [
          {
            path: "",
            redirect: "/sekolah/kelas/hari-ini",
          },
          {
            path: "hari-ini",
            name: "sekolah-kelas-hari-ini",
            component: () =>
              import("@/views/sekolah/kelas/tabs/Today.vue"),
          },
          {
            path: "mingguan",
            name: "sekolah-kelas-mingguan",
            component: () =>
              import("@/views/sekolah/kelas/tabs/Weekly.vue"),
          },
          {
            path: "kursus",
            name: "sekolah-kelas-kursus",
            component: () =>
              import("@/views/sekolah/kelas/tabs/Course.vue"),
          },
        ]
      },
      {
        path: "/sekolah/informasi/pengumuman",
        name: "sekolah-informasi-pengumuman",
        component: () => import("@/views/sekolah/informasi/pengumuman/Index.vue"),
      },
      {
        path: "/sekolah/informasi/pengumuman/detail/:id",
        name: "sekolah-informasi-pengumuman-detail",
        component: () => import("@/views/sekolah/informasi/pengumuman/Detail.vue"),
      },
      {
        path: "/sekolah/informasi/prestasi",
        name: "sekolah-informasi-prestasi",
        component: () => import("@/views/sekolah/informasi/prestasi/Index.vue"),
      },
      {
        path: "/sekolah/informasi/prestasi/detail/:id",
        name: "sekolah-informasi-prestasi-detail",
        component: () => import("@/views/sekolah/informasi/prestasi/Detail.vue"),
      },
      {
        path: "/sekolah/informasi/event",
        name: "sekolah-informasi-event",
        component: () => import("@/views/sekolah/informasi/event/Index.vue"),
      },
      {
        path: "/sekolah/informasi/event/detail/:id",
        name: "sekolah-informasi-event-detail",
        component: () => import("@/views/sekolah/informasi/event/Detail.vue"),
      },
      {
        path: "/sekolah/informasi/aktifitas",
        name: "sekolah-informasi-aktifitas",
        component: () => import("@/views/sekolah/informasi/aktifitas/Index.vue"),
        children: [
          {
            path: "",
            redirect: "/sekolah/informasi/aktifitas/informasi",
          },
          {
            path: "informasi",
            name: "sekolah-informasi-aktifitas-informasi",
            component: () =>
              import("@/views/sekolah/informasi/aktifitas/tabs/Informasi.vue"),
          },
          {
            path: "pembelajaran",
            name: "sekolah-informasi-aktifitas-pembelajaran",
            component: () =>
              import("@/views/sekolah/informasi/aktifitas/tabs/Pembelajaran.vue"),
          },
        ]
      },
      {
        path: "/sekolah/staff/guru",
        name: "sekolah-staff-guru",
        component: () => import("@/views/sekolah/staff/guru/Index.vue"),
      },
      {
        path: "/sekolah/staff/akademik",
        name: "sekolah-staff-akademik",
        component: () => import("@/views/sekolah/staff/akademik/Index.vue"),
      },
      {
        path: "/sekolah/staff/keuangan",
        name: "sekolah-staff-keuangan",
        component: () => import("@/views/sekolah/staff/keuangan/Index.vue"),
      },
      {
        path: "/sekolah/staff/administrator",
        name: "sekolah-staff-administrator",
        component: () => import("@/views/sekolah/staff/administrator/Index.vue"),
      },

      //Absensi
      {
        path: "/absensi/kehadiran",
        name: "absensi-kehadiran",
        component: () => import("@/views/absensi/kehadiran/Index.vue"),
      },

      {
        path: "/prototype/api-testing",
        name: "prototype-api-testing",
        component: () => import("@/views/prototype/ApiTesting.vue"),
      },
      {
        path: "/account/profile",
        name: "account-profile",
        component: () => import("@/views/account/profile/Index.vue"),
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
