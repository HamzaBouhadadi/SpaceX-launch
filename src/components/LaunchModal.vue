<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <!-- En-tête -->
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl font-bold">{{ launch.name }}</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <span class="sr-only">Fermer</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Contenu -->
      <div class="space-y-6">
        <!-- Image et informations de base -->
        <div class="grid md:grid-cols-2 gap-6">
          <img
            v-if="launch.links.patch.large"
            :src="launch.links.patch.large"
            :alt="launch.name"
            class="w-full rounded-lg"
          />
          <div class="space-y-4">
            <p class="text-gray-600">
              {{ formatDate(launch.date_utc) }}
            </p>
            <p v-if="launch.details" class="text-gray-700">
              {{ launch.details }}
            </p>
            <a
              v-if="launch.links.article"
              :href="launch.links.article"
              target="_blank"
              class="text-spacex-blue hover:underline"
            >
              Lire l'article complet
            </a>
          </div>
        </div>

        <!-- Vidéo YouTube -->
        <div v-if="launch.links.youtube_id" class="space-y-4">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              v-model="showVideo"
              class="rounded border-gray-300 text-spacex-blue focus:ring-spacex-blue"
            />
            <span>Afficher la vidéo de la mission</span>
          </label>
          <YouTubeEmbed
            v-if="showVideo"
            :video-id="launch.links.youtube_id"
          />
        </div>

        <!-- Informations détaillées -->
        <div v-if="launchDetails" class="space-y-4 border-t pt-4">
          <p><strong>Lieu de lancement :</strong> {{ launchDetails.launchpad?.name }}</p>
          <div v-if="launchDetails.payloads.length">
            <strong>Chargements :</strong>
            <ul class="list-disc list-inside ml-4">
              <li v-for="payload in launchDetails.payloads" :key="payload.id">
                {{ payload.name }}
                <span class="text-gray-600">
                  (Clients: {{ payload.customers.join(', ') }})
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Launch, Payload, Launchpad } from '../types/launch'
import { spacexApi } from '../services/spacexApi'
import YouTubeEmbed from './YouTubeEmbed.vue'

const props = defineProps<{
  launch: Launch
}>()

defineEmits<{
  (e: 'close'): void
}>()

const showVideo = ref(false)
const launchDetails = ref<{
  launchpad?: Launchpad;
  payloads: Payload[];
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  })
}

onMounted(async () => {
  try {
    const [launchpad, payloads] = await Promise.all([
      spacexApi.getLaunchpad(props.launch.launchpad),
      spacexApi.getPayloads(props.launch.payloads)
    ])
    launchDetails.value = {
      launchpad,
      payloads
    }
  } catch (error) {
    console.error('Error fetching launch details:', error)
  }
})
</script>