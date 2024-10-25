<script setup>
import { ref } from "vue";
const drawer = ref(true)
const rail = ref(true)
</script>

<template>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" class="gradient-background">

        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="Test User" nav>
            <template v-slot:append>
                <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
            </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
.gradient-background {
  background: linear-gradient(to bottom, rgba(83, 150, 188, 0.8), rgba(141, 225, 215, 0.8));
}
</style>

