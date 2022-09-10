<script setup>
import useUserStore from '@/stores/user'
import axios from 'axios'
import { reactive, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LoaderComponent from '../../components/LoaderComponent.vue'

const userStore = useUserStore()
const route = useRoute()

const data = reactive({
  user: null,
  checkins: [],
  checkin: null,
  totals: null
})
const state = reactive({
  loading: true
})

onMounted(async () => {
  data.user = await userStore.fetchUser()
  if (route.name === 'read-all-check-ins') {
    state.loading = true
    try {
      const resp = await axios.get('/api/user/check-in', {
        headers: {
          Authorization: userStore.getToken
        }
      })
      if (!!resp.data) {
        data.checkins = resp.data.check_ins
        data.totals = resp.data.totals
      }
    } catch (error) {
      console.log(error)
    } finally {
      state.loading = false
    }
  } else if (route.name === 'read-check-in') {
    state.loading = true
    try {
      const resp = await axios.get(`/api/user/check-in/${route.params.id}`, {
        headers: {
          Authorization: userStore.getToken
        }
      })
      if (!!resp.data) {
        data.checkin = resp.data
      }
    } catch (error) {
      console.log(error)
    } finally {
      state.loading = false
    }
  }
})
watch(route, async () => {
  if (route.name === 'read-all-check-ins') {
    state.loading = true
    try {
      const resp = await axios.get('/api/user/check-in', {
        headers: {
          Authorization: userStore.getToken
        }
      })
      if (!!resp.data) {
        data.checkins = resp.data.check_ins
        data.totals = resp.data.totals
      }
    } catch (error) {
      console.log(error)
    } finally {
      state.loading = false
    }
  } else if (route.name === 'read-check-in') {
    state.loading = true
    try {
      const resp = await axios.get(`/api/user/check-in/${route.params.id}`, {
        headers: {
          Authorization: userStore.getToken
        }
      })
      if (!!resp.data) {
        data.checkin = resp.data
      }
    } catch (error) {
      console.log(error)
    } finally {
      state.loading = false
    }
  }
})
</script>

<template>
  <template v-if="$route.name === 'read-all-check-ins'">
    <div class="flex items-start justify-between mb-4">
      <h2 class="text-3xl font-black text-gray-800 mb-6 dark:text-white">
        Your Check-Ins
      </h2>
      <select
        class="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Choose a filter</option>
        <option value="US">Everything</option>
        <option value="CA">This month</option>
        <option value="FR">Previous month</option>
        <option value="DE">Previous 3 months</option>
        <option value="DE">Previous 6 months</option>
        <option value="DE">This year</option>
      </select>
    </div>

    <LoaderComponent v-if="state.loading" />
    <div v-else>
      <h4 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Overview
      </h4>
      <div
        class="mb-12 rounded-lg shadow border border-gray-300 dark:border-gray-700"
      >
        <div
          class="grid grid-cols-5 gap-2.5 p-2.5 divide-x divide-gray-400 dark:divide-gray-600"
        >
          <div class="flex items-center justify-center">
            <img src="@/assets/Icons/Face1.svg" class="w-12 h-12" />
            <span class="ml-2 text-xl font-bold text-gray-800 dark:text-white">
              {{ data.totals?.very_bad }}
            </span>
          </div>
          <div class="flex items-center justify-center">
            <img src="@/assets/Icons/Face2.svg" class="w-12 h-12" />
            <span class="ml-2 text-xl font-bold text-gray-800 dark:text-white">
              {{ data.totals?.bad }}
            </span>
          </div>
          <div class="flex items-center justify-center">
            <img src="@/assets/Icons/Face3.svg" class="w-12 h-12" />
            <span class="ml-2 text-xl font-bold text-gray-800 dark:text-white">
              {{ data.totals?.neutral }}
            </span>
          </div>
          <div class="flex items-center justify-center">
            <img src="@/assets/Icons/Face4.svg" class="w-12 h-12" />
            <span class="ml-2 text-xl font-bold text-gray-800 dark:text-white">
              {{ data.totals?.good }}
            </span>
          </div>
          <div class="flex items-center justify-center">
            <img src="@/assets/Icons/Face5.svg" class="w-12 h-12" />
            <span class="ml-2 text-xl font-bold text-gray-800 dark:text-white">
              {{ data.totals?.very_good }}
            </span>
          </div>
        </div>
      </div>

      <h4 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Everything
      </h4>
      <ul
        class="mb-12 rounded-lg border border-gray-300 shadow-sm divide-y divide-gray-300 dark:border-gray-700 dark:divide-gray-700"
      >
        <li
          v-for="ci of data.checkins"
          :key="ci.id"
          @click="
            $router.push({ name: 'read-check-in', params: { id: ci.id } })
          "
          class="first:rounded-t-lg last:rounded-b-lg p-2.5 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        >
          <div class="flex items-center justify-between">
            <img
              v-if="ci.rating === 1"
              src="@/assets/icons/Face1.svg"
              alt="Face 1"
              class="w-14 h-14 flex-shrink-0"
            />
            <img
              v-if="ci.rating === 2"
              src="@/assets/icons/Face2.svg"
              alt="Face 2"
              class="w-14 h-14 flex-shrink-0"
            />
            <img
              v-if="ci.rating === 3"
              src="@/assets/icons/Face3.svg"
              alt="Face 3"
              class="w-14 h-14 flex-shrink-0"
            />
            <img
              v-if="ci.rating === 4"
              src="@/assets/icons/Face4.svg"
              alt="Face 4"
              class="w-14 h-14 flex-shrink-0"
            />
            <img
              v-if="ci.rating === 5"
              src="@/assets/icons/Face5.svg"
              alt="Face 5"
              class="w-14 h-14 flex-shrink-0"
            />
            <p class="text-gray-800 dark:text-white">
              {{ new Date(ci.date).toLocaleDateString() }}
            </p>
            <p class="text-gray-800 dark:text-white">
              {{ JSON.parse(ci.symptoms).length }} Symptoms
            </p>
            <p class="text-gray-800 dark:text-white">
              {{ JSON.parse(ci.activities).length }} Activities
            </p>
          </div>
        </li>
      </ul>
    </div>
  </template>
  <template v-if="$route.name === 'read-check-in'">
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-black text-gray-800 mb-6 dark:text-white">
        Check-In
      </h2>
      <button
        @click="$router.go(-1)"
        type="button"
        class="inline-flex gap-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 fill-current"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
          />
        </svg>
        BACK
      </button>
    </div>
    <LoaderComponent v-if="state.loading" />
    <div v-else>
      <div class="flex flex-col divide-y divide-gray-200 dark:divide-y-gray-70">
        <div class="flex items-center gap-6 py-3">
          <label class="text-lg font-bold text-gray-800 dark:text-white"
            >Date</label
          >
          <p class="text-gray-800 dark:text-white">
            {{ new Date(data.checkin?.date).toLocaleDateString() }}
          </p>
        </div>
        <div class="flex items-center gap-6 py-3">
          <label class="text-lg font-bold text-gray-800 dark:text-white"
            >Rating</label
          >
          <img
            v-if="data.checkin?.rating === 1"
            src="@/assets/icons/Face1.svg"
            alt="Face 1"
            class="w-12 h-12"
          />
          <img
            v-if="data.checkin?.rating === 2"
            src="@/assets/icons/Face2.svg"
            alt="Face 2"
            class="w-12 h-12"
          />
          <img
            v-if="data.checkin?.rating === 3"
            src="@/assets/icons/Face3.svg"
            alt="Face 3"
            class="w-12 h-12"
          />
          <img
            v-if="data.checkin?.rating === 4"
            src="@/assets/icons/Face4.svg"
            alt="Face 4"
            class="w-12 h-12"
          />
          <img
            v-if="data.checkin?.rating === 5"
            src="@/assets/icons/Face5.svg"
            alt="Face 5"
            class="w-12 h-12"
          />
        </div>
        <div class="flex items-center gap-6 py-3">
          <label class="text-lg font-bold text-gray-800 dark:text-white"
            >Symptoms</label
          >
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="symptom of data.checkin?.symptoms"
              :key="symptom"
              class="text-gray-800 dark:text-white"
            >
              {{ symptom }}
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-6 py-3">
          <label class="text-lg font-bold text-gray-800 dark:text-white"
            >Activities</label
          >
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="activity of data.checkin?.activities"
              :key="activity"
              class="text-gray-800 dark:text-white"
            >
              {{ activity }}
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-6 py-3">
          <label class="text-lg font-bold text-gray-800 dark:text-white"
            >Notes</label
          >
          <p class="text-gray-800 dark:text-white">
            {{ data.checkin?.notes }}
          </p>
        </div>
      </div>
    </div>
  </template>
</template>
