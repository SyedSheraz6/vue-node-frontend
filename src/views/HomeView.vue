<template>
    <v-snackbar v-model="toast.open" :color="toast.color" location="top" rounded="pill" elevation="24" closable>
        {{ toast.message }}
    </v-snackbar>
    <section class="main">
        <v-container>
            <SatatusBar />
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-btn @click="() => { postDialog = true; selectedId = null }" class="pa-4 mx-auto"
                        color="surface-variant" text="Create" variant="flat" width="300" size="x-large">
                    </v-btn>
                </v-col>

                <v-col v-if="isApiLoading" cols="12" class="d-flex justify-center">
                    <v-progress-circular v-if="isApiLoading" class="d-flex justify-center" :size="70" :width="7"
                        color="teal-darken-3" indeterminate></v-progress-circular>
                </v-col>
                <v-col v-else v-for="post in posts" cols="12" lg="3" md="4" sm="6" xs="12" >
                    <v-card class="d-flex flex-column fill-height" >
                        <v-img class="align-end text-white" height="200"
                            :src= "post.imageUrl ? `${BASE_URL}${post.imageUrl}` : 'https://cdn.vuetifyjs.com/images/cards/docks.jpg' "
                             cover>
                            <v-card-title class="text-h5">{{ post.title }}</v-card-title>
                        </v-img>

                        <v-card-subtitle class="pt-4">
                            {{ post.subject }}
                        </v-card-subtitle>

                        <v-card-text>
                            {{ post.message }}
                        </v-card-text>
                        <v-spacer></v-spacer>

                        <v-card-actions>
                            <v-btn color="teal" text="View"></v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="blue" text="Edit" @click="editPost(post._id)"></v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="red" text="Delete" @click="deletePost(post._id)"></v-btn>
                        </v-card-actions>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
    </section>

    <section class="dialog">
        <v-dialog min-width="300" max-width="600px" v-model="postDialog" @click:outside="handleClickOutside">

            <v-card class="pa-5">
                <v-card-title>{{ selectedId ? 'Update the post' : 'Create a post' }}</v-card-title>
                <v-form fast-fail ref="create-post">
                    <v-text-field class="mb-3" v-model="formInput.title" :rules="rules.title" label="Title"
                        hide-details="auto" single-line variant="outlined" </v-text-field>

                        <v-text-field class="mb-3" v-model="formInput.subject" :rules="rules.subject" label="Subject"
                            hide-details="auto" single-line variant="outlined"></v-text-field>

                        <v-file-input class="mb-3" v-model="formInput.image" :rules="rules.image"  prepend-icon="" prepend-inner-icon="mdi-paperclip" label="Upload Image"
                            variant="outlined"v hide-details="auto" accept="image/*" show-size></v-file-input>
                        <v-textarea class="mb-3" v-model="formInput.message" :rules="rules.message" label="Message"
                            maxlength="120" hide-details="auto" counter multi-line variant="outlined"></v-textarea>

                        <v-btn v-if="selectedId" @click="updatedPost(selectedId)" class="mb-8" color="blue" size="large"
                            variant="tonal" block>Update</v-btn>
                        <v-btn v-if="!selectedId" @click="createPost" class="mb-8" color="blue" size="large"
                            variant="tonal" block>Create</v-btn>

                </v-form>
            </v-card>
        </v-dialog>

    </section>


</template>

<script setup>
import { ref, reactive, onMounted, useTemplateRef } from 'vue'
import { io } from "socket.io-client";

import SatatusBar from '@/components/SatatusBar.vue';
import { getPosts, postPost, removePost, putPost } from '@/services/home'

const BASE_URL = import.meta.env.VITE_BASE_URL;
const socket = io(BASE_URL)

const postForm = useTemplateRef('create-post')

const isApiLoading = ref(false)
let selectedId = ref(null);
const postDialog = ref(false);
let posts = ref([]);
const formInput = ref({
    title: "",
    subject: "",
    image: null,
    message: ""
});

const rules = ref({
    title: [
        value => {
            if (value) return true
            return 'Title is required field.'
        },
        value => {
            if (value.length > 3) return true
            return "Tiltle should be atleast 4 charcters"
        }
    ],
    subject: [
        value => {
            if (value) return true
            return 'Subject is required field.'
        },
        value => {
            if (value.length > 3) return true
            return "Subject should be atleast 4 charcters"
        },
        value => {
            if (value.length < 21) return true
            return "Subject excceds 20 charcters limit"
        }
    ],
    image: [
    value => {
            if (value.length) return true
            return 'File is required'
        },
        // value => !value || value.size < 200000 || 'File size should be less than 2 MB.', // Max size 2 MB
        // value => !value || ['image/jpeg', 'image/png'].includes(value.type) || 'Only JPEG and PNG files are allowed.', // File type rule
      ],
    message: [
        value => {
            if (value) return true
            return 'Message is required field.'
        },
        value => {
            if (value.length > 3) return true
            return "Message should be atleast 4 charcters"
        },
        value => {
            if (value.length < 121) return true
            return "Message excceds 120 charcters limit"
        }
    ],
})

const toast = reactive({
    open: false,
    message: null,
    color: ""
})

onMounted(() => {
    
    fetchPosts()
    socket.on('posts', (data) => {
        if(data.action === "create") {
            posts.value.push(data.post)
        }
        if(data.action === "delete") {
            const postIndex = posts.value.findIndex(post => post._id === data.postId)
            posts.value.splice(postIndex,1)
        }
        if(data.action === "update") {
            const postIndex = posts.value.findIndex(post => post._id === data.postId)
            posts.value.splice(postIndex,1, data.post)
        }

    })
})

const clearPostForm = () => {
    formInput.value.title = ""
    formInput.value.subject = ""
    formInput.value.message = ""
    formInput.value.image = null
}

const handleClickOutside = () => {
    selectedId.value = null
    clearPostForm()
}

const fetchPosts = async () => {
    
    isApiLoading.value = true
    const { data, message, status, error } = await getPosts()
    if (status === 200) {
        posts.value = data
    } else {
        toast.open = true
        toast.message = message
        toast.color = "error"
        setTimeout(() => toast.open = false, 2000)
    }
    isApiLoading.value = false
}

const createPost = async () => {
    const createForm = await postForm.value.validate()
    if (!createForm.valid) {
        return
    }
    const post = new FormData()
    post.append('title', formInput.value.title)
    post.append('subject', formInput.value.subject)
    post.append('image', formInput.value.image)
    post.append('message', formInput.value.message)

    isApiLoading.value = true
    
    const { message, error } = await postPost(post)
    if (error) {
        toast.open = true
        toast.message = message
        toast.color = "error"
        setTimeout(() => toast.open = false, 2000)
    }
    postDialog.value = false
    fetchPosts()
    clearPostForm()
}

const editPost = (postId) => {
    postDialog.value = true
    selectedId.value = postId
    const postSelected = posts.value.find(post => post._id === postId)
    formInput.value.title = postSelected.title
    formInput.value.subject = postSelected.subject
    formInput.value.image = postSelected.image
    formInput.value.message = postSelected.message
}

const updatedPost = async (postId) => {
    const updateForm = await postForm.value.validate()
    if (!updateForm.valid) {
        return
    }
    isApiLoading.value = true
    const post = new FormData()
    post.append('title', formInput.value.title)
    post.append('subject', formInput.value.subject)
    post.append('image', formInput.value.image)
    post.append('message', formInput.value.message)

    const { message, error } = await putPost(post, postId)
    if (error) {
        toast.open = true
        toast.message = message
        toast.color = "error"
        setTimeout(() => toast.open = false, 2000)
    }
    postDialog.value = false;
    selectedId.value = null;
    clearPostForm()
    fetchPosts()
}

const deletePost = async (postId) => {

    isApiLoading.value = true
    const { message, error } = await removePost(postId)
    if (error) {
        toast.open = true
        toast.message = message
        toast.color = "error"
        setTimeout(() => toast.open = false, 2000)
    }
    fetchPosts()
}

</script>
