<template>
    <v-container>
        <v-row>
            <v-col v-if="isApiLoading" cols="12" class="d-flex justify-center">
                <v-progress-circular v-if="isApiLoading" class="d-flex justify-center" :size="70" :width="7"
                    color="teal-darken-3" indeterminate></v-progress-circular>
            </v-col>
            <v-col v-else v-for="post in posts" cols="12" lg="3" md="4" sm="6" xs="12">
                <v-card class="d-flex flex-column fill-height">
                    <v-img class="align-end text-white" height="200"
                        :src="post.imageUrl ? `${BASE_URL}${post.imageUrl}` : 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'"
                        cover
                        >
                        <v-card-title>{{ post.title }}</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pt-4">
                        {{ post.subject }}
                    </v-card-subtitle>

                    <v-card-text>
                        {{ post.message }}

                    </v-card-text>
                    <v-card-actions>
                        <v-btn block variant="outlined">View</v-btn>
                    </v-card-actions>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getMyPosts } from '@/services/home'


const BASE_URL = import.meta.env.VITE_BASE_URL;

const isApiLoading = ref(false)
let posts = reactive([]);



const toast = reactive({
    open: false,
    message: null,
    color: ""
})

onMounted(() => {
    fetchMyPosts()
})

const fetchMyPosts = async () => {
    isApiLoading.value = true
    const { data, message, status } = await getMyPosts()
    if (status === 200) {
        posts = data
    } else {
        toast.open = true
        toast.message = message
        toast.color = "error"
        setTimeout(() => toast.open = false, 2000)
    }
    isApiLoading.value = false
}

</script>
