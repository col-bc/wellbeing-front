<script setup>
import NavbarComponent from '../components/NavbarComponent.vue'
import LoaderComponent from '../components/LoaderComponent.vue'
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const state = reactive({
  showPassword: false,
  loading: false
})

const form = reactive({
  email: '',
  password: '',
  error: null
})

async function register() {
  form.error = null
  if (!form.email || !form.password) {
    form.error = 'All fields are required'
    return
  }

  try {
    state.loading = true
    // get auth token
    const loginReq = await axios.post('/api/auth/login', {
      email: form.email,
      password: form.password
    })
    if (!!loginReq.data.token) {
      // Save token and redirect to dashboard or ?next
      userStore.setToken(loginReq.data.token)
      router.push(route.query.next || '/dashboard')
    }
  } catch (error) {
    console.log(error)
    form.error = error.response.data.error
  } finally {
    state.loading = false
  }
}
</script>

<template>
  <section class="min-h-screen bg-white dark:text-gray-300 dark:bg-gray-800">
    <NavbarComponent />
    <main class="container max-w-screen-xl px-4 mx-auto">
      <form
        @submit.prevent="register()"
        class="flex max-w-lg flex-col gap-6 py-12 mx-auto"
      >
        <a class="flex font-medium items-center text-white mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 fill-gray-800 mx-auto p-2 bg-lime-300 rounded-full"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path
              d="M11 2c4.068 0 7.426 3.036 7.934 6.965l2.25 3.539c.148.233.118.58-.225.728L19 14.07V17c0 1.105-.895 2-2 2h-1.999L15 22H6v-3.694c0-1.18-.436-2.297-1.244-3.305C3.657 13.631 3 11.892 3 10c0-4.418 3.582-8 8-8zm0 2c-3.314 0-6 2.686-6 6 0 1.385.468 2.693 1.316 3.75C7.41 15.114 8 16.667 8 18.306V20h5l.002-3H17v-4.248l1.55-.664-1.543-2.425-.057-.442C16.566 6.251 14.024 4 11 4zm-.53 3.763l.53.53.53-.53c.684-.684 1.792-.684 2.475 0 .684.683.684 1.791 0 2.474L11 13.243l-3.005-3.006c-.684-.683-.684-1.791 0-2.474.683-.684 1.791-.684 2.475 0z"
            />
          </svg>
        </a>

        <h2
          class="text-4xl font-black text-center text-gray-800 dark:text-white mb-4"
        >
          Login to your account
        </h2>
        <div
          v-if="!!form.error"
          class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          {{ form.error }}
        </div>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Password</label
          >
          <div class="relative">
            <input
              :type="state.showPassword ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
            />
            <button
              type="button"
              tabindex="-1"
              @click="state.showPassword = !state.showPassword"
              class="absolute inset-y-0 right-2.5 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 fill-gray-600 group-hover:fill-gray-800 dark:fill-gray-400 dark:group-hover:fill-white"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          class="flex items-center pl-4 rounded-lg border border-gray-300 dark:border-gray-600"
        >
          <input
            id="remember"
            v-model="form.remember"
            type="checkbox"
            class="w-4 h-4 text-lime-600 bg-gray-100 rounded border-gray-300 focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="remember"
            class="py-3 ml-4 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me on this device
          </label>
        </div>
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-2"
        >
          <button
            type="submit"
            class="w-full md:w-44 text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
          >
            <LoaderComponent v-if="state.loading" />
            <span v-else>Login</span>
          </button>
          <div class="flex flex-col text-end gap-2">
            <router-link
              to="/register"
              class="block text-sm text-cyan-600 hover:underline dark:text-cyan-400"
              >I need an account</router-link
            >
            <a
              href="#"
              class="block text-sm text-cyan-600 hover:underline dark:text-cyan-400"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </form>
    </main>
  </section>
</template>
