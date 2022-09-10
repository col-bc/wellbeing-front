<script setup>
import { onMounted, ref, watch } from 'vue'

const directions = ref('Inhale')
const isRunning = ref(false)

setInterval(() => {
  directions.value = directions.value === 'Inhale' ? 'Exhale' : 'Inhale'
}, 4000)

watch(isRunning, (val) => {
  if (val) {
    directions.value = 'Inhale'
  }
})
</script>
<template>
  <div class="flex flex-col w-full h-full">
    <h1
      class="sm:text-center text-3xl font-black text-gray-800 mb-6 md:mb-12 lg:mb-24 dark:text-white"
    >
      Diaphragmatic Breathing
    </h1>
    <p v-if="isRunning" class="text-gray-500 text-lg text-center font-semibold">
      {{ directions }}
    </p>
    <div class="flex-1 flex items-center justify-center">
      <div v-if="isRunning" class="watch-face">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
    <button
      type="button"
      @click="isRunning = !isRunning"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 mb-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:border-gray-600"
    >
      {{ isRunning ? 'Stop' : 'Start' }}
    </button>
  </div>
</template>

<style scoped>
.watch-face {
  height: 125px;
  width: 125px;
  animation: pulse 4s cubic-bezier(0.5, 0, 0.5, 1) alternate infinite;
}

.circle {
  height: 125px;
  width: 125px;
  border-radius: 50%;
  position: absolute;
  mix-blend-mode: screen;
  transform: translate(0, 0);
  animation: center 6s infinite;
}

.circle:nth-child(odd) {
  background: #61bea2;
}

.circle:nth-child(even) {
  background: #529ca0;
}

.circle:nth-child(1) {
  animation: circle-1 4s ease alternate infinite;
}

.circle:nth-child(2) {
  animation: circle-2 4s ease alternate infinite;
}

.circle:nth-child(3) {
  animation: circle-3 4s ease alternate infinite;
}

.circle:nth-child(4) {
  animation: circle-4 4s ease alternate infinite;
}

.circle:nth-child(5) {
  animation: circle-5 4s ease alternate infinite;
}

.circle:nth-child(6) {
  animation: circle-6 4s ease alternate infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.15) rotate(180deg);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes circle-1 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-35px, -50px);
  }
}

@keyframes circle-2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(35px, 50px);
  }
}

@keyframes circle-3 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-60px, 0);
  }
}

@keyframes circle-4 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(60px, 0);
  }
}

@keyframes circle-5 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-35px, 50px);
  }
}

@keyframes circle-6 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(35px, -50px);
  }
}
</style>
