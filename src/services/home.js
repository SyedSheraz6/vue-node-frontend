import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const getPosts = async () => {
    let responseData = {}
    responseData.error = false

    const url = BASE_URL

    try {
        const response = await axios.get(url)
        if (response.data.data) {
            responseData.data = response.data.data
            responseData.message = response.data.message
            responseData.status = response.status
        }
        
    } catch (error) {
        responseData.error = true
        responseData.message = error.message
    }

    return responseData
}

export const postPost = async (data) => {
    let responseData = {}
    responseData.error = false

    const url = BASE_URL + 'create'

    console.log('url', url)

    try {
        const response = await axios.post(url,data)
        if (response.data.data) {
            responseData.data = response.data.data
            responseData.message = response.data.message
            responseData.status = response.status
        }
        
    } catch (error) {
        responseData.error = true
        responseData.message = error.message
    }

    return responseData
}

export const removePost = async (postId) => {
    let responseData = {}
    responseData.error = false

    const url = BASE_URL + postId

    try {
        const response = await axios.delete(url)
        if (response.data.data) {
            responseData.data = response.data.data
            responseData.message = response.data.message
            responseData.status = response.status
        }
        
    } catch (error) {
        responseData.error = true
        responseData.message = error.message
    }

    return responseData
}


export const putPost = async (data, postId) => {
    let responseData = {}
    responseData.error = false

    const url = BASE_URL + postId

    try {
        const response = await axios.put(url, data)
        if (response.data.data) {
            responseData.data = response.data.data
            responseData.message = response.data.message
            responseData.status = response.status
        }
        
    } catch (error) {
        responseData.error = true
        responseData.message = error.message
    }

    return responseData
}