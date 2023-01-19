import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'


const initialState = {
    posts: [],
}

export const getAllPosts = createAsyncThunk(
    'note/getAllPosts',
    async () =>{
        const {data} = await axios.get(`http://localhost:5000/posts`)
        return data
    }
)

export const getPostsByTags = createAsyncThunk(
    'note/getPostsByTags',
    async (tag) =>{
        const {data} = await axios.get(`http://localhost:5000/posts/params/${tag}`)
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
    }
})


// export const { show } = noteSlice.actions
export default postSlice.reducer