import axios from "axios";


// axios instance for auth routes
const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
});



/**
 * Register user
 * @param {Object} userData 
 * @returns {Promise<Object>} 
 */
export const registerUser = async ({name, email, password}) => {
    try {
        const response = await api.post(`/register`, {name, email, password});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Login user
 * @param {Object} userData 
 * @returns {Promise<Object>} 
 */
export const loginUser = async ({email, password}) => {
    try {
        const response = await api.post(`/login`, {email, password});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Logout user
 * @returns {Promise<Object>} 
 */
export const logoutUser = async () => {
    try {
        const response = await axios.get(`/logout`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get current user
 * @returns {Promise<Object>} 
 */
export const getUser = async () => {
    try {
        const response = await axios.get(`/get-me`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
