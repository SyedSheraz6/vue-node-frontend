<template>
  <v-app-bar color="teal-darken-4">

    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon>
      </v-app-bar-nav-icon>
    </template>

    <v-btn>Home</v-btn>
    <v-btn>My Posts</v-btn>


    <v-spacer></v-spacer>

    <v-btn variant="outlined">{{ isLoggedIn ? `${loggedInUser.name} : ${loggedInUser.email}` : "No user is logged in"
      }}</v-btn>

    <v-spacer></v-spacer>

    <v-btn v-if="!isLoggedIn" @click="loginDialog = true">Sign in</v-btn>
    <v-btn v-if="!isLoggedIn" @click="signupDialog = true">Sign Up</v-btn>
    <v-btn v-if="isLoggedIn" @click="logout">Logout</v-btn>
  </v-app-bar>

  <v-snackbar v-model="toast.open" :color="toast.color" location="top" rounded="pill" elevation="24">
    <span>{{ toast.message }}</span>
  </v-snackbar>

  <section class="dialog">
    <v-dialog v-model="loginDialog" class="w-50" @click:outside="handleClickOutside">
      
        <v-card class="pa-5">
          <v-card-title>Sign In</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login" ref="signin">
              <v-text-field v-model="loginForm.email" :rules="rules.email" class="mb-2" name="email" label="Email" variant="outlined"
                clearable></v-text-field>

              <v-text-field v-model="loginForm.password" :rules="rules.password" label="Password" name="password"
                placeholder="Enter your password" variant="outlined" clearable></v-text-field>
              <br>

              <v-btn :loading="loading" color="success" size="large" type="submit" variant="elevated" block>
                Sign In
              </v-btn>
            </v-form>
          </v-card-text>

          <span>
            If you have not registered yourself: <v-btn @click="loginDialog = false; signupDialog = true" variant="text"
              color="teal-darken-4">Signup</v-btn>
          </span>


        </v-card>
    </v-dialog>

    <v-dialog v-model="signupDialog" class="w-50" @click:outside="handleClickOutside">
      <v-form ref="signup" @submit.prevent="signup">
        <v-card title="Sign Up" class="pa-4">
          <v-card-text>
            <v-text-field v-model="signupForm.name" :rules="rules.name" color="primary" label="Name"
              variant="outlined"></v-text-field>

            <v-text-field v-model="signupForm.email" :rules="rules.email" color="primary" label="Email"
              variant="outlined"></v-text-field>

            <v-text-field v-model="signupForm.password" :rules="rules.password" color="primary" label="Password"
              placeholder="Enter your password" variant="outlined"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn :loading="loading" type="submit" color="success" block variant="elevated" size="large">
              Sign Up
            </v-btn>

          </v-card-actions>
          <span>If you are already registered: <v-btn @click="loginDialog = true; signupDialog = false" variant="text"
              color="teal-darken-4">Signin</v-btn></span>

        </v-card>
      </v-form>

    </v-dialog>
  </section>


</template>

<script setup>
import { reactive, ref, useTemplateRef } from "vue";
import { registerUser, loginUser } from '../services/auth'

const registerForm = useTemplateRef('signup')
const signInForm = useTemplateRef('signin')

const loginDialog = ref(false)
const signupDialog = ref(false)
const loading = ref(false)
const isLoggedIn = ref(localStorage.getItem('user'))

const loggedInUser = ref(JSON.parse(localStorage.getItem('user')))


const toast = reactive({
  open: false,
  message: null,
  color: ""
})

const signupForm = reactive({
  name: "",
  email: "",
  password: ""
})

const loginForm = reactive({
  email: "",
  password: ""
})

const rules = ref({
  name: [
    value => {
      if (value) return true
      return 'Name is required.'
    },
    value => {
      if (value.length > 3) return true
      return "Name should be atleast 4 charcters long"
    }
  ],
  email: [
    value => {
      if (value) return true
      return 'Email is required.'
    },
    value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    }
  ],
  password: [
    value => {
      if (value) return true
      return 'Password is required.'
    },
    value => {
      if (value.length > 3) return true
      return "Pasword should be atleast 4 charcters long"
    }
  ],

})

const handleClickOutside = () => {
  loginForm.email = ""
  loginForm.password = ""

  signupForm.name = ""
  signupForm.email = ""
  signupForm.password = ""
}

const login = async () => {
  const form = await signInForm.value.validate()
    if(!form.valid) {
        return
    }
  
  loading.value = true
  const { data, error, message } = await loginUser(loginForm)
  if (error) {
    toast.open = true
    toast.message = message
    toast.color = "error"
    setTimeout(() => toast.open = false, 2000)
    loading.value = false
  }
  if (data) {
    localStorage.setItem("user", JSON.stringify(data))
    loggedInUser.value = data
    isLoggedIn.value = true
    loading.value = false
    loginDialog.value = false
    loginForm.email = ""
    loginForm.password = ""
  }

}

const logout = () => {
  localStorage.removeItem('user')
  isLoggedIn.value = false
}

const signup = async () => {
  const form = await registerForm.value.validate()
    if(!form.valid) {
        return
    }
  loading.value = true
  const { error, message } = await registerUser(signupForm)
  loading.value = false
  if (error) {
    toast.open = true
    toast.message = message
    toast.color = "error"
    setTimeout(() => toast.open = false, 2000)
    loading.value = false
  }
  if (!error) {
    signupDialog.value = false
    loginDialog.value = true
    loading.value = false
    signupForm.name = ""
    signupForm.email = ""
    signupForm.password = ""
  }
}
</script>


<style scoped>
.gradient-background {
  background: linear-gradient(to bottom, rgba(83, 150, 188, 0.8), rgba(141, 225, 215, 0.8));
}
</style>