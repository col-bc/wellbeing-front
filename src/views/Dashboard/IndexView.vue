<script setup>
import { RouterView } from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue'
import useUserStore from '../../stores/user'

const userStore = useUserStore()

const state = reactive({
  showMenu: false,
  darkMode: false,
  isMobile: false
})
const vw = ref(window.innerWidth)
onMounted(async () => {
  vw.value = window.innerWidth
  if (window.innerWidth < 768) {
    state.isMobile = true
  } else {
    state.isMobile = false
  }
  // Dark mode
  if (localStorage.getItem('color-theme') === 'dark') {
    document.documentElement.classList.add('dark')
    state.darkMode = true
  } else {
    document.documentElement.classList.remove('dark')
    state.darkMode = false
  }
})
window.addEventListener('resize', () => {
  vw.value = window.innerWidth
  if (window.innerWidth < 768) {
    state.isMobile = true
  } else {
    state.isMobile = false
  }
})
watch(state, (value) => {
  if (value.darkMode) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('color-theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.removeItem('color-theme')
  }
})
</script>

<template>
  <section
    class="h-screen flex flex-col bg-white dark:text-gray-300 dark:bg-gray-800"
  >
    <!-- Navbar -->
    <nav
      class="sticky top-0 w-full z-30 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between gap-4 px-4 py-1.5"
    >
      <div class="flex items-center gap-4">
        <router-link to="/" class="flex items-center">
          <img src="@/assets/logo.svg" class="mr-3 w-12 h-12" alt="Logo" />
          <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >Wellbeing</span
          >
        </router-link>
      </div>
      <div class="inline-flex flex-1 justify-center">
        <form class="w-full px-4 md:px-6 lg:px-12 max-w-xl">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >Search</label
          >
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block p-2.5 pl-10 w-full text-sm text-gray-800 bg-white rounded-lg border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
              placeholder="What are you searching for?"
              required=""
            />
          </div>
        </form>
      </div>
      <div class="flex items-center gap-2 md:order-2">
        <!-- Theme toggle -->
        <button
          type="button"
          @click="state.darkMode = !state.darkMode"
          class="text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm p-2.5 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            v-if="state.darkMode"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
        <button
          type="button"
          @click="userStore.clearUser(), $router.push('/')"
          class="inline-flex md:hidden py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          LOGOUT
        </button>
      </div>
    </nav>
    <div class="relative flex flex-1 max-h-max overflow-y-auto">
      <!-- Sidebar -->
      <aside
        class="fixed z-20 left-0 bottom-0 md:top-14 px-4 py-2 md:px-2 md:py-4 border-t md:border-t-0 md:border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        :class="[!state.isMobile ? 'w-full md:w-64' : 'w-full md:w-20']"
      >
        <div class="flex items-center md:flex-col justify-between md:h-full">
          <router-link
            :to="{ name: 'create-check-in' }"
            class="flex items-center justify-center md:justify-start rounded-lg p-2 py-1 mb-2 text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
            :class="[!state.isMobile ? 'w-full h-16' : 'w-16 h-16']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10 flex-shrink-0"
              id="emoji"
              viewBox="0 0 72 72"
            >
              <g id="color">
                <path
                  fill="#b1cc33"
                  d="m61.5 23.3-8.013-8.013-25.71 25.71-9.26-9.26-8.013 8.013 17.42 17.44z"
                />
              </g>
              <g id="line">
                <path
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="m10.5 39.76 17.42 17.44 33.58-33.89-8.013-8.013-25.71 25.71-9.26-9.26z"
                />
              </g>
            </svg>
            <span v-if="!state.isMobile" class="font-semibold ml-2 text-lg">
              Start Check-In</span
            >
          </router-link>
          <router-link
            :to="{ name: 'dashboard-home' }"
            class="flex items-center justify-center md:justify-start rounded-full md:rounded-none px-2 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700"
            :class="[!state.isMobile ? 'w-full h-16' : 'w-16 h-16']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10 flex-shrink-0"
              id="emoji"
              viewBox="0 0 72 72"
            >
              <g id="color">
                <rect
                  x="12.05"
                  y="12.05"
                  width="47.9"
                  height="47.9"
                  fill="#fff"
                />
                <rect
                  x="18.32"
                  y="37.6"
                  width="8"
                  height="21.41"
                  fill="#b1cc33"
                />
                <rect
                  x="46.25"
                  y="44.38"
                  width="8"
                  height="14.62"
                  fill="#92d3f5"
                />
                <rect
                  x="32.28"
                  y="21.69"
                  width="8"
                  height="37.32"
                  fill="#d22f27"
                />
              </g>
              <g id="hair" />
              <g id="skin" />
              <g id="skin-shadow" />
              <g id="line">
                <path
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="m18.03 59.01v-21.41h8v21.41"
                />
                <path
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="m45.97 59.01v-14.62h8v14.62"
                />
                <line
                  x1="12.75"
                  x2="28.49"
                  y1="31.28"
                  y2="31.28"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <line
                  x1="43.51"
                  x2="59.45"
                  y1="40.82"
                  y2="40.82"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <line
                  x1="57.48"
                  x2="59.17"
                  y1="50.37"
                  y2="50.37"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <rect
                  x="12.05"
                  y="12.05"
                  width="47.9"
                  height="47.9"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <path
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="m32 59.01v-37.28h8v37.28"
                />
                <line
                  x1="12.39"
                  x2="14.52"
                  y1="40.82"
                  y2="40.82"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <line
                  x1="12.39"
                  x2="14.52"
                  y1="50.37"
                  y2="50.37"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <line
                  x1="43.51"
                  x2="59.45"
                  y1="31.28"
                  y2="31.28"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <line
                  x1="43.51"
                  x2="59.45"
                  y1="21.74"
                  y2="21.74"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <line
                  x1="12.75"
                  x2="28.49"
                  y1="21.74"
                  y2="21.74"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
              </g>
            </svg>
            <span v-if="!state.isMobile" class="font-medium ml-2 text-lg">
              Dashboard</span
            >
          </router-link>
          <router-link
            :to="{ name: 'read-all-check-ins' }"
            class="flex items-center justify-center md:justify-start rounded-full md:rounded-none px-2 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700"
            :class="[!state.isMobile ? 'w-full h-16' : 'w-16 h-16']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10 flex-shrink-0"
              id="emoji"
              viewBox="0 0 72 72"
            >
              <g id="color">
                <circle cx="36" cy="36" r="23" fill="#FCEA2B" />
              </g>
              <g id="hair" />
              <g id="skin" />
              <g id="skin-shadow" />
              <g id="line">
                <circle
                  cx="36"
                  cy="36"
                  r="23"
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <path
                  d="M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31"
                />
                <path
                  d="M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31"
                />
              </g>
            </svg>
            <span v-if="!state.isMobile" class="font-medium ml-2 text-lg">
              Check Ins</span
            >
          </router-link>
          <router-link
            :to="{ name: 'exercises-home' }"
            class="flex items-center justify-center md:justify-start rounded-full md:rounded-none px-2 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700"
            :class="[!state.isMobile ? 'w-full h-16' : 'w-16 h-16']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10 flex-shrink-0"
              id="emoji"
              viewBox="0 0 72 72"
              version="1.1"
            >
              <g id="color" />
              <g id="hair" />
              <g id="skin-shadow" />
              <g id="skin">
                <circle cx="35.9688" cy="19.0938" r="3" fill="#FCEA2B" />
                <path
                  fill="#FCEA2B"
                  d="M30,32c0,0,0,10-1,13l-0.543,0.126c0,0-0.666,1.333-6.208,3.958C20.4482,49.9365,17,53.7461,17,55.0801 S28.501,57,28.501,57L29,57.4141L39.4375,56l8.0635,1l4.5,0.4141L53.917,57L55,54.2471l-1.6641-2.1553l-7.8349-4.1777l-3.167-3.834 l-0.417-12.5c0,0,1.1143,1.3262,1.709,7.8789c0.3086,3.3984,2.917,6.1142,3.791,6.9551c1.6377,1.5761,6.3203,4.7509,6.7627,4.9668 C55.792,52.167,57.25,50.4209,56.833,50s-5.5-3.3369-5.5-3.3369l-2.25-2.166l-3.0947-3.3145l-0.3916-5.2246l-0.7637-5.3789L40.5,27 h-4.5312L31,27.1113l-2,1.3848l-1.667,2.833l-2.251,10.166l-2.3789,3.7539l-7.5381,5.3291c0,0,1.0176,1.96,2.96,0.6709 c2.2666-1.5049,6.8555-4.9658,7.542-5.709c1.0019-1.0849,2.6367-4.1396,2.958-6.54C29.334,33.707,30,32,30,32z"
                />
              </g>
              <g id="line">
                <circle
                  cx="35.9688"
                  cy="19.0938"
                  r="3"
                  fill="none"
                  stroke="#000000"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <path
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M16,50l5.7959-4.1084c2.2432-1.5908,4.2471-5.1357,4.4531-7.8779l0.377-5.0274C26.832,30.2441,29.0254,27.5498,31.5,27 s6.5254-0.5498,9,0s4.668,3.2441,4.874,5.9863l0.377,5.0274c0.206,2.7422,2.2099,6.2871,4.4531,7.8779L56,50"
                />
                <path
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M29,46c0,0,0.2246-0.4355,0.5-0.9687c0.2754-0.5333,0.5742-1.8653,0.665-2.962L31,32"
                />
                <path
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M29,56.4541c0,0-0.6748,0.123-1.5,0.2725C26.6748,56.877,25.0996,57,24,57h-5c-1.0996,0-2-0.9004-2-2l0,0 c0-1.0996,0.79-2.4307,1.7559-2.958L22.5,50"
                />
                <path
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M41,32l0.8467,11.0059C41.9307,44.1025,42.4502,45.4502,43,46s1.79,1.4307,2.7559,1.958l7.4882,4.084 C54.21,52.5693,55,53.9004,55,55l0,0c0,1.0996-0.9004,2-2,2h-5c-1.0996,0-2.8789-0.1953-3.9521-0.4336l-5.0958-1.1328 c-1.0732-0.2383-2.8203-0.6699-3.8818-0.96l-7.1406-1.9472c-1.0615-0.2901-1.7803-1.2012-1.5967-2.0264 c0.1836-0.8252,1.2324-1.459,2.3311-1.4092L48.666,50"
                />
              </g>
            </svg>
            <span v-if="!state.isMobile" class="font-medium ml-2 text-lg">
              Exercises</span
            >
          </router-link>
          <router-link
            :to="{ name: 'journal-home' }"
            class="flex items-center justify-center md:justify-start rounded-full md:rounded-none px-2 mb-auto hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700"
            :class="[!state.isMobile ? 'w-full h-16' : 'w-16 h-16']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10 flex-shrink-0"
              id="emoji"
              viewBox="0 0 72 72"
            >
              <g id="color">
                <polygon
                  fill="#FFFFFF"
                  stroke="none"
                  points="12,58 59.8467,57.85 59.8467,12.15 15.6686,12.15 12,16"
                />
                <path
                  fill="#d22f27"
                  stroke="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M55.0015,61h-43.003C11.447,61,11,60.553,11,60.0015v-43.003C11,16.447,11.447,16,11.9985,16h43.003 C55.553,16,56,16.447,56,16.9985v43.003C56,60.553,55.553,61,55.0015,61z"
                />
              </g>
              <g id="hair" />
              <g id="skin" />
              <g id="skin-shadow" />
              <g id="line">
                <path
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M11,17l4.9985-5h43.003C59.553,12,60,12.447,60,12.9985v43.003C60,56.553,59.553,57,59.0015,57"
                />
                <path
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M55.0015,61h-43.003C11.447,61,11,60.553,11,60.0015v-43.003C11,16.447,11.447,16,11.9985,16h43.003 C55.553,16,56,16.447,56,16.9985v43.003C56,60.553,55.553,61,55.0015,61z"
                />
              </g>
            </svg>
            <span v-if="!state.isMobile" class="font-medium ml-2 text-lg">
              Journal</span
            >
          </router-link>
          <!--  -->
          <button
            type="button"
            class="flex items-center justify-center md:justify-start rounded-full md:rounded-none px-2 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700"
            :class="[!state.isMobile ? 'w-full h-16' : 'w-16 h-16']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10 flex-shrink-0"
              id="emoji"
              viewBox="0 0 72 72"
            >
              <g id="color">
                <path
                  fill="#D0CFCE"
                  stroke="none"
                  d="M51.2579,29.8111c0,0-1.8149-0.4504-1.0786-2.0742l4.5037-7.4841l-3.6502-3.417l-0.73-0.6833 l-7.1357,4.6903c-0.9431,0.4213-2.037-0.1166-2.2794-1.1205l-1.887-7.8158h-5h-1l-1.8809,7.7858 c-0.2389,0.9894-1.3101,1.5798-2.2425,1.1716c-0.0148-0.0063-0.0296-0.0131-0.0445-0.0198l-7.1357-4.6904l-0.73,0.6833 l-3.6502,3.417l4.5037,7.4841c0.7364,1.6238-1.0785,2.0743-1.0785,2.0743l-8.4766,2.1074l0.1649,4.9972l0.033,0.9995 l8.3622,1.7291c0.952,0.3641,1.3501,1.4954,0.8358,2.3755l-0.0328,0.0562l-4.5037,7.484l3.6502,3.417l0.73,0.6833l7.1357-4.6902 c0.0149-0.0068,0.03-0.0129,0.0445-0.02c0,0,0.0115-0.0042,0.0332-0.0111c1.1606-0.3768,2.393,0.3463,2.6794,1.5325l1.7947,7.4336 h1h5l1.887-7.8158c0.2424-1.0039,1.3364-1.5417,2.2794-1.1205l7.1357,4.6903l0.73-0.6833l3.6502-3.417l-4.5037-7.4841 l-0.0328-0.0562c-0.5143-0.88-0.1162-2.0112,0.8358-2.3755l8.3622-1.729l0.033-0.9995l0.1649-4.9973L51.2579,29.8111z M36,44.9064 c-5.5228,0-10-4.4772-10-10s4.4772-10,10-10s10,4.4772,10,10S41.5228,44.9064,36,44.9064z"
                />
                <path
                  fill="#9B9B9A"
                  stroke="none"
                  d="M36,24.9064c-5.5228,0-10,4.4772-10,10s4.4772,10,10,10s10-4.4772,10-10S41.5228,24.9064,36,24.9064z M36,39.9064c-2.7614,0-5-2.2386-5-5c0-2.7615,2.2386-5,5-5s5,2.2385,5,5C41,37.6678,38.7614,39.9064,36,39.9064z"
                />
              </g>
              <g id="hair" />
              <g id="skin" />
              <g id="skin-shadow" />
              <g id="line">
                <circle
                  cx="36"
                  cy="34.9064"
                  r="5"
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <circle
                  cx="36"
                  cy="34.9064"
                  r="10"
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <path
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M31.1191,19.6921c-0.2389,0.9895-1.31,1.5799-2.2425,1.1717c-0.0147-0.0065-0.0296-0.0131-0.0445-0.0199l-7.1357-4.6903 l-0.73,0.6834l-3.6502,3.417l4.5037,7.484c0.7363,1.6239-1.0785,2.0744-1.0785,2.0744l-8.4766,2.1074l0.1649,4.9973l0.033,0.9995 l8.3622,1.7291h0c0.9521,0.3641,1.3501,1.4954,0.8359,2.3754l-0.0328,0.0562l-4.5037,7.484l3.6502,3.417l0.73,0.6834 l7.1357-4.6903c0.0149-0.0068,0.03-0.0129,0.0445-0.0199c0,0,0.0116-0.0042,0.0332-0.0112 c1.1606-0.3768,2.393,0.3463,2.6794,1.5324l1.7947,7.4336h1h5l1.8869-7.8157c0.2424-1.004,1.3364-1.5418,2.2794-1.1205h0 l7.1357,4.6903l0.73-0.6834l3.6502-3.417l-4.5037-7.484l-0.0328-0.0562c-0.5143-0.8801-0.1162-2.0113,0.8359-2.3755l0,0 l8.3622-1.7291l0.033-0.9995l0.1649-4.9973l-8.4766-2.1074c0,0-1.8149-0.4505-1.0785-2.0744l4.5037-7.484l-3.6502-3.417 l-0.73-0.6834l-7.1357,4.6903v0c-0.943,0.4212-2.037-0.1166-2.2794-1.1206L39,11.9064h-5h-1L31.1191,19.6921"
                />
              </g>
            </svg>
            <span
              v-if="!state.isMobile"
              class="font-semibold ml-2 overflow-ellipsis text-lg"
            >
              Settings</span
            >
          </button>
          <button
            type="button"
            @click="userStore.clearUser(), $router.push('/')"
            class="hidden md:flex items-center justify-center md:justify-start rounded-full md:rounded-none px-2 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700"
            :class="[!state.isMobile ? 'w-full h-12' : 'w-12 h-12']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10 flex-shrink-0"
              id="emoji"
              viewBox="0 0 72 72"
            >
              <g id="color">
                <rect
                  x="18"
                  y="9"
                  width="36"
                  height="54"
                  fill="#A57939"
                  stroke="none"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <rect
                  x="24"
                  y="14.0943"
                  width="24"
                  height="16.3019"
                  fill="#6A462F"
                  stroke="none"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <rect
                  x="24"
                  y="45.6792"
                  width="24"
                  height="11.2075"
                  fill="#6A462F"
                  stroke="none"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
              </g>
              <g id="hair" />
              <g id="skin" />
              <g id="skin-shadow" />
              <g id="line">
                <rect
                  x="18"
                  y="9"
                  width="36"
                  height="54"
                  fill="none"
                  stroke="#000000"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <ellipse
                  cx="49"
                  cy="36.5094"
                  rx="2.5"
                  ry="2.0377"
                  fill="#000000"
                  stroke="none"
                />
                <path
                  fill="#000000"
                  stroke="none"
                  d="M49.5,41.6038h-1c-0.5523,0-1-0.4477-1-1v-6.1509c0-0.5523,0.4477-1,1-1h1c0.5523,0,1,0.4477,1,1v6.1509 C50.5,41.1561,50.0523,41.6038,49.5,41.6038z"
                />
                <rect
                  x="24"
                  y="14.0943"
                  width="24"
                  height="16.3019"
                  fill="none"
                  stroke="#000000"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <rect
                  x="24"
                  y="45.6792"
                  width="24"
                  height="11.2075"
                  fill="none"
                  stroke="#000000"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
              </g>
            </svg>
            <span
              v-if="!state.isMobile"
              class="font-semibold ml-2 overflow-ellipsis text-center"
            >
              Logout</span
            >
          </button>
        </div>
      </aside>
      <!-- Content -->
      <main
        class="bg-gray-100 p-4 mb-16 md:mb-0 md:p-12 md:ml-64 w-full overflow-y-auto dark:bg-gray-900"
      >
        <RouterView></RouterView>
      </main>
    </div>
  </section>
</template>
