<script setup>
import { onMounted, reactive } from 'vue'
</script>

<template>
  <h1
    class="sm:text-center text-3xl font-black text-gray-800 mb-6 md:mb-12 lg:mb-24 dark:text-white"
  >
    Exercises for your Wellbeing
  </h1>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 my-12 items-stretch"
  >
    <div
      class="max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <router-link :to="{ name: 'exercises-breath' }">
        <img
          class="rounded-t-lg"
          src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
        />
      </router-link>
      <div class="p-5">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Relax with guided diaphragmatic breathing
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Spend a few minutes clearing your mind and focusing on your breathing.
          This is an effective exercise to help you relax and reduce stress in
          the moment.
        </p>
        <router-link
          :to="{ name: 'exercises-breath' }"
          class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
        >
          Get Started
          <svg
            aria-hidden="true"
            class="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>
