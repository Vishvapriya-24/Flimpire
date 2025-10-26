import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:8000"
});

export const getProfile = (userId)=>{
    return API.get(`/profile/${userId}`);
}

export const updateProfile = (userId,formData)=>{
    const token = localStorage.getItem('token');
    return API.put(`/profile/${userId}`,formData,{
        headers:{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`,
        },
    });
}