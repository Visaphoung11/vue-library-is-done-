<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">Library Login</h1>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="username"
            >Username</label
          >
          <input
            v-model="username"
            id="username"
            type="text"
            required
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-6">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="password"
            >Password</label
          >
          <input
            v-model="password"
            id="password"
            type="password"
            required
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>

        <p v-if="error" class="mt-4 text-red-500 text-sm text-center">
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const router = useRouter();
const { login } = useAuth();

const handleLogin = async () => {
  error.value = "";
  loading.value = true;

  const success = await login(username.value, password.value);

  loading.value = false;

  if (success) {
    router.push("/dashboard"); // Adjust path as needed
  } else {
    error.value = "Invalid username or password. Please try again.";
  }
};
</script>

<style scoped>
/* Optional: Add custom styles here if needed */
</style>
