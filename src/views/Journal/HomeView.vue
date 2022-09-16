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
      page.showDropdown = false
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
      class="inline-flex items-center py-3 px-5 text-base font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
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
    <ul class="divide-y divide-gray-200 dark:divide-gray-600">
      <li
        v-for="page of data.pages"
        :key="page.id"
        @click="
          state.expandedId === page.id
            ? (state.expandedId = null)
            : (state.expandedId = page.id)
        "
        class="p-2.5 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
        :class="{
          'bg-gray-200 dark:bg-gray-800': state.expandedId === page.id
        }"
      >
        <div class="w-full flex items-center justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6 mr-4 text-current"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <h5 class="text-lg font-medium text-gray-800 dark:text-white">
            {{ new Date(page.date).toLocaleDateString() }}
          </h5>
          <p class="flex-1 text-center">
            {{ page.body.split(' ').length }} words
          </p>
          <div class="relative">
            <button
              type="button"
              @click.stop="page.showDropdown = !page.showDropdown"
              class="p-3 rounded-full text-gray-900 bg-transparent hover:bg-black hover:bg-opacity-10 dark:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="css-i6dzq1"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
            <div
              v-show="page.showDropdown"
              @click.stop
              class="absolute right-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            >
              <ul
                class="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefault"
              >
                <li>
                  <a
                    href="#"
                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Edit page</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Add to favorites</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Delete page</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          v-if="state.expandedId === page.id"
          class="border-t border-gray-300 dark:border-gray-700 p-4"
        >
          <p class="mt-4 text-gray-800 dark:text-white" v-html="page.body"></p>
        </div>
      </li>
    </ul>
  </div>
</template>
