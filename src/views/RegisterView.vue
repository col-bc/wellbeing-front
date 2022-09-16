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
        <router-link
          to="/"
          class="flex font-medium items-center justify-center text-white mb-4 md:mb-0"
        >
          <img src="@/assets/logo.svg" class="w-24 h-24" alt="Logo" />
        </router-link>

        <h2
          class="text-4xl font-black text-center text-gray-800 dark:text-white mb-4"
        >
          Create your free account
        </h2>

        <!-- Alert -->
        <div
          v-if="!!form.error"
          class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          {{ form.error }}
        </div>
        <!-- Name -->
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Full name</label
          >
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
          />
        </div>
        <!-- Email -->
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
            class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
          />
        </div>
        <!-- Date of birth -->
        <div>
          <label
            for="dob"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Birth date</label
          >
          <input
            type="date"
            id="dob"
            v-model="form.dateOfBirth"
            class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
          />
        </div>
        <!-- Password -->
        <div>
          <label
            for="dob"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Password</label
          >
          <div class="relative">
            <input
              :type="state.showPassword ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
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
        <div class="flex items-center rounded-lg">
          <input
            id="terms"
            v-model="form.terms"
            type="checkbox"
            class="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300 focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="terms"
            class="py-4 ml-4 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree to the
            <a
              href="#"
              class="text-cyan-600 hover:underline dark:text-cyan-400"
            >
              terms of service
            </a>
            and
            <a
              href="#"
              class="text-cyan-600 hover:underline dark:text-cyan-400"
            >
              privacy policy
            </a>
          </label>
        </div>
        <button
          type="submit"
          class="flex-1 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
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
        <div class="text-center">
          <router-link
            to="/login"
            class="block text-sm text-cyan-600 hover:underline dark:text-cyan-400"
            >I already have an account</router-link
          >
        </div>
      </form>
    </main>
  </section>
</template>
