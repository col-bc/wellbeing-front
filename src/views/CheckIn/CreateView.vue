<script setup>
import { computed, onMounted, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import useUserStore from '../../stores/user'
import { current } from 'tailwindcss/colors'
import RatingComponent from '../../components/RatingComponent.vue'

const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  error: null,
  rating: null,
  date: null,
  notes: null,
  symptoms: null,
  activities: null
})
const state = reactive({
  complete: true
})
onMounted(() => {
  state.complete = false
  form.date = currentDateTimeString.value
})
async function addCheckIn() {
  form.error = null
  if (!form.rating) {
    form.error = 'Please select a rating'
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  if (!form.date) {
    form.error = 'Please select a date'
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  try {
    const resp = await axios.post(
      '/api/user/check-in',
      {
        rating: form.rating,
        date: form.date,
        notes: form.notes,
        symptoms: form.symptoms,
        activities: form.activities
      },
      {
        headers: {
          Authorization: userStore.getToken
        }
      }
    )
    if (!!resp.data) {
      userStore.addCheckIn(resp.data)
      state.complete = true
    }
  } catch (error) {
    console.log(error)
    form.error = error.response.data.error
  }
}
const currentDateTimeString = computed(() => {
  const now = new Date()
  const date = now.toISOString().substring(0, 10)
  const time = now.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5)
  return date + 'T' + time
})
</script>

<template>
  <form
    v-if="!state.complete"
    @submit.prevent="addCheckIn"
    class="max-w-lg mx-auto flex flex-col gap-6 mb-12"
  >
    <h2 class="text-3xl font-black text-gray-800 mb-6 dark:text-white">
      How are you feeling right now?
    </h2>
    <div
      v-if="!!form.error"
      class="p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <span class="font-medium">{{ form.error }}</span>
    </div>
    <!-- Rating -->
    <RatingComponent @update="(rating) => (form.rating = rating)" />
    <!-- Date/time -->
    <div>
      <label
        for="date"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Date and time</label
      >
      <input
        type="datetime-local"
        id="date"
        v-model="form.date"
        class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
      />
    </div>
    <!-- Activities -->
    <div>
      <label
        for="activities"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >What have you been doing?</label
      >
      <input
        type="text"
        id="activities"
        v-model="form.activities"
        class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
      />
    </div>
    <!-- Symptoms -->
    <div>
      <label
        for="symptoms"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >What symptoms have you experienced?</label
      >
      <input
        type="text"
        id="symptoms"
        v-model="form.symptoms"
        class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
      />
    </div>
    <!-- Notes -->
    <div>
      <label
        for="notes"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Notes</label
      >
      <textarea
        id="notes"
        v-model="form.notes"
        class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
        rows="4"
      ></textarea>
    </div>
    <button
      type="submit"
      class="mt-4 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
    >
      Finish
    </button>
  </form>
  <div
    v-if="state.complete"
    class="w-full h-full flex items-center justify-center"
  >
    <div class="text-center space-y-6">
      <h2 class="text-3xl font-black text-gray-800 mb-6 dark:text-white">
        Thank you!
      </h2>
      <p class="text-gray-800 dark:text-gray-300">
        Your check-in has been recorded.
      </p>
      <router-link
        to="/app"
        class="inline-block text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800"
      >
        Return to Dashboard
      </router-link>
      <button
        type="button"
        @click="state.complete = false"
        class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Start a new check-in
      </button>
    </div>
  </div>
</template>
