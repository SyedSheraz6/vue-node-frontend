<template>
  <v-container>
    <v-snackbar v-model="toast.open" :color="toast.color" location="top" rounded="pill" elevation="24">
      <span>{{ toast.message }}</span>
    </v-snackbar>
    <v-form @submit.prevent="reset">
      <v-card title="Reset Password" subtitle="Enter a new password." class="pa-4">
        <v-card-text>
          <v-text-field v-model="password" color="primary" label="Password" variant="outlined"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn :loading="loading" type="submit" variant="elevated" block color="teal">
            Reset Password
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { resetPassword } from '@/services/auth';

const password = ref(null)
const loading = ref(false)

const toast = reactive({
  open: false,
  message: null,
  color: ""
})

const route = useRoute()
const router = useRouter()

const reset = async () => {
  const resetToken = route.params.token
  loading.value = true
  const data = {
    password: password.value,
    token: resetToken
  }
  const { message, error } = await resetPassword(data)
  if (error) {
    toast.open = true
    toast.message = message
    toast.color = "error"
    setTimeout(() => toast.open = false, 2000)
    loading.value = false
  }
  else {
    toast.open = true
    toast.message = message
    toast.color = "success"
    setTimeout(() => toast.open = false, 5000)

    loading.value = false
    password.value = null
    router.replace('/')
  }
}
</script>