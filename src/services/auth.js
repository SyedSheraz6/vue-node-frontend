import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const registerUser = async (data) => {
    console.log('registerUser', data)
    const responseData = {}
    responseData.error = false

    const url = BASE_URL + 'signup'
    console.log('url', url)
    try {
        const response = await axios.post(url, data)
        console.log('response', response)
        if(response.data.data) {
            responseData.data = response.data.data
            responseData.message = response.data.message
            responseData.status = response.status
        }
        
    } catch (error) {
        console.log('error', error)
        responseData.error = true
        responseData.message = error.response.data ? error.response.data.message : error.message
    }
    
    return responseData
}

export const loginUser = async (data) => {
    console.log('registerUser', data)
    const responseData = {}
    responseData.error = false

    const url = BASE_URL + 'login'
    console.log('url', url)
    try {
        const response = await axios.post(url, data)
        console.log('response', response)
        if(response.data.data) {
            responseData.data = response.data.data
            responseData.message = response.data.message
            responseData.status = response.status
        }
        
    } catch (error) {
        console.log('error', error)
        responseData.error = true
        responseData.message = error.response.data ? error.response.data.message : error.message
    }
    
    return responseData
}