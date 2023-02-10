<template>
  <div class="grid place-items-center w-full h-screen lg:text-lg">
    <div class="flex justify-center w-full h-3/4 lg:w-2/5">
      <div class="flex flex-col lg:w-5/6" @click="handleReturn">
        <h1 class="text-white text-3xl font-bold">
          {{ isScreen ? `imgConvert` : `Welcome to imgConvert` }}
        </h1>
        <h1 v-if="!isScreen" class="text-white text-3xl font-bold">
          Please write the email
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
        <span>Please write the email for reset of the password</span>
        <text-field
          v-model="email"
          title="Email"
          type="email"
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
          Reset the password
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
            class="feather feather-rotate-ccw mx-3"
          >
            <polyline points="1 4 1 10 7 10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Swal from "sweetalert2";
import { resetPassword } from "../firebase/api";
import TextField from "components/TextField.vue";

const $q = useQuasar();
const router = useRouter();

const isScreen = ref($q.screen.width <= 425);

const email = ref("");

const handleSubmit = async function (e) {
  e.preventDefault();

  try {
    const request = await resetPassword(email.value);
    Swal.fire({
      position: "center",
      icon: "success",
      title: request.message,
      showConfirmButton: false,
      timer: 3000,
    }).then((res) => {
      router.push("/");
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      position: "center",
      icon: "error",
      title: error.message,
      showConfirmButton: false,
      timer: 3000,
    });
  }
};

const handleReturn = function () {
  router.back();
};
</script>
