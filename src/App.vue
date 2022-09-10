<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

onMounted(() => {
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <RouterView />
  <div id="modals-container"></div>
</template>
