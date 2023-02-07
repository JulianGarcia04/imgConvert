<template>
  <div class="grid place-items-center w-full h-screen lg:text-lg">
    <div class="flex justify-center w-full h-3/5 lg:w-2/5">
      <div class="flex flex-col lg:w-5/6" @click="handleSecondPage">
        <h1 class="text-white text-3xl font-bold">
          {{ isScreen ? `imgConvert` : `Welcome to imgConvert` }}
        </h1>
        <h1 v-if="!isScreen" class="text-white text-3xl font-bold">
          Please register you
        </h1>
      </div>
      <form
        class="flex flex-col items-center justify-around bg-index h-5/6 w-full lg:rounded-lg"
        @submit="
          isSecondPage
            ? handleSubmitSecondPage($event)
            : handleSubmitFirstPage($event)
        "
      >
        <div
          v-if="!isSecondPage"
          class="flex flex-col items-center justify-around w-full h-full"
        >
          <text-field
            v-model="username"
            title="Username"
            type="text"
            minlength="5"
            required
          ></text-field>
          <text-field
            v-model="fullname"
            title="Fullname"
            type="text"
            required
          ></text-field>
          <button
            class="flex justify-center items-center w-11/12 bg-button rounded-md h-11 lg:w-10/12"
          >
            Continue
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
              class="feather feather-arrow-right"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <router-link to="/" class="text-button"
            >Do you have account?</router-link
          >
        </div>
        <div
          v-else
          class="flex flex-col items-center justify-around w-full h-full"
        >
          <text-field
            v-model="email"
            title="Email"
            type="email"
            required
          ></text-field>
          <text-field
            v-model="password"
            title="Password"
            type="password"
            minlength="10"
            required
          ></text-field>
          <button
            class="flex justify-center items-center w-11/12 bg-button rounded-md h-11 lg:w-10/12"
          >
            Sign Up
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
              class="feather feather-log-in"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
          </button>
          <router-link to="/" class="text-button"
            >Do you have account?</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import Swal from "sweetalert2";
import { useQuasar } from "quasar";
import { useRouter, RouterLink } from "vue-router";
import { ref } from "vue";
import TextField from "../components/TextField.vue";
import { singUp } from "../firebase/api";

const router = useRouter();
const $q = useQuasar();

const username = ref("");
const fullname = ref("");
const email = ref("");
const password = ref("");

const isSecondPage = ref(false);
const isScreen = $q.screen.width <= 425;

async function handleSubmitSecondPage(e) {
  e.preventDefault();
  try {
    const request = await singUp({
      username: username.value,
      fullname: fullname.value,
      email: email.value,
      password: password.value,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: request.message,
      showConfirmButton: false,
      timer: 1000,
    }).then((res) => {
      router.push("/home");
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

function handleSubmitFirstPage(e) {
  e.preventDefault();
  isSecondPage.value = !isSecondPage.value;
}

function handleSecondPage() {
  isSecondPage.value = false;
}
</script>
