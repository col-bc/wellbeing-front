<script setup>
import { defineProps } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Doughnut } from 'vue-chartjs/dist'

const props = defineProps({
  chartOptions: {
    type: Object,
    required: true
  },
  chartData: {
    type: Object,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
})

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)
</script>

<template>
  <Doughnut
    :chart-options="props.chartOptions"
    :chart-data="props.chartData"
    :width="props.width"
    :height="props.height"
  />
</template>
