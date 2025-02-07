<template>
  <div class="space-y-4">
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-spacex-blue mx-auto"></div>
    </div>
    
    <div v-else-if="launches.length === 0" class="text-center py-8">
      Aucun lancement trouvé
    </div>
    
    <div
      v-else
      v-for="launch in launches"
      :key="launch.id"
      @click="$emit('select-launch', launch)"
      class="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-semibold">{{ launch.name }}</h3>
          <p class="text-gray-600">{{ formatDate(launch.date_utc) }}</p>
        </div>
        <div
          :class="[
            'px-4 py-2 rounded-full text-sm font-semibold',
            launch.success
              ? 'bg-green-100 text-green-800'
              : launch.success === false
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
          ]"
        >
          {{ getLaunchStatus(launch.success) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Launch } from '../types/launch'
import { spacexApi } from '../services/spacexApi'

const props = defineProps<{
  filter: 'all' | 'success' | 'failed'
}>()

defineEmits<{
  (e: 'select-launch', launch: Launch): void
}>()

const launches = ref<Launch[]>([])
const loading = ref(true)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR')
}

const getLaunchStatus = (success: boolean | null) => {
  if (success === true) return 'Réussi'
  if (success === false) return 'Échoué'
  return 'En attente'
}

const fetchLaunches = async () => {
  loading.value = true
  try {
    const success = props.filter === 'all' 
      ? undefined 
      : props.filter === 'success'
    launches.value = await spacexApi.getLatestLaunches(10, success)
  } catch (error) {
    console.error('Error fetching launches:', error)
  } finally {
    loading.value = false
  }
}

watch(() => props.filter, fetchLaunches, { immediate: true })
</script>