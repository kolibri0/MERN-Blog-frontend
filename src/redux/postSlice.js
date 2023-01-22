import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'


const initialState = {
    posts: [],
    tags: []
}

export const getAllPosts = createAsyncThunk(
    'posts/getAllPosts',
    async () =>{
        const {data} = await axios.get(`http://localhost:5000/posts`)
        return data
    }
)

export const getNewPosts = createAsyncThunk(
    'posts/getNewPosts',
    async () =>{
        const {data} = await axios.get(`http://localhost:5000/posts/new`)
        return data
    }
)

export const getPopularPosts = createAsyncThunk(
    'posts/getPopularPosts',
    async () =>{
        const {data} = await axios.get(`http://localhost:5000/posts/popular`)
        return data
    }
)

export const getPostsByTags = createAsyncThunk(
    'posts/getPostsByTags',
    async (tag) =>{
        const {data} = await axios.get(`http://localhost:5000/posts/params/${tag}`)
        return data
    }
)

export const getTags = createAsyncThunk(
    'posts/getTags',
    async (count) =>{
        const {data} = await axios.get(`http://localhost:5000/tags/${count}`)
        return data
    }
)



const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getAllPosts.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
        })
        builder.addCase(getPostsByTags.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
        })
        builder.addCase(getNewPosts.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
        })
        builder.addCase(getPopularPosts.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
        })
        builder.addCase(getTags.fulfilled, (state, action) =>{
            state.tags = action.payload.tags
        })
    }
})


export default postSlice.reducer