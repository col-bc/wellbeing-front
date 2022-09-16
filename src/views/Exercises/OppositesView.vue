<script setup>
import { reactive, onMounted, watch } from 'vue'

const data = reactive({
  lines: [
    {
      id: 1,
      black: '',
      white: ''
    }
  ]
})
const state = reactive({
  loading: false,
  error: null,
  errorType: null
})

onMounted(() => {})

function checkLines() {
  for (var line of data.lines) {
    if (!!line.black && !!line.white) {
      // add strike through if both are filled
      const blackEl = document.getElementById('black-' + line.id)
      const whiteEl = document.getElementById('white-' + line.id)
      blackEl?.classList.add('line-through')
      whiteEl?.classList.add('line-through')
      // move to end of array
      var index = data.lines.indexOf(line)
      if (index > -1) {
        data.lines.splice(index, 1)
        data.lines.push(line)
      }
    }
  }
}

function addLine() {
  data.lines.push({
    id: data.lines.length + 1,
    black: '',
    white: ''
  })
}
</script>
<template>
  <h1
    class="sm:text-center text-3xl font-black text-gray-800 mb-6 md:mb-12 lg:mb-24 dark:text-white"
  >
    Black and White Thinking
  </h1>
  <p class="mb-6 mt-4 leading-loose text-gray-800 dark:text-white">
    Black and white thinking is a thought pattern that makes people think in
    absolutes. For instance, you may think you are either always right or the
    world's biggest failure. It's easy to fall into this trap, especially when
    we are feeling stressed or anxious. It's important to recognize when you are
    thinking in black and white terms and to try to think more flexibly. Im this
    exercise you'll write down an extreme and then it's opposite.
  </p>
  <table v-if="!!data.lines" class="w-full">
    <tr>
      <th class="text-left px-3 bg-black text-white font-bold py-2.5">
        Negative Affirmation
      </th>
      <th class="text-left px-3 bg-white text-black font-bold py-2.5">
        Positive Affirmation
      </th>
      <th></th>
    </tr>
    <tr v-for="line in data.lines" :key="line.id">
      <td class="bg-black text-white">
        <input
          type="text"
          :id="`black-${line.id}`"
          v-model="line.black"
          @blur="checkLines()"
          placeholder="Write something..."
          class="appearance-none w-full bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-500 text-white"
        />
      </td>
      <td class="bg-white text-black">
        <input
          type="text"
          :id="`white-${line.id}`"
          @keyup.enter="
            () => {
              // Add a new line if enter is pressed on last line
              if (line.id === data.lines.length) addLine()
            }
          "
          v-model="line.white"
          @blur="checkLines()"
          placeholder="Write something..."
          class="appearance-none w-full bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-500"
        />
      </td>
      <td>
        <button
          type="button"
          @click="deleteLine(line.id)"
          class="py-2 px-3 ml-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-emerald-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
            class="w-4 h-4 inline-block"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="text-right">
        <button
          type="button"
          @click="addLine()"
          class="py-2 px-3 w-full mt-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-emerald-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
            class="w-4 h-4 inline-block"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </td>
    </tr>
  </table>
</template>
