<template>
  <div v-if="nextLaunch" class="bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-bold mb-4">Prochain lancement</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <h3 class="text-xl font-semibold mb-2">{{ nextLaunch.name }}</h3>
        <p class="text-gray-600">
          {{ formatDate(nextLaunch.date_utc) }}
        </p>
      </div>
      <div class="text-right">
        <div class="text-3xl font-bold text-spacex-blue">
          {{ countdown }}
        </div>
        <p class="text-gray-600">secondes restantes</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Launch } from '../types/launch'
import { spacexApi } from '../services/spacexApi'

const nextLaunch = ref<Launch | null>(null)
const countdown = ref<number>(0)
let intervalId: number | null = null

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const updateCountdown = () => {
  if (!nextLaunch.value) return
  const launchDate = new Date(nextLaunch.value.date_utc).getTime()
  const now = new Date().getTime()
  const distance = launchDate - now
  countdown.value = Math.floor(distance / 1000)
}

onMounted(async () => {
  try {
    nextLaunch.value = await spacexApi.getNextLaunch()
    updateCountdown()
    intervalId = setInterval(updateCountdown, 1000)
  } catch (error) {
    console.error('Error fetching next launch:', error)
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>