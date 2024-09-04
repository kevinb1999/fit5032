<template>
    <div class="d-flex justify-content-center align-items-center h-100 bg-light">
    <div class="card p-4 shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Sign in via Firebase</h2>
        <form @submit.prevent="signin">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group mt-3">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
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
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();
  const error = ref("");
  const feedback = ref("")
  
  const signin = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        console.log("Firebase Register Successful!");
        feedback.value = "Firebase Register Successful!"
        error.value = ""
        router.push("/");
        console.log(auth.currentUser); // To check the current user signed in
      })
      .catch((err) => {
        feedback.value = ""
        error.value = "Error logging in"
        console.log(err.code);
      });
  };
  </script>
  