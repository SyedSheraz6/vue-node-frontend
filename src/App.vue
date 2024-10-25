<template>
  <v-app>
    <TheHeader />
    <!-- <TheSideDrawer class="d-sm-none"/> -->
    <v-main class="mt-5" style="background-color: #eaf3f9">
      <HomeView/>
    </v-main>


  </v-app>

</template>


<script setup>
import TheHeader from "@/layout/TheHeader.vue";
import TheSideDrawer from "@/layout/TheSideDrawer.vue";

import HomeView from "./views/HomeView.vue";

</script>


<style scoped>
::v-deep .v-main {
  --v-layout-left: 0 !important;
}
.card {
  width: 670px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
