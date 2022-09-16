<script setup>
import { reactive, watch, onMounted, ref } from 'vue'

const state = reactive({
  darkMode: false,
  isMobile: true
})
const vw = ref(window.innerWidth)
window.addEventListener('resize', () => {
  vw.value = window.innerWidth
  if (window.innerWidth < 768) {
    state.isMobile = true
  } else {
    state.isMobile = false
  }
})
onMounted(() => {
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
  <nav class="px-4 py-2.5">
    <div
      class="relative z-20 container max-w-screen-xl flex flex-wrap justify-between items-center mx-auto"
    >
      <router-link to="/" class="flex items-center">
        <img src="@/assets/logo.svg" class="mr-3 w-12 h-12" alt="Logo" />
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >Wellbeing</span
        >
      </router-link>
      <div class="flex items-center gap-2 md:order-2">
        <!-- Theme toggle -->
        <button
          type="button"
          @click="state.darkMode = !state.darkMode"
          class="hidden md:inline-flex text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm p-2.5 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          <svg
            v-if="state.darkMode"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"
            />
          </svg>
        </button>
        <!-- CTA button -->
        <router-link
          to="/app"
          type="button"
          class="inline-flex items-center gap-2.5 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg px-3 py:1.5 md:px-5 py-2.5 text-center text-sm dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >
          My Dashboard
        </router-link>
        <!-- Toggle mobile menu -->
        <button
          type="button"
          v-if="state.isMobile"
          @click="state.mobileMenu = !state.mobileMenu"
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            v-if="!state.mobileMenu"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
            />
          </svg>
        </button>
      </div>
      <Transition>
        <div
          v-if="!state.isMobile || (state.isMobile && state.mobileMenu)"
          class="relative -z-10 justify-between items-center w-full md:flex md:w-auto md:order-1"
        >
          <ul
            class="flex flex-col p-4 mt-4 bg-gray-100 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700"
          >
            <li>
              <router-link
                to="/"
                class="block py-2 px-3"
                :class="[
                  $route.path === '/'
                    ? 'text-white bg-emerald-700 rounded md:bg-transparent md:text-emerald-700 md:p-0 md:dark:text-emerald-400'
                    : 'text-gray-700  hover:bg-gray-200 rounded md:hover:bg-transparent md:hover:text-emerald-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                ]"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                to="/app"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-emerald-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/app/journal"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-emerald-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Journal</router-link
              >
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-emerald-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Resources</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-emerald-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Blog</a
              >
            </li>
            <li class="block md:hidden">
              <div
                class="rounded-lg bg-gray-200 flex items-center justify-between py-3 px-2 dark:bg-gray-700"
              >
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Toggle dark mode</span
                >
                <label class="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="state.darkMode"
                    id="default-toggle"
                    class="sr-only peer"
                  />
                  <div
                    class="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"
                  ></div>
                </label>
              </div>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </nav>
</template>
