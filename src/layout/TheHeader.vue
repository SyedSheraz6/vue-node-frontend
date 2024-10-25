<template>
        <v-app-bar
        color="teal-darken-4"
      >
      
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon class="d-sm-none" @click="drawer = !drawer">
          </v-app-bar-nav-icon>
        </template>

        <v-btn>Home</v-btn>
        <v-btn>My Posts</v-btn>
        
        
        <v-spacer></v-spacer>

        <v-btn variant="outlined">CRUD Practice VUE+NODE</v-btn>

        <v-spacer></v-spacer>

          <!-- <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn> -->
        

        
        <v-btn>Sign in</v-btn>
        <v-btn>Sign Up</v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        class="d-sm-none"
      >
        <v-list color="transparent">
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home"></v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="My Posts"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block variant="outlined">
              sign In
            </v-btn>
            <v-btn block variant="outlined">
              sign Up
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      

</template>

<script setup>
import { ref } from "vue";
const drawer = ref(true)
const rail = ref(true)
</script>


<style scoped>
.gradient-background {
  background: linear-gradient(to bottom, rgba(83, 150, 188, 0.8), rgba(141, 225, 215, 0.8));
}
</style>