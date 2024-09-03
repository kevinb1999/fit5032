<template>
  <div class="d-flex justify-content-center align-items-center h-100 bg-light">
    <div class="card p-4 shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="username"
              id="username"
              v-model="formData.username"
              class="form-control"
              placeholder="Enter your Username"
              required
            />
          </div>
          <div class="form-group mt-3">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="formData.password"
              class="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary btn-block mt-4">Login</button>
            <p v-if="error" class="text-danger text-center mt-3">{{ error }}</p>
            <p v-if="feedback" class="text-success text-center mt-3">{{ feedback }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')
const feedback = ref('')

const formData = ref({
  username: '',
  password: ''
})

const login = () => {
  if (formData.value.username === 'user' && formData.value.password === 'password') {
    sessionStorage.setItem('authenticated', true)
    error.value = ''
    feedback.value = 'Login Success'
  } else {
    sessionStorage.setItem('authenticated', false)
    feedback.value = ''
    error.value = 'Invalid credentials'
  }
}
</script>

<style scoped></style>
