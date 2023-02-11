<template>
  <div class="flex flex-row justify-center w-full h-screen">
    <suspense>
      <nav-bar></nav-bar>

      <template #fallback> <q-skeleton class="w-11/12 h-16" square /></template>
    </suspense>
    <form
      v-if="!isOpen"
      class="
        flex flex-col
        items-center
        justify-around
        w-11/12
        h-[40%]
        text-2xl
        lg:w-5/12
      "
      @submit="handlerSubmit($event)"
    >
      <q-inner-loading
        v-if="isSubmit"
        :showing="isSubmit"
        label="Please wait..."
        label-class="text-white"
        label-style="font-size: 1.1em"
        class="w-full h-2/4"
      />

      <div
        v-else
        :class="imagesInput.length === 0 && `justify-center`"
        class="
          flex
          items-center
          flex-nowrap
          gap-6
          w-full
          h-4/5
          overflow-x-scroll
        "
      >
        <div>
          <label
            for="image-input"
            class="
              flex
              justify-center
              items-center
              border-button border-2
              h-52
              w-52
              rounded-2xl
              lg:h-56 lg:w-56
              cursor-pointer
            "
          >
            <input
              type="file"
              id="image-input"
              class="hidden"
              accept=".jpg, .jpeg, .png, .svg, .webp"
              @change="handleImageInput($event)"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2B4BF4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-upload-cloud"
            >
              <polyline points="16 16 12 12 8 16"></polyline>
              <line x1="12" y1="12" x2="12" y2="21"></line>
              <path
                d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
              ></path>
              <polyline points="16 16 12 12 8 16"></polyline>
            </svg>
          </label>
        </div>
        <pre-image-card
          v-for="image in imagesInput"
          :key="image.id"
          :src="image.url"
          @delete="handlerDelete(image.id)"
        ></pre-image-card>
      </div>
      <button class="bg-button rounded-lg w-full h-14">Upload</button>
    </form>
    <image-storage
      :is-open="isOpen"
      :images="images"
      :is-empty="isEmpty"
      :username="currUser.displayName"
      :handle-fetching="handleFetching"
      :isLoading="isLoading"
      @open="handlerOpen"
    ></image-storage>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, defineAsyncComponent, Suspense } from "vue";
import Swal from "sweetalert2";
import { v4 } from "uuid";
import { uploadImages } from "src/firebase/storage/api";
import { addUrls, getAllImages } from "src/firebase/db/api";
import { getCurrentUser } from "src/firebase/auth/api";
import PreImageCard from "components/PreImageCard.vue";
import ImageStorage from "./ImageStorage.vue";
const NavBar = defineAsyncComponent(() => import("components/NavBar.vue"));

const currUser = ref(getCurrentUser());

const imagesInput = ref([]);
const isSubmit = ref(false);

const isOpen = ref(false);

const isFetching = ref(true);
const isLoading = ref(true);
const isEmpty = ref(false);
const images = ref([]);

watch(isFetching, async (newVal, oldVal) => {
  if (newVal) {
    isLoading.value = true;
    try {
      const request = await getAllImages(currUser.value.uid);
      isEmpty.value = request.isEmpty;
      images.value = request.data;
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 3000,
      });
    }
    isFetching.value = false;
    isLoading.value = false;
  }
});

onMounted(async () => {
  if (isFetching.value && currUser.value) {
    try {
      const request = await getAllImages(currUser.value.uid);
      isEmpty.value = request.isEmpty;
      images.value = request.data;
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 3000,
      });
    }
    isFetching.value = false;
    isLoading.value = false;
  }
});

const handleFetching = () => {
  isFetching.value = !isFetching.value;
};

const handlerOpen = function () {
  isOpen.value = !isOpen.value;
};

const handleImageInput = function (e) {
  const type = e.target.files[0].type;
  if (!type.startsWith("image")) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "The file must an image 🤨",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  const id = v4();
  imagesInput.value.push({
    id,
    file: e.target.files[0],
    url: URL.createObjectURL(e.target.files[0]),
  });
};

const handlerDelete = function (id) {
  const index = imagesInput.value.findIndex((image) => image.id === id);
  imagesInput.value.splice(index, 1);
};

//upload image to server
const handlerSubmit = async function (e) {
  e.preventDefault();
  try {
    isSubmit.value = true;
    const reqUploadImage = await uploadImages(
      imagesInput.value,
      currUser.value.displayName
    );
    const reqAddUrl = await addUrls(reqUploadImage.urls, currUser.value.uid);
    Swal.fire({
      position: "center",
      icon: "success",
      title: reqUploadImage.message,
      showConfirmButton: false,
      timer: 3000,
    }).then(() => {
      imagesInput.value.length = 0;
      isFetching.value = true;
    });
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: error.message,
      showConfirmButton: false,
      timer: 3000,
    });
  }
  isSubmit.value = false;
};
</script>
