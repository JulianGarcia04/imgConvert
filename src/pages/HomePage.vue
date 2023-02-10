<template>
  <div class="flex flex-row justify-center w-full h-screen">
    <nav-bar></nav-bar>
    <form
      v-if="!isOpen"
      class="
        flex flex-col
        items-center
        justify-around
        w-11/12
        h-[45%]
        text-2xl
        lg:w-5/12
      "
      @submit="handlerSubmit($event)"
    >
      <div
        class="flex items-center justify-center w-full h-4/5 overflow-x-scroll"
      >
        <label
          v-if="!urlImageInput"
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
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
            <polyline points="16 16 12 12 8 16"></polyline>
          </svg>
        </label>
        <pre-image-card
          v-else
          :src="urlImageInput"
          @delete="handlerDelete"
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
      @open="handlerOpen"
    ></image-storage>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import Swal from "sweetalert2";
import {
  uploadImage,
  getCurrentUser,
  addUrl,
  getAllImages,
} from "../firebase/api";
import NavBar from "components/NavBar.vue";
import PreImageCard from "components/PreImageCard.vue";
import ImageStorage from "./ImageStorage.vue";

const currUser = ref(getCurrentUser());

const imageInput = ref({});
const urlImageInput = ref("");
const isEmptyInput = ref(true);

const isOpen = ref(false);

const isFetching = ref(true);
const isEmpty = ref(false);
const images = ref([]);

watch(isFetching, async (newVal, oldVal) => {
  if (newVal) {
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
  imageInput.value = e.target.files[0];
  isEmptyInput.value = false;
  urlImageInput.value = URL.createObjectURL(e.target.files[0]);
};

const handlerDelete = function () {
  imageInput.value = {};
  isEmptyInput.value = true;
  urlImageInput.value = "";
};

//upload image to server
const handlerSubmit = async function (e) {
  e.preventDefault();
  try {
    const reqUploadImage = await uploadImage(
      imageInput.value,
      currUser.value.displayName,
      isEmptyInput.value
    );
    const reqAddUrl = await addUrl(
      reqUploadImage.url,
      currUser.value.uid,
      imageInput.value.name
    );
    Swal.fire({
      position: "center",
      icon: "success",
      title: reqUploadImage.message,
      showConfirmButton: false,
      timer: 3000,
    }).then(() => {
      handlerDelete();
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
};
</script>
