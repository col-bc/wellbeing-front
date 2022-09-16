<script setup>
import { defineProps, ref, watch, defineEmits } from 'vue'

const emit = defineEmits(['update'])
const props = defineProps({
  showLabel: {
    type: Boolean,
    default: true
  },
  labelText: {
    type: String,
    default: 'Rating'
  },
  value: {
    type: Number,
    required: false
  }
})

const rating = ref(props.value)
watch(rating, (newRating) => {
  emit('update', newRating)
})
</script>

<template>
  <div>
    <label
      v-if="props.showLabel"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ props.labelText }}</label
    >
    <div class="flex items-center">
      <div>
        <input
          type="radio"
          v-model="rating"
          id="rating-1"
          name="rating"
          value="1"
          class="hidden peer"
        />
        <label
          for="rating-1"
          class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full rounded-l-lg border border-gray-300 cursor-pointer dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-4 peer-checked:border-emerald-600 peer-checked:text-emerald-600"
        >
          <img
            src="@/assets/icons/Face1.svg"
            alt="Face 1"
            class="w-24 h-24 flex-shrink-0"
          />
        </label>
      </div>
      <div>
        <input
          type="radio"
          v-model="rating"
          id="rating-2"
          name="rating"
          value="2"
          class="hidden peer"
        />
        <label
          for="rating-2"
          class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full border border-gray-300 cursor-pointer dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-4 peer-checked:border-emerald-600 peer-checked:text-emerald-600"
        >
          <img
            src="@/assets/icons/Face2.svg"
            alt="Face 2"
            class="w-24 h-24 flex-shrink-0"
          />
        </label>
      </div>
      <div>
        <input
          type="radio"
          v-model="rating"
          id="rating-3"
          name="rating"
          value="3"
          class="hidden peer"
        />
        <label
          for="rating-3"
          class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full border border-gray-300 cursor-pointer dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-4 peer-checked:border-emerald-600 peer-checked:text-emerald-600"
        >
          <img
            src="@/assets/icons/Face3.svg"
            alt="Face 3"
            class="w-24 h-24 flex-shrink-0"
          />
        </label>
      </div>
      <div>
        <input
          type="radio"
          v-model="rating"
          id="rating-4"
          name="rating"
          value="4"
          class="hidden peer"
        />
        <label
          for="rating-4"
          class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full border border-gray-300 cursor-pointer dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-4 peer-checked:border-emerald-600 peer-checked:text-emerald-600"
        >
          <img
            src="@/assets/icons/Face4.svg"
            alt="Face 4"
            class="w-24 h-24 flex-shrink-0"
          />
        </label>
      </div>
      <div>
        <input
          type="radio"
          v-model="rating"
          id="rating-5"
          name="rating"
          value="5"
          class="hidden peer"
        />
        <label
          for="rating-5"
          class="transition duration ease-linear inline-flex justify-between items-center p-1.5 w-full rounded-r-lg border border-gray-300 cursor-pointer dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-4 peer-checked:border-emerald-600 peer-checked:text-emerald-600"
        >
          <img
            src="@/assets/icons/Face5.svg"
            alt="Face 5"
            class="w-24 h-24 flex-shrink-0"
          />
        </label>
      </div>
    </div>
  </div>
</template>
