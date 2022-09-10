<script setup>
import useUserStore from '@/stores/user'
import axios from 'axios'
import { computed, onMounted, reactive } from 'vue'
import LineChart from '@/components/LineChart.vue'
import DoughnutChart from '@/components/DoughnutChart.vue'
import BarChart from '@/components/BarChart.vue'
import LoaderComponent from '@/components/LoaderComponent.vue'

const userStore = useUserStore()

const data = reactive({
  user: null,
  totals: null,
  checkins: null
})
const state = reactive({
  loading: true
})
const charts = reactive({
  doughnutConfig: null,
  lineConfig: null,
  barConfig: null
})
onMounted(async () => {
  // load data from store and api
  data.user = await userStore.fetchUser()
  const user_resp = await axios.get('/api/user/check-in', {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  })
  data.totals = user_resp.data.totals
  data.checkins = user_resp.data.check_ins
  state.loading = false

  // create doughnut chart
  charts.doughnutConfig = {
    data: {
      labels: ['Very Bad', 'Bad', 'Neutral', 'Good', 'Very Good'],
      datasets: [
        {
          label: 'Ratings by total',
          data: [
            data.totals.very_bad,
            data.totals.bad,
            data.totals.neutral,
            data.totals.good,
            data.totals.very_good
          ],
          backgroundColor: [
            '#818CF8',
            '#C084FC',
            '#FBBF24',
            '#22D3EE',
            '#22C55E'
          ]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'left'
        }
      }
    }
  }

  // create line chart
  var dates = []
  var ratings = []
  var length = data.checkins.length < 30 ? data.checkins.length : 30
  for (var i = 0; i < length; i++) {
    dates.push(new Date(data.checkins[i].date).toLocaleDateString())
    ratings.push(data.checkins[i].rating.toString())
  }

  charts.lineConfig = {
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Ratings by date',
          data: ratings,
          backgroundColor: '#84cc16',
          borderColor: '#84cc16',
          tension: 0.5,
          pointRadius: 10,
          pointHoverRadius: 15
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
        y: {
          beginAtZero: false,
          ticks: {
            stepSize: 1,
            color: document.documentElement.classList.contains('dark')
              ? '#d4d4d8'
              : '#374151'
          },
          grid: {
            color: '#6b7280'
          }
        },
        x: {
          ticks: {
            color: document.documentElement.classList.contains('dark')
              ? '#d4d4d8'
              : '#374151'
          },
          grid: {
            color: '#6b7280'
          }
        }
      }
    }
  }

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

const getScore = computed(() => {
  if (data.checkins) {
    var sum = 0
    for (var i = 0; i < data.checkins.length; i++) {
      sum += data.checkins[i].rating
    }
    return ((sum / (data.checkins.length * 5)) * 100).toFixed(0)
  }
})
</script>
<template>
  <h2
    class="text-3xl font-black text-gray-800 mb-12 lg:mb-24 mb dark:text-white"
  >
    Dashboard
  </h2>
  <LoaderComponent v-if="state.loading" />
  <div
    v-else
    class="grid grid-cols-1 lg:grid-cols-2 items-stretch justify-center gap-12 mb-12"
  >
    <!-- Doughnut chart -->
    <div
      class="relative h-full flex flex-col p-6 gap-6 shadow-lg bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <h5
        class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Check-Ins by Rating
      </h5>
      <DoughnutChart
        v-if="charts.doughnutConfig"
        :chart-options="charts.doughnutConfig.options"
        :chart-data="charts.doughnutConfig.data"
        :width="400"
        :height="300"
      />
      <button
        type="button"
        class="absolute top-6 right-6 p-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </button>
    </div>
    <!-- Text stats -->
    <div
      class="relative h-full flex flex-col p-6 gap-6 shadow-lg bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <h5
        class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Wellbeing Score
      </h5>

      <div
        class="relative w-52 h-52 mx-auto bg-lime-500 inline-flex items-center justify-center rounded-full p-4 shadow-md shadow-lime-400/40"
      >
        <span
          class="absolute bg-white w-44 h-44 flex items-center justify-center rounded-full text-6xl font-bold dark:bg-gray-800"
          >{{ getScore }}</span
        >
      </div>
      <p class="text-gray-500 dark:text-gray-400">
        Your wellbeing score is based on your check-ins. It is calculated by
        dividing the sum of your rating scores by the maximum possible score.
      </p>
      <button
        type="button"
        class="absolute top-6 right-6 p-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </button>
    </div>
    <!-- Line chart -->
    <div
      class="lg:col-span-2 relative h-full flex flex-col p-6 gap-6 shadow-lg bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <h5
        class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Check-Ins by Date
      </h5>
      <LineChart
        v-if="!!charts.lineConfig"
        :chart-data="charts.lineConfig.data"
        :chart-options="charts.lineConfig.options"
      />
      <button
        type="button"
        class="absolute top-6 right-6 p-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </button>
    </div>
    <!-- Bar chart -->
    <div
      class="lg:col-span-2 relative h-full flex flex-col p-6 gap-6 shadow-lg bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <h5
        class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Check-Ins by Totals
      </h5>
      <BarChart
        v-if="!!charts.barConfig"
        :chart-data="charts.barConfig.data"
        :chart-options="charts.barConfig.options"
      />
      <button
        type="button"
        class="absolute top-6 right-6 p-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.progress-ring__circle {
  stroke-dasharray: 10 20;
}
</style>
