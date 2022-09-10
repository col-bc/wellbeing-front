<script setup>
import axios from 'axios'
import LoaderComponent from '@/components/LoaderComponent.vue'
import useUserStore from '../../stores/user'
import { onMounted, reactive } from 'vue'
import JournalPageComponent from '../../components/JournalPageComponent.vue'

const userStore = useUserStore()

const data = reactive({
  pages: []
})
const state = reactive({
  loading: true,
  expandedId: null
})

onMounted(async () => {
  try {
    const response = await axios.get('/api/user/journal', {
      headers: {
        Authorization: userStore.getToken
      }
    })
    for (const page of response.data.pages) {
      data.pages.push(page)
    }
    for (const page of data.pages) {
      page.expanded = false
    }
    data.pages.reverse()
  } catch (error) {
    console.log(error)
  } finally {
    state.loading = false
  }
})
</script>

<template>
  <div class="flex items-start justify-between">
    <h2
      class="flex-1 text-3xl font-black text-gray-800 mb-12 lg:mb-24 mb dark:text-white"
    >
      {{ userStore.user.name.split(' ')[0] }}'s Journal
    </h2>
    <router-link
      :to="{ name: 'journal-create' }"
      class="inline-flex items-center py-3 px-5 text-base font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 mr-2 fill-current"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M15 4H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992zM11 11V8h2v3h3v2h-3v3h-2v-3H8v-2h3z"
        />
      </svg>
      Add new page
    </router-link>
  </div>
  <LoaderComponent v-if="state.loading" />
  <div v-else class="flex flex-col gap-12 mb-12">
    <!-- Empty state -->
    <div v-if="data.pages.length === 0" class="space-y-2">
      <h3 class="text-2xl font-bold text-gray-800 dark:text-white">
        You don't have any pages yet
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Click the button above to add a new page
      </p>
    </div>
    <!-- Pages -->
    <ul
      class="mb-12 rounded-lg border border-gray-300 shadow-sm divide-y divide-gray-300 dark:border-gray-700 dark:divide-gray-700"
    >
      <li
        v-for="page of data.pages"
        :key="page.id"
        @click="
          state.expandedId === page.id
            ? (state.expandedId = null)
            : (state.expandedId = page.id)
        "
        class="flex flex-col first:rounded-t-lg last:rounded-b-lg p-2.5 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
      >
        <div class="w-full flex items-center justify-between">
          <h5 class="text-lg font-medium text-gray-800 dark:text-white">
            {{ new Date(page.date).toLocaleDateString() }}
          </h5>
          <p class="flex-1 text-center">
            {{ page.body.split(' ').length }} words
          </p>
        </div>
        <div
          v-if="state.expandedId === page.id"
          class="border-t border-gray-300 dark:border-gray-700 mt-2.5 p-2.5"
        >
          <p class="text-gray-600 dark:text-gray-400">
            {{ page.body }}
          </p>
          <button
            type="button"
            @click.stop
            class="mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Edit
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
