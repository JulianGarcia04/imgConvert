<template>
  <div>
    <div class="lg:h-56 lg:w-56 h-52 w-52 relative">
      <image-card :src="src" :alt="alt"></image-card>
      <div
        class="
          flex
          justify-center
          items-center
          w-12
          h-12
          bg-button
          rounded-[50%]
          absolute
          right-[-20px]
          bottom-[-20px]
          cursor-pointer
        "
        @click="$emit('delete')"
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
    </div>
  </div>
</template>
<script setup>
import ImageCard from "./ImageCard.vue";

defineProps(["src", "alt"]);
defineEmits(["delete"]);
</script>
