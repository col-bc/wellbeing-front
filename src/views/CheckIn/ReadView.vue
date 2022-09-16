<script setup>
import BarChart from '@/components/BarChart.vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
import useUserStore from '@/stores/user'
import axios from 'axios'
import { onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()

const data = reactive({
  user: null,
  checkins: [],
  checkin: null,
  totals: null
})
const charts = reactive({
  ratings: null,
  symptoms: null,
  activities: null
})
const state = reactive({
  loading: true,
  showFilters: false,
  page: 0,
  pages: 0,
  limit: 10,
  showNextPage: true
})

async function fetchData() {
  if (route.name === 'read-all-check-ins') {
    state.loading = true
    try {
      const resp = await axios.get(
        `/api/user/check-in?page=${state.page}&limit=${state.limit}`,
        {
          headers: {
            Authorization: userStore.getToken
          }
        }
      )
      if (!!resp.data) {
        data.checkins = resp.data.check_ins
        data.totals = resp.data.totals
        state.page = resp.data.page
        state.pages = resp.data.pages
        state.showNextPage = resp.data.has_next
      }
    } catch (error) {
      console.log(error)
    } finally {
      data.checkins.reverse()
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
}

onMounted(async () => {
  data.user = await userStore.fetchUser()
  await fetchData()

  // create bar chart
  charts.barConfig = {
    data: {
      labels: ['Very Bad', 'Bad', 'Neutral', 'Good', 'Very Good'],
      datasets: [
        {
          backgroundColor: [
            '#818CF8',
            '#C084FC',
            '#FBBF24',
            '#22D3EE',
            '#22C55E'
          ],
          data: [
            data.totals.very_bad,
            data.totals.bad,
            data.totals.neutral,
            data.totals.good,
            data.totals.very_good
          ]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            color: '#6b7280'
          },
          ticks: {
            color: document.documentElement.classList.contains('dark')
              ? '#d4d4d8'
              : '#374151'
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#6b7280'
          },
          ticks: {
            stepSize: 1,
            color: document.documentElement.classList.contains('dark')
              ? '#d4d4d8'
              : '#374151'
          }
        }
      }
    }
  }
})
watch(route, async () => {
  await fetchData()
  // create bar chart
  charts.barConfig = {
    data: {
      labels: ['Very Bad', 'Bad', 'Neutral', 'Good', 'Very Good'],
      datasets: [
        {
          backgroundColor: [
            '#818CF8',
            '#C084FC',
            '#FBBF24',
            '#22D3EE',
            '#22C55E'
          ],
          data: [
            data.totals.very_bad,
            data.totals.bad,
            data.totals.neutral,
            data.totals.good,
            data.totals.very_good
          ]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            color: '#6b7280'
          },
          ticks: {
            color: document.documentElement.classList.contains('dark')
              ? '#d4d4d8'
              : '#374151'
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#6b7280'
          },
          ticks: {
            stepSize: 1,
            color: document.documentElement.classList.contains('dark')
              ? '#d4d4d8'
              : '#374151'
          }
        }
      }
    }
  }
})

function nextPage() {
  state.page += 1
  fetchData()
}

function prevPage() {
  state.page -= 1
  fetchData()
}
</script>

<template>
  <template v-if="$route.name === 'read-all-check-ins'">
    <div class="flex items-start justify-between mb-4">
      <h2 class="text-3xl font-black text-gray-800 mb-6 dark:text-white">
        Your Check-Ins
      </h2>
      <button
        type="button"
        class="py-2.5 px-5 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
          class="w-4 h-4 mr-4"
        >
          <polygon
            points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
          ></polygon>
        </svg>
        Filters
      </button>
    </div>

    <LoaderComponent v-if="state.loading" />
    <div v-else>
      <div class="grid gird-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12">
        <!-- Bar chart -->
        <div
          class="relative h-full flex flex-col p-4 gap-4 shadow-lg bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <h4 class="text-xl font-bold text-gray-800 dark:text-white">
            Check In's by Rating
          </h4>
          <BarChart
            v-if="!!charts.barConfig"
            :chart-data="charts.barConfig.data"
            :chart-options="charts.barConfig.options"
          />
        </div>
        <!-- Totals -->
        <div
          class="relative h-full flex flex-col p-6 gap-6 shadow-lg bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <div
            class="flex flex-col gap-4 p-4 divide-y divide-gray-400 dark:divide-gray-600"
          >
            <div class="flex items-center justify-around">
              <img src="@/assets/Icons/Face1.svg" class="w-12 h-12" />
              <span class="text-gray-500 w-32 text-center dark:text-gray-400"
                >Very Bad</span
              >
              <span class="text-xl font-bold text-gray-800 dark:text-white">
                {{ data.totals?.very_bad }}
              </span>
            </div>
            <div class="flex items-center justify-around">
              <img src="@/assets/Icons/Face2.svg" class="w-12 h-12" />
              <span class="text-gray-500 w-32 text-center dark:text-gray-400"
                >Bad</span
              >
              <span
                class="ml-2 text-xl font-bold text-gray-800 dark:text-white"
              >
                {{ data.totals?.bad }}
              </span>
            </div>
            <div class="flex items-center justify-around">
              <img src="@/assets/Icons/Face3.svg" class="w-12 h-12" />
              <span class="text-gray-500 w-32 text-center dark:text-gray-400"
                >Neutral</span
              >
              <span
                class="ml-2 text-xl font-bold text-gray-800 dark:text-white"
              >
                {{ data.totals?.neutral }}
              </span>
            </div>
            <div class="flex items-center justify-around">
              <img src="@/assets/Icons/Face4.svg" class="w-12 h-12" />
              <span class="text-gray-500 w-32 text-center dark:text-gray-400"
                >Good</span
              >
              <span
                class="ml-2 text-xl font-bold text-gray-800 dark:text-white"
              >
                {{ data.totals?.good }}
              </span>
            </div>
            <div class="flex items-center justify-around">
              <img src="@/assets/Icons/Face5.svg" class="w-12 h-12" />
              <span class="text-gray-500 w-32 text-center dark:text-gray-400"
                >Very Good</span
              >
              <span
                class="ml-2 text-xl font-bold text-gray-800 dark:text-white"
              >
                {{ data.totals?.very_good }}
              </span>
            </div>
            <div
              class="flex items-center justify-around bg-gray-100 dark:bg-gray-700"
            >
              <div class="w-12 h-12 block"></div>
              <span class="text-gray-500 w-32 text-center dark:text-white"
                >TOTAL</span
              >
              <span
                class="ml-2 text-xl font-bold text-gray-800 dark:text-white"
              >
                {{ data.checkins?.length }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-start justify-between">
        <h4 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Everything
        </h4>
        <div class="relative">
          <button
            type="button"
            @click="state.showFilters = !state.showFilters"
            class="inline-flex items-center py-2 px-3 w-full text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-emerald-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Filters
            <svg
              class="ml-2 w-4 h-4"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            v-if="state.showFilters"
            class="absolute mt-4 right-0 z-10 w-52 p-2 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          >
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                # of Check Ins
              </label>
              <input
                type="number"
                v-model="state.limit"
                class="bg-transparent border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                placeholder="Limit"
              />
            </div>
          </div>
        </div>
      </div>
      <ul class="mb-12 divide-y divide-gray-200 dark:divide-gray-600">
        <li
          v-for="ci of data.checkins"
          :key="ci.id"
          @click="
            $router.push({ name: 'read-check-in', params: { id: ci.id } })
          "
          class="p-2.5 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
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
              {{
                new Date(ci.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })
              }}
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
      <div class="flex flex-col items-center mb-12">
        <p class="text-gray-700 dark:text-gray-300">
          Page {{ state.page }} of {{ state.pages }}
        </p>
        <!-- Buttons -->
        <div class="inline-flex mt-2 xs:mt-0">
          <button
            @click="prevPage"
            class="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Prev
          </button>
          <button
            @click="nextPage"
            class="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
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
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        BACK
      </button>
    </div>
    <LoaderComponent v-if="state.loading" />
    <div v-else>
      <div class="flex flex-col divide-y divide-gray-200 dark:divide-gray-600">
        <div class="flex items-center gap-6 py-3">
          <label class="text-lg font-bold text-gray-800 dark:text-white"
            >Date</label
          >
          <p class="text-gray-800 dark:text-white">
            {{
              new Date(data.checkin?.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                year: 'numeric',
                day: 'numeric'
              })
            }}
            at
            {{
              new Date(data.checkin?.date).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric'
              })
            }}
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
