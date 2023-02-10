<template>
  <div class="h-full w-full rounded-2xl">
    <img
      :src="src"
      :alt="alt"
      class="w-full h-full rounded-2xl object-contain"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";

defineProps(["src", "alt"]);
</script>
