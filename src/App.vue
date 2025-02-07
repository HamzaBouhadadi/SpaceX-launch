<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-center text-spacex-blue mb-12">
        SpaceX Launches
      </h1>

      <!-- Prochain lancement -->
      <NextLaunch class="mb-12" />

      <!-- Filtre et Liste des lancements -->
      <div class="space-y-8">
        <select
          v-model="launchFilter"
          class="w-full max-w-xs px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-spacex-blue"
        >
          <option value="all">Tous les lancements</option>
          <option value="success">Lancements réussis</option>
          <option value="failed">Lancements échoués</option>
        </select>

        <LaunchList
          :filter="launchFilter"
          @select-launch="openLaunchModal"
        />
      </div>

      <!-- Modal de détail du lancement -->
      <LaunchModal
        v-if="selectedLaunch"
        :launch="selectedLaunch"
        @close="selectedLaunch = null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Launch } from './types/launch'
import NextLaunch from './components/NextLaunch.vue'
import LaunchList from './components/LaunchList.vue'
import LaunchModal from './components/LaunchModal.vue'

const launchFilter = ref<'all' | 'success' | 'failed'>('all')
const selectedLaunch = ref<Launch | null>(null)

const openLaunchModal = (launch: Launch) => {
  selectedLaunch.value = launch
}
</script>