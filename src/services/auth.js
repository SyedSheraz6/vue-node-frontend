import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const registerUser = async (data) => {
    const responseData = {}
    responseData.error = false

    const url = BASE_URL + 'signup'
    try {
        const response = await axios.post(url, data)
        if(response.data.data) {
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

export const loginUser = async (data) => {
    const responseData = {}
    responseData.error = false

    const url = BASE_URL + 'login'
    try {
        const response = await axios.post(url, data)
        if(response.data.data) {
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

export const getResetLink = async (data) => {
    const responseData = {}
    responseData.error = false

    const url = BASE_URL + 'reset-link'
    try {
        const response = await axios.post(url, data)
        if(response.data) {
            responseData.message = response.data.message
            responseData.status = response.status
        }
        
    } catch (error) {
        responseData.error = true
        responseData.message = error.response.data ? error.response.data.message : error.message
    }
    
    return responseData
}

export const resetPassword = async (data) => {
    const responseData = {}
    responseData.error = false

    const url = BASE_URL + 'reset'
    try {
        const response = await axios.post(url, data)
        if(response.data) {
            responseData.message = response.data.message
            responseData.status = response.status
        }
        
    } catch (error) {
        responseData.error = true
        responseData.message = error.response.data ? error.response.data.message : error.message
    }
    
    return responseData
}