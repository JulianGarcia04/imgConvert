<template>
  <div class="lg:h-56 lg:w-56 h-40 w-40 relative">
    <image-card :src="src" :alt="alt"></image-card>
    <div
      class="flex justify-center items-center w-12 h-12 bg-button rounded-[50%] absolute right-[-20px] bottom-[-20px]"
      @click="emit('delete')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-trash-2"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        ></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </div>
    <div
      class="flex justify-center items-center w-12 h-12 bg-button rounded-[50%] absolute left-[-20px] bottom-[-20px]"
      @click="emit('download')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-download-cloud"
      >
        <polyline points="8 17 12 21 16 17"></polyline>
        <line x1="12" y1="12" x2="12" y2="21"></line>
        <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>
      </svg>
    </div>
  </div>
</template>
<script setup>
import ImageCard from "./ImageCard.vue";

defineProps(["src", "alt"]);
defineEmits(["delete", "download"]);
</script>
