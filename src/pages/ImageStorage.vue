<template>
  <section
    :class="isOpen ? `h-[90%]` : `h-[45%]`"
    class="flex flex-col items-center w-full bg-index lg:w-8/12 lg:rounded-t-2xl"
  >
    <header
      v-if="isScreenWidth"
      class="flex justify-center items-center w-11/12 h-[10%] p-3"
      :class="isOpen && `rotate-180`"
      @click="$emit('open')"
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
        class="feather feather-arrow-up"
      >
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    </header>
    <section
      class="flex justify-around flex-wrap gap-6 w-11/12 h-[90%] overflow-y-scroll"
      :class="!isScreenWidth && `pt-6`"
    >
      <post-image-card
        v-for="i in 10"
        :key="i"
        src="https://upload.wikimedia.org/wikipedia/commons/5/57/M31bobo.jpg"
      ></post-image-card>
    </section>
    <footer
      v-if="!isScreenWidth"
      class="flex justify-center items-center w-11/12 h-[10%]"
    >
      <button
        class="flex justify-center items-center rounded-[50%] bg-button border-none"
        :class="isOpen ? `w-14 h-14` : `w-11 h-11`"
        @click="$emit('open')"
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
          class="feather feather-arrow-up"
        >
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>
    </footer>
  </section>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import PostImageCard from "../components/PostImageCard.vue";

const $q = useQuasar();

const isScreenWidth = $q.screen.width <= 425;

defineEmits(["open"]);

defineProps(["isOpen"]);
</script>
