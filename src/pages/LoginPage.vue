<template>
  <div class="grid place-items-center w-full h-screen lg:text-lg">
    <div class="flex justify-center w-full h-3/4 lg:w-2/5">
      <div class="flex flex-col lg:w-5/6">
        <h1 class="text-white text-3xl font-bold">
          {{ isScreen ? `imgConvert` : `Welcome to imgConvert` }}
        </h1>
        <h1 v-if="!isScreen" class="text-white text-3xl font-bold">
          Please log in
        </h1>
      </div>
      <form
        class="
          flex flex-col
          items-center
          justify-around
          bg-index
          h-5/6
          w-full
          lg:rounded-lg
        "
        @submit="handleSubmit($event)"
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
          required
        ></text-field>
        <button
          class="
            flex
            justify-center
            items-center
            w-11/12
            bg-button
            rounded-md
            h-11
            lg:w-10/12
          "
        >
          Sign In
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
        <button
          type="button"
          class="
            flex
            justify-center
            items-center
            w-11/12
            bg-white
            rounded-md
            h-11
            lg:w-10/12
            text-black
          "
          @click="handleSignInWithGoogle"
        >
          Auth with Google Account
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
            class="feather feather-at-sign mx-3"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
          </svg>
        </button>
        <button
          type="button"
          class="
            flex
            justify-center
            items-center
            w-11/12
            bg-white
            rounded-md
            h-11
            lg:w-10/12
            text-black
          "
          @click="handleSignInWithFacebook"
        >
          Auth with facebook account
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
            class="feather feather-facebook mx-3"
          >
            <path
              d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
            ></path>
          </svg>
        </button>
        <router-link to="/remember" class="text-button underline"
          >Don't you remember the password ?</router-link
        >
        <router-link to="/register" class="text-button underline"
          >Don't you have account?</router-link
        >
      </form>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useRouter, RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import {
  singIn,
  getCurrentUser,
  signInWithGoogle,
  signInWithFacebook,
} from "../firebase/api";
import TextField from "../components/TextField.vue";

const router = useRouter();
const $q = useQuasar();

const email = ref("");
const password = ref("");
const isScreen = ref($q.screen.width <= 425);

const isSignIn = ref(getCurrentUser());

onMounted(() => {
  if (isSignIn.value) {
    router.push("/home");
  }
});

async function handleSubmit(e) {
  e.preventDefault();
  try {
    const request = await singIn({
      email: email.value,
      password: password.value,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: request.message,
      showConfirmButton: false,
      timer: 1500,
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

async function handleSignInWithGoogle() {
  try {
    const request = await signInWithGoogle();
    Swal.fire({
      position: "center",
      icon: "success",
      title: request.message,
      showConfirmButton: false,
      timer: 3000,
    }).then((res) => {
      router.push("/home");
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
}

async function handleSignInWithFacebook() {
  try {
    const request = await signInWithFacebook();
    Swal.fire({
      position: "center",
      icon: "success",
      title: request.message,
      showConfirmButton: false,
      timer: 3000,
    }).then((res) => {
      router.push("/home");
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
}
</script>
