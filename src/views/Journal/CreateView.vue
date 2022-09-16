<script setup>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import RatingComponent from '@/components/RatingComponent.vue'
import useUserStore from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const data = reactive({
  rating: null,
  date: null,
  body: null
})
const state = reactive({
  loading: false,
  error: null
})
const isDarkMode = computed(() =>
  document.documentElement.classList.contains('dark')
)
const currentDateTimeString = computed(() => {
  const now = new Date()
  const date = now.toISOString().substring(0, 10)
  const time = now.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5)
  return date + 'T' + time
})
onMounted(() => {
  data.date = currentDateTimeString.value
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
    await axios.post('/api/user/journal', data, {
      headers: {
        Authorization: userStore.getToken
      }
    })
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
    class="flex flex-col gap-6 w-full mb-12 mx-auto"
  >
    <div
      v-if="!!state.error"
      class="p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <span class="font-medium">{{ state.error }}</span>
    </div>
    <div class="max-w-md">
      <label
        for="date"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Date</label
      >
      <input
        type="datetime-local"
        id="date"
        v-model="data.date"
        class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
      />
    </div>
    <Editor
      api-key="8azlju673ibdtyv28md61v0t568tztcnr4ojvceomyy6bkib"
      :init="{
        plugins: 'lists link table',
        toolbar:
          'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist'
      }"
      v-model="data.body"
      rows="24"
    />
    <RatingComponent
      label-text="How are you feeling?"
      @update="(rating) => (data.rating = rating)"
    />
    <div>
      <button
        type="submit"
        class="w-full max-w-xs py-2.5 px-5 text-base font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
      >
        Save
      </button>
    </div>
  </form>
</template>
