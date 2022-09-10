<script setup>
import axios from 'axios'
import useUserStore from '../../stores/user'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

const userStore = useUserStore()
const router = useRouter()

const data = reactive({
  date: new Date().toISOString().split('T')[0],
  body: null
})
const state = reactive({
  loading: false,
  error: null
})

async function createPage() {
  state.error = null
  console.log('createPage()')
  if (!data.body) {
    state.error = 'Please enter a body for your page.'
    return
  }

  state.loading = true
  try {
    await axios.post(
      '/api/user/journal',
      {
        date: data.date,
        body: data.body
      },
      {
        headers: {
          Authorization: userStore.getToken
        }
      }
    )
    router.push({ name: 'journal-home' })
  } catch (error) {
    console.log(error)
    state.error = error.response.data.error
  } finally {
    state.loading = false
  }
}
</script>

<template>
  <form
    @submit.prevent="createPage()"
    class="flex flex-col gap-6 w-full max-w-lg mx-auto"
  >
    <div
      v-if="!!state.error"
      class="p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <span class="font-medium">{{ state.error }}</span>
    </div>
    <div>
      <label
        for="date"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Date</label
      >
      <input
        type="date"
        id="date"
        v-model="data.date"
        class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
      />
    </div>
    <div>
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Rating</label
      >
      <div class="flex items-center">
        <div>
          <input
            type="radio"
            v-model="data.rating"
            id="rating-1"
            name="rating"
            value="1"
            class="hidden peer"
          />
          <label
            for="rating-1"
            class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full bg-white rounded-l-lg border border-gray-300 cursor-pointer dark:border-gray-600 hover:bg-indigo-600 peer-checked:bg-indigo-600 dark:peer-checked:text-lime-500 peer-checked:border-4 peer-checked:border-lime-600 peer-checked:text-lime-600 dark:bg-gray-800 dark:hover:bg-indigo-800 dark:peer-checked:bg-indigo-800"
          >
            <img
              src="@/assets/icons/Face1.svg"
              alt="Face 1"
              class="w-24 h-24 flex-shrink-0"
            />
          </label>
        </div>
        <div>
          <input
            type="radio"
            v-model="data.rating"
            id="rating-2"
            name="rating"
            value="2"
            class="hidden peer"
          />
          <label
            for="rating-2"
            class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full bg-white border border-gray-300 cursor-pointer dark:border-gray-600 hover:bg-purple-400 peer-checked:bg-purple-400 dark:peer-checked:text-lime-500 peer-checked:border-4 peer-checked:border-lime-600 peer-checked:text-lime-600 dark:bg-gray-800 dark:hover:bg-purple-600 dark:peer-checked:bg-purple-600"
          >
            <img
              src="@/assets/icons/Face2.svg"
              alt="Face 2"
              class="w-24 h-24 flex-shrink-0"
            />
          </label>
        </div>
        <div>
          <input
            type="radio"
            v-model="data.rating"
            id="rating-3"
            name="rating"
            value="3"
            class="hidden peer"
          />
          <label
            for="rating-3"
            class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full bg-white border border-gray-300 cursor-pointer dark:border-gray-600 hover:bg-orange-400 peer-checked:bg-orange-400 dark:peer-checked:text-lime-500 peer-checked:border-4 peer-checked:border-lime-600 peer-checked:text-lime-600 dark:bg-gray-800 dark:hover:bg-orange-400 dark:peer-checked:bg-orange-400"
          >
            <img
              src="@/assets/icons/Face3.svg"
              alt="Face 3"
              class="w-24 h-24 flex-shrink-0"
            />
          </label>
        </div>
        <div>
          <input
            type="radio"
            v-model="data.rating"
            id="rating-4"
            name="rating"
            value="4"
            class="hidden peer"
          />
          <label
            for="rating-4"
            class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full bg-white border border-gray-300 cursor-pointer dark:border-gray-600 hover:bg-cyan-400 peer-checked:bg-cyan-400 dark:peer-checked:text-lime-500 peer-checked:border-4 peer-checked:border-lime-600 peer-checked:text-lime-600 dark:bg-gray-800 dark:hover:bg-cyan-400 dark:peer-checked:bg-cyan-400"
          >
            <img
              src="@/assets/icons/Face4.svg"
              alt="Face 4"
              class="w-24 h-24 flex-shrink-0"
            />
          </label>
        </div>
        <div>
          <input
            type="radio"
            v-model="data.rating"
            id="rating-5"
            name="rating"
            value="5"
            class="hidden peer"
          />
          <label
            for="rating-5"
            class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full bg-white rounded-r-lg border border-gray-300 cursor-pointer dark:border-gray-600 hover:bg-emerald-400 peer-checked:bg-cyan-400 dark:peer-checked:text-lime-500 peer-checked:border-4 peer-checked:border-lime-600 peer-checked:text-lime-600 dark:bg-gray-800 dark:hover:bg-emerald-400 dark:peer-checked:bg-emerald-400"
          >
            <img
              src="@/assets/icons/Face5.svg"
              alt="Face 5"
              class="w-24 h-24 flex-shrink-0"
            />
          </label>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <textarea
        v-model="data.body"
        class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
        rows="10"
      ></textarea>
    </div>
    <button
      type="submit"
      class="py-2.5 px-5 text-base font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
    >
      Save
    </button>
  </form>
</template>
