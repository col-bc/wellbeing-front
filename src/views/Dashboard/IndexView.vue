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
      class="sticky top-0 w-full z-20 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between gap-4 px-4 py-2.5"
    >
      <div class="flex items-center gap-4">
        <router-link to="/" class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-3 fill-current w-8 h-8"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path
              d="M11 2c4.068 0 7.426 3.036 7.934 6.965l2.25 3.539c.148.233.118.58-.225.728L19 14.07V17c0 1.105-.895 2-2 2h-1.999L15 22H6v-3.694c0-1.18-.436-2.297-1.244-3.305C3.657 13.631 3 11.892 3 10c0-4.418 3.582-8 8-8zm0 2c-3.314 0-6 2.686-6 6 0 1.385.468 2.693 1.316 3.75C7.41 15.114 8 16.667 8 18.306V20h5l.002-3H17v-4.248l1.55-.664-1.543-2.425-.057-.442C16.566 6.251 14.024 4 11 4zm-.53 3.763l.53.53.53-.53c.684-.684 1.792-.684 2.475 0 .684.683.684 1.791 0 2.474L11 13.243l-3.005-3.006c-.684-.683-.684-1.791 0-2.474.683-.684 1.791-.684 2.475 0z"
            />
          </svg>
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
              class="block p-2.5 pl-10 w-full text-sm text-gray-800 bg-white rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
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
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 fill-current flex-shrink-0"
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
            class="w-6 h-6 fill-current flex-shrink-0"
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
        class="fixed z-30 left-0 bottom-0 md:top-16 px-4 py-2 md:px-2 md:py-4 sm:border-t md:border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        :class="[!state.isMobile ? 'w-full md:w-56' : 'w-full md:w-20']"
      >
        <div class="flex items-center md:flex-col justify-between md:h-full">
          <router-link
            :to="{ name: 'create-check-in' }"
            class="flex items-center rounded-full p-2 mb-2 text-white bg-lime-700 hover:bg-lime-800 dark:bg-lime-600 dark:hover:bg-lime-700"
            :class="[!state.isMobile ? 'w-full h-12' : 'w-12 h-112']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 fill-current flex-shrink-0"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
            </svg>
            <span v-if="!state.isMobile" class="font-semibold ml-4 text-lg">
              Start Check-In</span
            >
          </router-link>
          <router-link
            :to="{ name: 'dashboard-home' }"
            class="flex items-center rounded-full p-2 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700"
            :class="[!state.isMobile ? 'w-full h-12' : 'w-12 h-112']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 fill-current flex-shrink-0"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9zm-2-1V9.157l-6-5.454-6 5.454V19h12zm-6-2l-3.359-3.359a2.25 2.25 0 1 1 3.182-3.182l.177.177.177-.177a2.25 2.25 0 1 1 3.182 3.182L12 17z"
              />
            </svg>
            <span v-if="!state.isMobile" class="font-semibold ml-4 text-lg">
              Dashboard</span
            >
          </router-link>
          <router-link
            :to="{ name: 'read-all-check-ins' }"
            class="flex items-center rounded-full p-2 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700"
            :class="[!state.isMobile ? 'w-full h-12' : 'w-12 h-12']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 fill-current flex-shrink-0"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-4-7h8a4 4 0 1 1-8 0zm0-2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
              />
            </svg>
            <span v-if="!state.isMobile" class="font-semibold ml-4 text-lg">
              Check Ins</span
            >
          </router-link>
          <router-link
            :to="{ name: 'exercises-home' }"
            class="flex items-center rounded-full p-2 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700"
            :class="[!state.isMobile ? 'w-full h-12' : 'w-12 h-12']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 fill-current flex-shrink-0"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M17.457 3L21 3.003l.002 3.523-5.467 5.466 2.828 2.829 1.415-1.414 1.414 1.414-2.474 2.475 2.828 2.829-1.414 1.414-2.829-2.829-2.475 2.475-1.414-1.414 1.414-1.415-2.829-2.828-2.828 2.828 1.415 1.415-1.414 1.414-2.475-2.475-2.829 2.829-1.414-1.414 2.829-2.83-2.475-2.474 1.414-1.414 1.414 1.413 2.827-2.828-5.46-5.46L3 3l3.546.003 5.453 5.454L17.457 3zm-7.58 10.406L7.05 16.234l.708.707 2.827-2.828-.707-.707zm9.124-8.405h-.717l-4.87 4.869.706.707 4.881-4.879v-.697zm-14 0v.7l11.241 11.241.707-.707L5.716 5.002l-.715-.001z"
              />
            </svg>
            <span
              v-if="!state.isMobile"
              class="font-semibold ml-4 overflow-ellipsis text=lg"
            >
              Exercises</span
            >
          </router-link>
          <router-link
            :to="{ name: 'journal-home' }"
            class="flex items-center rounded-full p-2 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700"
            :class="[!state.isMobile ? 'w-full h-12' : 'w-12 h-12']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 fill-current flex-shrink-0"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M21 18H6a1 1 0 0 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16v16zM5 16.05c.162-.033.329-.05.5-.05H19V4H5v12.05zM16 9H8V7h8v2z"
              />
            </svg>
            <span
              v-if="!state.isMobile"
              class="font-semibold ml-4 overflow-ellipsis text-lg"
            >
              Journal</span
            >
          </router-link>
          <button
            type="button"
            class="md:mt-auto flex items-center rounded-full p-2 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700"
            :class="[!state.isMobile ? 'w-full h-12' : 'w-12 h-12']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 fill-current flex-shrink-0"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M3.34 17a10.018 10.018 0 0 1-.978-2.326 3 3 0 0 0 .002-5.347A9.99 9.99 0 0 1 4.865 4.99a3 3 0 0 0 4.631-2.674 9.99 9.99 0 0 1 5.007.002 3 3 0 0 0 4.632 2.672c.579.59 1.093 1.261 1.525 2.01.433.749.757 1.53.978 2.326a3 3 0 0 0-.002 5.347 9.99 9.99 0 0 1-2.501 4.337 3 3 0 0 0-4.631 2.674 9.99 9.99 0 0 1-5.007-.002 3 3 0 0 0-4.632-2.672A10.018 10.018 0 0 1 3.34 17zm5.66.196a4.993 4.993 0 0 1 2.25 2.77c.499.047 1 .048 1.499.001A4.993 4.993 0 0 1 15 17.197a4.993 4.993 0 0 1 3.525-.565c.29-.408.54-.843.748-1.298A4.993 4.993 0 0 1 18 12c0-1.26.47-2.437 1.273-3.334a8.126 8.126 0 0 0-.75-1.298A4.993 4.993 0 0 1 15 6.804a4.993 4.993 0 0 1-2.25-2.77c-.499-.047-1-.048-1.499-.001A4.993 4.993 0 0 1 9 6.803a4.993 4.993 0 0 1-3.525.565 7.99 7.99 0 0 0-.748 1.298A4.993 4.993 0 0 1 6 12c0 1.26-.47 2.437-1.273 3.334a8.126 8.126 0 0 0 .75 1.298A4.993 4.993 0 0 1 9 17.196zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
              />
            </svg>
            <span
              v-if="!state.isMobile"
              class="font-semibold ml-4 overflow-ellipsis text-lg"
            >
              Settings</span
            >
          </button>
          <button
            type="button"
            @click="userStore.clearUser(), $router.push('/')"
            class="hidden md:flex items-center rounded-full p-2 hover:bg-gray-300 focus:outline-none dark:hover:bg-gray-700"
            :class="[!state.isMobile ? 'w-full h-12' : 'w-12 h-12']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 fill-current flex-shrink-0"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z"
              />
            </svg>
            <span
              v-if="!state.isMobile"
              class="font-semibold ml-4 overflow-ellipsis text-center"
            >
              Logout</span
            >
          </button>
        </div>
      </aside>
      <!-- Content -->
      <main
        class="p-4 mb-16 md:mb-0 md:p-6 md:ml-56 lg:p-12 w-full overflow-y-auto"
      >
        <RouterView></RouterView>
      </main>
    </div>
  </section>
</template>
