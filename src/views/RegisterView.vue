<script setup>
import NavbarComponent from '../components/NavbarComponent.vue'
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  showPassword: false,
  loading: false
})

const form = reactive({
  email: '',
  name: '',
  dateOfBirth: '',
  password: '',
  terms: false,
  error: null
})

async function register() {
  form.error = null
  if (!form.email || !form.name || !form.dateOfBirth || !form.password) {
    form.error = 'All fields are required'
    return
  }
  if (
    form.password.length < 8 ||
    form.password.match(/\d/) == null ||
    form.password.match(/[A-Z]/) == null
  ) {
    form.error =
      'Password must be at least 8 characters long and contain a number and uppercase letter'
    return
  }
  if (!form.terms) {
    form.error = 'You must accept the terms and conditions'
    return
  }

  try {
    state.loading = true
    const { data } = await axios.post('/api/auth/register', {
      email: form.email,
      name: form.name,
      dob: form.dateOfBirth,
      password: form.password
    })
    router.push('/login')
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
          Sign into Wellbeing
        </h2>
        <div
          v-if="!!form.error"
          class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          {{ form.error }}
        </div>
        <div class="relative">
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer"
            placeholder=" "
          />
          <label
            for="name"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Full name</label
          >
        </div>
        <div class="relative">
          <input
            type="text"
            id="email"
            v-model="form.email"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer"
            placeholder=" "
          />
          <label
            for="email"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Email</label
          >
        </div>
        <div class="relative">
          <input
            type="date"
            id="dob"
            v-model="form.dateOfBirth"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer"
            placeholder=" "
          />
          <label
            for="dob"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Email</label
          >
        </div>
        <div class="relative">
          <input
            :type="state.showPassword ? 'text' : 'password'"
            id="password"
            v-model="form.password"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer"
            placeholder=" "
          />
          <label
            for="password"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Password</label
          >
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
        <div
          class="flex items-center pl-4 rounded-lg border border-gray-300 dark:border-gray-600"
        >
          <input
            id="terms"
            v-model="form.terms"
            type="checkbox"
            class="w-4 h-4 text-lime-600 bg-gray-100 rounded border-gray-300 focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="terms"
            class="py-4 ml-4 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree to the
            <a href="#" class="text-cyan-600 hover:underline dark:text-cyan-400"
              >terms of service</a
            >
            and
            <a
              href="#"
              class="text-cyan-600 hover:underline dark:text-cyan-400"
            >
              privacy policy</a
            >
          </label>
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
          >
            <div v-if="state.loading" class="text-center">
              <div role="status">
                <svg
                  class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <span v-else>Create account</span>
          </button>
          <div class="flex flex-col text-end gap-2">
            <router-link
              to="/login"
              class="block text-sm text-cyan-600 hover:underline dark:text-cyan-400"
              >I already have an account</router-link
            >
          </div>
        </div>
      </form>
    </main>
  </section>
</template>
