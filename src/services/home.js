import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


let authHeader;
const setAuthHeader = () => {
     const user = JSON.parse(localStorage.getItem('user'))
     let token;
     if (user) {
        token = user.token
     }
     authHeader = token ? { "Authorization": `Bearer ${token}` } : {};
}

export const getPosts = async () => {
    let responseData = {}
    responseData.error = false

    const url = BASE_URL

    try {
        const response = await axios.get(url, {timeout: 5000})
        if (response.data.data) {
            responseData.data = response.data.data
            responseData.message = response.data.message
            responseData.status = response.status
        }
        
    } catch (error) {
        responseData.error = true
        responseData.message =  error.response.data ? error.response.data.message : error.message
    }

    return responseData
}

export const postPost = async (data) => {
    setAuthHeader()
    let responseData = {}
    responseData.error = false

    const url = BASE_URL + 'create'

    try {
        const response = await axios.post(url,data, {headers: authHeader})
        if (response.data.data) {
            responseData.data = response.data.data
            responseData.message = response.data.message
            responseData.status = response.status
        }
        
    } catch (error) {
        responseData.error = true
        responseData.message = error.response.data ? error.response.data.message : error.message
    }

    return responseData
}

export const putPost = async (data, postId) => {
    setAuthHeader()
    let responseData = {}
    responseData.error = false

    const url = BASE_URL + postId

    try {
        const response = await axios.put(url, data, {headers: authHeader})
        if (response.data.data) {
            responseData.data = response.data.data
            responseData.message = response.data.message
            responseData.status = response.status
        }
        
    } catch (error) {
        responseData.error = true
        responseData.message =  error.response.data ? error.response.data.message : error.message
    }

    return responseData
}

export const removePost = async (postId) => {
    setAuthHeader()
    let responseData = {}
    responseData.error = false

    const url = BASE_URL + postId

    try {
        const response = await axios.delete(url, {headers: authHeader})
        if (response.data.data) {
            responseData.data = response.data.data
            responseData.message = response.data.message
            responseData.status = response.status
        }
        
    } catch (error) {
        responseData.error = true
        responseData.message = error.response.data ? error.response.data.message : error.message
    }

    return responseData
}