<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import useUserStore from '../../stores/user'

const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  error: null,
  rating: null,
  date: new Date().toISOString().substring(0, 10),
  notes: null,
  symptoms: null,
  activities: null
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
      router.push('/dashboard')
    }
  } catch (error) {
    console.log(error)
    form.error = error.response.data.error
  }
}
</script>

<template>
  <form
    @submit.prevent="addCheckIn"
    class="max-w-lg mx-auto flex flex-col gap-6"
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
            v-model="form.rating"
            id="rating-1"
            name="rating"
            value="1"
            class="hidden peer"
          />
          <label
            for="rating-1"
            class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full bg-white rounded-l-lg border border-gray-300 cursor-pointer dark:border-gray-700 hover:bg-indigo-600 peer-checked:bg-indigo-600 dark:peer-checked:text-lime-500 peer-checked:border-4 peer-checked:border-lime-600 peer-checked:text-lime-600 dark:bg-gray-800 dark:hover:bg-indigo-800 dark:peer-checked:bg-indigo-800"
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
            v-model="form.rating"
            id="rating-2"
            name="rating"
            value="2"
            class="hidden peer"
          />
          <label
            for="rating-2"
            class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full bg-white border border-gray-300 cursor-pointer dark:border-gray-700 hover:bg-purple-400 peer-checked:bg-purple-400 dark:peer-checked:text-lime-500 peer-checked:border-4 peer-checked:border-lime-600 peer-checked:text-lime-600 dark:bg-gray-800 dark:hover:bg-purple-600 dark:peer-checked:bg-purple-600"
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
            v-model="form.rating"
            id="rating-3"
            name="rating"
            value="3"
            class="hidden peer"
          />
          <label
            for="rating-3"
            class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full bg-white border border-gray-300 cursor-pointer dark:border-gray-700 hover:bg-orange-400 peer-checked:bg-orange-400 dark:peer-checked:text-lime-500 peer-checked:border-4 peer-checked:border-lime-600 peer-checked:text-lime-600 dark:bg-gray-800 dark:hover:bg-orange-400 dark:peer-checked:bg-orange-400"
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
            v-model="form.rating"
            id="rating-4"
            name="rating"
            value="4"
            class="hidden peer"
          />
          <label
            for="rating-4"
            class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full bg-white border border-gray-300 cursor-pointer dark:border-gray-700 hover:bg-cyan-400 peer-checked:bg-cyan-400 dark:peer-checked:text-lime-500 peer-checked:border-4 peer-checked:border-lime-600 peer-checked:text-lime-600 dark:bg-gray-800 dark:hover:bg-cyan-400 dark:peer-checked:bg-cyan-400"
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
            v-model="form.rating"
            id="rating-5"
            name="rating"
            value="5"
            class="hidden peer"
          />
          <label
            for="rating-5"
            class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full bg-white rounded-r-lg border border-gray-300 cursor-pointer dark:border-gray-700 hover:bg-emerald-400 peer-checked:bg-cyan-400 dark:peer-checked:text-lime-500 peer-checked:border-4 peer-checked:border-lime-600 peer-checked:text-lime-600 dark:bg-gray-800 dark:hover:bg-emerald-400 dark:peer-checked:bg-emerald-400"
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
    <div>
      <label
        for="date"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Date</label
      >
      <input
        type="date"
        id="date"
        v-model="form.date"
        class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
      />
    </div>
    <div>
      <label
        for="activities"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Activities</label
      >
      <input
        type="text"
        id="activities"
        v-model="form.activities"
        class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
      />
    </div>
    <div>
      <label
        for="symptoms"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Symptoms</label
      >
      <input
        type="text"
        id="symptoms"
        v-model="form.symptoms"
        class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
      />
    </div>
    <div>
      <label
        for="notes"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Notes</label
      >
      <textarea
        id="notes"
        v-model="form.notes"
        class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
        rows="4"
      ></textarea>
    </div>
    <div>
      <button
        type="submit"
        class="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
      >
        Submit
      </button>
    </div>
  </form>
</template>
