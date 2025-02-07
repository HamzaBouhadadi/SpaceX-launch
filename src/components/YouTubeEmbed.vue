<template>
  <div class="relative pb-[56.25%] h-0">
    <iframe
      :src="embedUrl"
      class="absolute top-0 left-0 w-full h-full"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  videoId: string
}>()

const embedUrl = `https://www.youtube.com/embed/${props.videoId}`
</script>