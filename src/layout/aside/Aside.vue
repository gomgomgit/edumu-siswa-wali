<script setup>
import { ref } from "vue";
import KTAsidePrimary from "@/layout/aside/AsidePrimary.vue";
import KTAsideSecondary from "@/layout/aside/AsideSecondary.vue";

const props = defineProps({
  lightLogo: String,
  darkLogo: String,
})

const pinned = ref(false)

function pinAside () {
  document.body.removeAttribute('data-kt-aside-minimize')
  document.body.removeAttribute('data-kt-main-maximize')
}

function unpinAside () {
  document.body.setAttribute('data-kt-main-maximize', 'on')
  document.body.setAttribute('data-kt-aside-minimize', 'on')
}

function togglePin() {
  if (pinned.value == true) {
    unpinAside()
  } else {
    pinAside()
  }
  pinned.value = !pinned.value
}

function openAside () {
  document.body.removeAttribute('data-kt-aside-minimize')
  // document.querySelector('[data-kt-toggle-name="aside-minimize"]').classList.remove('active')
}

function closeAside () {
  if (pinned.value == false) {
    document.body.setAttribute('data-kt-aside-minimize', 'on')
  }
  // document.querySelector('[data-kt-toggle-name="aside-minimize"]').classList.add('active')
}

function openSubMenu(menuId) {
  const submenus = document.getElementsByClassName('submenus')
  for (let index = 0; index < submenus.length; index++) {
    submenus[index].classList.remove('active', 'show');
  }

  document.getElementById(menuId).classList.add('active', 'show')
}

</script>

<template>
  <div
    id="kt_aside"
    class="aside aside-extended"
    data-kt-drawer="true"
    data-kt-drawer-name="aside"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="auto"
    data-kt-drawer-direction="start"
    data-kt-drawer-toggle="#kt_aside_toggle"
  >
    <KTAsidePrimary
      @mouseenter="openAside"
      @mouseleave="closeAside"
      @openSubMenu="openSubMenu"
    ></KTAsidePrimary>
    <KTAsideSecondary
      @openAside="openAside"
      @closeAside="closeAside"
      @togglePin="togglePin"
    ></KTAsideSecondary>
  </div>
</template>