import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../components/axios'


const initialState = {
    posts: null,
}

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (postId) =>{
        const res = await axios.delete(`/posts/${postId}`)
        return res.data
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(deletePost.fulfilled, (state, action) =>{
        })
    }
})

export default postsSlice.reducer