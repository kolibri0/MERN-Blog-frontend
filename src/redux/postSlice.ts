import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'
import { IPost } from '../Interface/IPost'

interface IinitialState{
    posts: IPost[] | [],
    tags: string[],
    error: boolean
}

const initialState: IinitialState = {
    posts: [],
    tags: [],
    error: false
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

export const getUserPosts = createAsyncThunk(
    'posts/getUserPosts',
    async (id: string) =>{
        const {data} = await axios.get(`http://localhost:5000/user/posts/${id}`)
        return data
    }
)

export const getPostsByTags = createAsyncThunk(
    'posts/getPostsByTags',
    async (tag: string) =>{
        const {data} = await axios.get(`http://localhost:5000/posts/params/${tag}`)
        return data
    }
)

export const getTags = createAsyncThunk(
    'posts/getTags',
    async (count: number) =>{
        const {data} = await axios.get(`http://localhost:5000/tags/${count}`)
        return data
    }
)



const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        //----------------------------------------------------------
        builder.addCase(getAllPosts.pending, (state, action) =>{
            state.error = false
            state.posts = []
        })
        builder.addCase(getAllPosts.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
            console.log(state.posts)
        })
        builder.addCase(getAllPosts.rejected, (state, action) =>{
            state.error = true
        })
        //----------------------------------------------------------
        builder.addCase(getPostsByTags.pending, (state, action) =>{
            state.error = false
            state.posts = []
        })
        builder.addCase(getPostsByTags.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
        })
        builder.addCase(getPostsByTags.rejected, (state, action) =>{
            state.error = true
        })
        //----------------------------------------------------------
        builder.addCase(getUserPosts.pending, (state, action) =>{
            state.error = false
            state.posts = []
        })
        builder.addCase(getUserPosts.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
        })
        builder.addCase(getUserPosts.rejected, (state, action) =>{
            state.error = true
        })
        //------------------------------------------------------------
        builder.addCase(getNewPosts.pending, (state, action) =>{
            state.error = false
            state.posts = []
        })
        builder.addCase(getNewPosts.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
        })
        builder.addCase(getNewPosts.rejected, (state, action) =>{
            state.error = true
        })
        //-----------------------------------------------------------
        builder.addCase(getPopularPosts.pending, (state, action) =>{
            state.error = false
            state.posts = []
        })
        builder.addCase(getPopularPosts.fulfilled, (state, action) =>{
            state.posts = action.payload.posts
        })
        builder.addCase(getPopularPosts.rejected, (state, action) =>{
            state.error = true
        })
        //-------------------------------------------------------------
        builder.addCase(getTags.pending, (state, action) =>{
            state.error = false
            state.posts = []
        })
        builder.addCase(getTags.fulfilled, (state, action) =>{
            state.tags = action.payload.tags
        })
        builder.addCase(getTags.rejected, (state, action) =>{
            state.error = true
        })
        //---------------------------------------------------------
    }
})


export default postSlice.reducer