import React from 'react'
import axios from 'axios'

export const apiClient = axios.create(

    {
        baseURL:'http://localhost:8080'
    }
)
export const setLikesToPosts = (user_id, post_id)=>{
     return apiClient.post(`/api/posts/${post_id}/like/${user_id}`)
};