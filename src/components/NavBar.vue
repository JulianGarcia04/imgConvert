<template>
  <nav
    class="flex justify-between items-center w-11/12 h-16 text-2xl font-bold"
  >
    <h1>imgConvert</h1>
    <div class="flex items-center">
      <div
        class="
          flex flex-col
          items-center
          justify-center
          rounded-t-[50%]
          w-16
          h-16
        "
        :class="isOpenMenu && isScreenWidth && `bg-index`"
      >
        <div
          class="
            flex
            justify-center
            items-center
            border-white border-2
            rounded-[50%]
          "
          @click="handleIsOpenMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-user"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
      <div v-if="!isScreenWidth" class="flex items-center">
        <h1>{{ currUser.displayName }}</h1>
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
          class="feather feather-log-out ml-4 cursor-pointer"
          @click="handleSignOut"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </div>
    </div>
  </nav>
  <header
    v-if="isOpenMenu && isScreenWidth"
    class="flex justify-center w-full bg-index text-2xl"
  >
    <div class="flex items-center w-11/12">
      <h1>{{ currUser.displayName }}</h1>
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
        class="feather feather-log-out ml-4 cursor-pointer"
        @click="handleSignOut"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    </div>
  </header>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useQuasar, Cookies } from "quasar";
import Swal from "sweetalert2";
import { SignOut, getCurrentUser } from "src/firebase/auth/api";

const $q = useQuasar();
const router = useRouter();

const isScreenWidth = ref($q.screen.width <= 425);

const isOpenMenu = ref(false);

const currUser = ref(getCurrentUser());

onBeforeMount(() => {
  if (!currUser.value) {
    router.push("/");
  }
});

function handleIsOpenMenu() {
  isOpenMenu.value = !isOpenMenu.value;
}

async function handleSignOut() {
  try {
    const request = await SignOut();
    Cookies.remove("session");
    Swal.fire({
      position: "center",
      icon: "success",
      title: request.message,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      router.push("/");
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
</script>
