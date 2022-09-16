<script setup>
import NavbarComponent from '../components/NavbarComponent.vue'
</script>

<template>
  <section class="min-h-screen bg-white dark:text-gray-300 dark:bg-gray-800">
    <NavbarComponent />
    <main class="container max-w-screen-xl px-4 mx-auto">
      <div
        class="flex flex-col md:flex-row items-start justify-around gap-12 py-12 md:py-24"
      >
        <img
          src="https://images.unsplash.com/photo-1422393682802-921122338109?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          class="w-full md:w-1/2 md:order-2 rounded-xl"
        />
        <div class="w-full md:w-1/2 md:order-1">
          <h1
            class="text-3xl md:text-5xl font-black leading-tight text-gray-800 dark:text-gray-300 mb-6"
          >
            Take care of your emotional wellbeing
          </h1>
          <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
            modi aspernatur et omnis autem, nemo, blanditiis illo fugiat rerum
            iste facere accusantium amet ducimus iusto vero cumque voluptate
            quisquam. Dolorum?
          </p>
          <div class="mt-8">
            <router-link
              to="/register"
              type="button"
              class="w-full md:w-auto inline-flex items-center justify-center py-3 px-5 text-lg font-semibold text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 shadow-lg shadow-emerald-700/30 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M9.33 11.5h2.17A4.5 4.5 0 0 1 16 16H8.999L9 17h8v-1a5.578 5.578 0 0 0-.886-3H19a5 5 0 0 1 4.516 2.851C21.151 18.972 17.322 21 13 21c-2.761 0-5.1-.59-7-1.625L6 10.071A6.967 6.967 0 0 1 9.33 11.5zM4 9a1 1 0 0 1 .993.883L5 10V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h2zm9.646-5.425L14 3.93l.354-.354a2.5 2.5 0 1 1 3.535 3.536L14 11l-3.89-3.89a2.5 2.5 0 1 1 3.536-3.535z"
                />
              </svg>
              <span class="ml-3">Get Started</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 pb-12">
        <div
          class="p-4 bg-gray-100 rounded-md inline-flex items-center gap-4 font-medium text-gray-800 dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 stroke-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M2 12h1"></path>
            <path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2"></path>
            <path
              d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z"
            ></path>
            <path d="M9 12h6"></path>
            <path
              d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z"
            ></path>
            <path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2"></path>
            <path d="M22 12h-1"></path>
          </svg>
          DBT based exercises
        </div>
        <div
          class="p-4 bg-gray-100 rounded-md inline-flex items-center gap-4 font-medium text-gray-800 dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 fill-current"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M16 18v-2h1a4 4 0 1 0-2.157-7.37A6 6 0 1 0 8 15.917v2.022A8.001 8.001 0 0 1 9 2a7.998 7.998 0 0 1 6.98 4.087A6 6 0 1 1 17 18h-1zm-5.768.732L12 16.964l1.768 1.768a2.5 2.5 0 1 1-3.536 0z"
            />
          </svg>
          Mindfulness training
        </div>
        <div
          class="p-4 bg-gray-100 rounded-md inline-flex items-center gap-4 font-medium text-gray-800 dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 fill-current"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path
              d="M5 3v16h16v2H3V3h2zm15.293 3.293l1.414 1.414L16 13.414l-3-2.999-4.293 4.292-1.414-1.414L13 7.586l3 2.999 4.293-4.292z"
            />
          </svg>
          Track your progress
        </div>
        <div
          class="p-4 bg-gray-100 rounded-md inline-flex items-center gap-4 font-medium text-gray-800 dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 fill-current"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M21 18H6a1 1 0 0 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16v16zM5 16.05c.162-.033.329-.05.5-.05H19V4H5v12.05zM16 9H8V7h8v2z"
            />
          </svg>
          Journaling
        </div>
      </div>
    </main>
  </section>
</template>
