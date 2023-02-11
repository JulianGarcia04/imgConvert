<template>
  <section
    :class="isOpen ? `h-[90%]` : `h-[45%]`"
    class="
      flex flex-col
      items-center
      w-full
      bg-index
      lg:w-8/12 lg:rounded-t-2xl
    "
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
      class="
        flex
        justify-around
        flex-wrap
        gap-6
        w-11/12
        h-[90%]
        overflow-y-scroll
      "
      :class="!isScreenWidth && `pt-6`"
    >
      <h1 v-if="isEmpty">No tienes images guardadas</h1>
      <q-skeleton
        v-else-if="isLoading"
        v-for="i in 5"
        :key="i"
        class="lg:h-56 lg:w-56 h-40 w-40 rounded-2xl"
        square
      />
      <post-image-card
        v-else
        v-for="image in images"
        :key="image.id"
        :src="image.url"
        @delete="handleDelete(image.id, username, image.filename)"
        @download="handleDownload(image.url, image.filename)"
      ></post-image-card>
    </section>
    <footer
      v-if="!isScreenWidth"
      class="flex justify-center items-center w-11/12 h-[10%]"
    >
      <button
        class="
          flex
          justify-center
          items-center
          rounded-[50%]
          bg-button
          border-none
        "
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
import Swal from "sweetalert2";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { deleteImage } from "src/firebase/storage/api";
import { deleteUrl } from "src/firebase/db/api";
import PostImageCard from "../components/PostImageCard.vue";

const $q = useQuasar();

const isScreenWidth = ref($q.screen.width <= 425);

defineEmits(["open"]);

const props = defineProps([
  "isOpen",
  "isEmpty",
  "images",
  "username",
  "handleFetching",
  "isLoading",
]);

const handleDelete = async function (id, username, filename) {
  Swal.fire({
    title: "do you want to delete the image?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const reqDeleteUrl = await deleteUrl(id);
        const reqDeleteImage = await deleteImage(username, filename);
        Swal.fire({
          position: "center",
          icon: "success",
          title: reqDeleteImage.message,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          props.handleFetching();
        });
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  });
};

const handleDownload = async (url, filename) => {
  const data = new Blob([url], { type: "text/plain" });
  const downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = URL.createObjectURL(data);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
</script>
