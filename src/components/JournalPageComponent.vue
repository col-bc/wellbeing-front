<script setup>
import axios from 'axios'
import LoaderComponent from '@/components/LoaderComponent.vue'
import { onMounted, reactive, defineProps } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  page: {
    type: Object,
    required: false
  },
  mode: {
    type: String,
    default: 'view'
  }
})

const data = reactive({
  page: null,
  id: null,
  date: null,
  body: null
})

onMounted(async () => {
  if (props.mode === 'edit' || props.mode === 'view') {
    data.page = props.page
    data.id = data.page.id
    data.date = data.page.date
    data.body = data.page.body
  } else if (props.mode === 'create') {
    data.date = new Date().toISOString().split('T')[0]
  }
})
</script>

<template>
  {{ data.page }}
  {{ props.mode }}
</template>
